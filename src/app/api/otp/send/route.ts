
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
        email?: string;
        emailVerified?: boolean;
      }>;
    };

    const user = account.users?.[0];

    if (!user?.localId || !user.email) {
      return Response.json(
        { error: "Account email could not be confirmed." },
        { status: 400 }
      );
    }

    if (user.emailVerified) {
      return Response.json({ ok: true, alreadyVerified: true });
    }

    const { env } = getCloudflareContext();
    const settings = env as unknown as OtpEnvironment;

    if (!settings.OTP_KV || !settings.BREVO_API_KEY) {
      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const uid = user.localId;
    const rateKey = `otp-send-limit:${uid}`;

    if (await settings.OTP_KV.get(rateKey)) {
      return Response.json(
        { error: "Please wait 60 seconds before requesting another code." },
        { status: 429 }
      );
    }

    const code = crypto.randomInt
      ? String(crypto.randomInt(100000, 1000000))
      : String(100000 + Math.floor(Math.random() * 900000));

    const codeHash = await hashCode(
      uid,
      code,
      settings.BREVO_API_KEY
    );

    await settings.OTP_KV.put(
      `otp:${uid}`,
      JSON.stringify({ hash: codeHash, attempts: 0 }),
      { expirationTtl: 300 }
    );

    await settings.OTP_KV.put(rateKey, "1", {
      expirationTtl: 60,
    });

    const emailResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "api-key": settings.BREVO_API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "ViewPay Support",
            email: "supportviewpay@gmail.com",
          },
          to: [{ email: user.email }],
          subject: "Your ViewPay verification code",
          textContent: `Your ViewPay verification code is ${code}. It expires in 5 minutes. Do not share this code with anyone.`,
          htmlContent: `<div style="font-family:Arial,sans-serif;padding:24px"><h2>ViewPay email verification</h2><p>Your six-digit verification code is:</p><h1 style="letter-spacing:8px">${code}</h1><p>This code expires in 5 minutes. Do not share it with anyone.</p></div>`,
        }),
      }
    );

    if (!emailResponse.ok) {
      await settings.OTP_KV.delete(`otp:${uid}`);
      await settings.OTP_KV.delete(rateKey);

      return Response.json(
        { error: "We could not send the email. Please try again later." },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      message: "A verification code has been sent to your email.",
    });
  } catch {
    return Response.json(
      { error: "Unable to send the verification code right now." },
      { status: 500 }
    );
  }
        }
