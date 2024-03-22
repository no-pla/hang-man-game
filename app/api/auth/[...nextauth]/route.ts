import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface UserData {
  id: string;
  email: string;
  password: string;
  name: string;
  profileImage: string;
  joinDate: any;
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "password ", type: "password" },
      },
      async authorize(credentials) {
        // authorize => jwt callback => session callback 순서로 실행된다.
        if (!credentials?.email || !credentials.password) {
          throw new Error("빈 필드를 제출했습니다.");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("이메일 혹은 비밀번호를 다시 확인해 주세요.");
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordsMatch) {
          throw new Error("이메일 혹은 비밀번호를 다시 확인해 주세요.");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        return {
          id: user.id,
          picture: user.image,
          ...token,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          id: token.id,
          ...session.user,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
