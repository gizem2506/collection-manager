import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const apiUrl = `${process.env.API_BASE_URL}/Auth/Login`;
          const payload = {
            username: credentials?.username,
            password: credentials?.password,
          };
          const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.API_SECRET_TOKEN ?? ""}`,
          };
          console.log("Login API isteği:", apiUrl, payload, headers);
          const response = await axios.post(apiUrl, payload, { headers });
          if (!response.data || response.data.status !== 0) return null;
          const user = response.data.data;
          return {
            id: user.id ?? "user",
            name: user.name,
            email: user.email,
            accessToken: user.accessToken,
            expiresIn: user.expiresIn,
            tokenType: user.tokenType,
            tokenExpires: Date.now() + user.expiresIn * 1000,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.expiresIn = user.expiresIn;
        token.tokenType = user.tokenType;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.tokenExpires = user.tokenExpires;
      }

      if (token.tokenExpires && Date.now() < token.tokenExpires) {
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.tokenExpires) session.tokenExpires = token.tokenExpires;
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        accessToken: token.accessToken,
        expiresIn: token.expiresIn,
        tokenType: token.tokenType,
      };
      return session;
    },
  },
};
