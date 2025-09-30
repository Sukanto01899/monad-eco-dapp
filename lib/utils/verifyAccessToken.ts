import privy from "../config/privyClient";
import { AuthTokenClaims } from "@privy-io/server-auth";

const verifyPrivyAccessToken = async (
  authToken: string
): Promise<AuthTokenClaims | null> => {
  try {
    const verifiedClaims = await privy.verifyAuthToken(
      authToken,
      process.env.JWT_VERIFICATION_KEY
    );
    return verifiedClaims;
  } catch (error) {
    console.log(`Token verification failed with error ${error}.`);
    return null;
  }
};

export default verifyPrivyAccessToken;
