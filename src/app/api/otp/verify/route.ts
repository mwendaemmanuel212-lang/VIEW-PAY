
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIREBASE_API_KEY = "AIzaSyC17ogEYrWXannUm07kN95pJWNK4YPBfcQ";

type OtpEnvironment = {
  OTP_KV: {
    get(key: string): Promise<string | null>;
    put(
      key: string,
      value: string,
      options?: { expirationTtl: number }
    ): Promise<void>;
    delete(key: string): Promise<void>;
  };
  BREVO_API_KEY?: string;
};

async function hashCode(uid: string, code: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${uid}:${code}`)
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let difference = 0;
  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return difference === 0;
}

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Please sign in first." },
        { status: 401 }
      );
    }

    const idToken = authorization.slice(7);

    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!firebaseResponse.ok) {
      return Response.json(
        { error: "Your session is invalid. Please sign in again." },
        { status: 401 }
      );
    }

    const account = await firebaseResponse.json() as {
      users?: Array<{
        localId: string;
        emailVerified?: boolean;
      }>;
    };

    const user = account.users?.[0];

    if (!user?.localId) {
      return Response.json(
        { error: "Account could not be confirmed." },
        { status: 400 }
      );
    }

    const body = await request.json() as { code?: string };
    const code = String(body.code ?? "").trim();

    if (!/^\d{6}$/.test(code)) {
      return Response.json(
        { error: "Enter the six-digit code." },
        { status: 400 }
      );
    }

    const { env } = getCloudflareContext();
    const settings = env as unknown as OtpEnvironment;

    if (!settings.OTP_KV || !settings.BREVO_API_KEY) {
      return Response.json(
        { error: "Verification service is not configured." },
        { status: 500 }
      );
    }

    const uid = user.localId;
    const verifiedKey = `otp-verified:${uid}`;

    if (await settings.OTP_KV.get(verifiedKey)) {
      return Response.json({
        ok: true,
        message: "Your email is already verified.",
      });
    }

    const otpKey = `otp:${uid}`;
    const saved = await settings.OTP_KV.get(otpKey);

    if (!saved) {
      return Response.json(
        { error: "Your code has expired. Request a new one." },
        { status: 400 }
      );
    }

    const record = JSON.parse(saved) as {
      hash: string;
      attempts: number;
    };

    if (record.attempts >= 5) {
      await settings.OTP_KV.delete(otpKey);
      return Response.json(
        { error: "Too many incorrect attempts. Request a new code." },
        { status: 429 }
      );
    }

    const submittedHash = await hashCode(
      uid,
      code,
      settings.BREVO_API_KEY
    );

    if (!safeEqual(submittedHash, record.hash)) {
      record.attempts += 1;

      if (record.attempts >= 5) {
        await settings.OTP_KV.delete(otpKey);
      } else {
        await settings.OTP_KV.put(
          otpKey,
          JSON.stringify(record),
          { expirationTtl: 300 }
        );
      }

      return Response.json(
        {
          error: record.attempts >= 5
            ? "Too many incorrect attempts. Request a new code."
            : `Incorrect code. ${5 - record.attempts} attempts remaining.`,
        },
        { status: 400 }
      );
    }

    await settings.OTP_KV.put(
      verifiedKey,
      "1",
      { expirationTtl: 31536000 }
    );

    await settings.OTP_KV.delete(otpKey);

    return Response.json({
      ok: true,
      message: "Your email has been verified successfully.",
    });
  } catch {
    return Response.json(
      { error: "Verification could not be completed. Please try again." },
      { status: 500 }
    );
  }
    }
