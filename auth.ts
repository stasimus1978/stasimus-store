import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareSync } from "bcrypt-ts-edge";
import NextAuth, { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/db/prisma";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },

      async authorize(credentials) {
        if (!credentials) return null;

        // find user by email form database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string
          }
        });

        // check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password);

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email
            };
          }
        }

        // Return null if user does not exist or password does not match
        return null;
      }
    })
  ],

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    }
  }
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
