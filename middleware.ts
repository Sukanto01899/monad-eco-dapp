// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import verifyPrivyAccessToken from "./lib/utils/verifyAccessToken";

export async function middleware(request: NextRequest) {
  // Example: Check for a specific header or cookie for verification

  const authToken = request.cookies.get("privy-token")?.value;
  // console.log(authToken);
  if (!authToken) {
    return NextResponse.json(
      {
        error: "Access token not found!",
        isSuccess: false,
      },
      { status: 401 }
    );
  }
  const decodedUser = await verifyPrivyAccessToken(authToken);
  console.log("decoded user", decodedUser);
  if (!decodedUser) {
    return NextResponse.json(
      {
        error: "Unauthorized!",
        isSuccess: false,
      },
      { status: 401 }
    );
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(decodedUser));
  // Allow the request to proceed
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// middleware.ts (continued)
export const config = {
  matcher: [
    "/api/secure/:path*", // Matches all routes under /api/secure
    // Add more specific routes as needed
  ],
};
