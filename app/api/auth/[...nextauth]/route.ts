// Bu dosya, Next.js uygulamasında kimlik doğrulama rotalarını yönetir ve NextAuth.js için yapılandırma ve tür tanımlarını içerir.
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


declare module "next-auth" {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    tokenType?: string;
    id?: string;
    name?: string;
    email?: string;
    tokenExpires?: number;
  }
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    tokenExpires?: number;
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      accessToken?: string;
      refreshToken?: string;
      expiresIn?: number;
      refreshExpiresIn?: number;
      tokenType?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    tokenType?: string;
    id?: string;
    name?: string;
    email?: string;
    tokenExpires?: number;
  }
}

