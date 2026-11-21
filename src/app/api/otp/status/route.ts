
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIREBASE_API_KEY = "AIzaSyC17ogEYrWXannUm07kN95pJWNK4YPBfcQ";

type OtpEnvironment = {
  OTP_KV: {
    get(key: string): Promise<string | null>;
  };
};

export async function GET(request: Request) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!firebaseResponse.ok) {
      return Response.json(
        { error: "Your session is invalid." },
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
        { status: 401 }
      );
    }

    const { env } = getCloudflareContext();
    const settings = env as unknown as OtpEnvironment;

    if (!settings.OTP_KV) {
      return Response.json(
        { error: "Verification service is unavailable." },
        { status: 500 }
      );
    }

    const verified =
      user.emailVerified === true ||
      (await settings.OTP_KV.get(`otp-verified:${user.localId}`)) === "1";

    return Response.json({
      ok: true,
      verified,
      message: verified
        ? "Email verified."
        : "Email verification is still pending.",
    });
  } catch {
    return Response.json(
      { error: "Could not check verification status." },
      { status: 500 }
    );
  }
}
  
