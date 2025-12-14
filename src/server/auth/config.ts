import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      nick?: string;
      pontuacao?: number;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  
  session: {
    strategy: "jwt",
  },
  
  pages: {
    signIn: "/login",
    signUp: "/cadastro",
    error: "/login",
  },
  
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "Email ou Nick", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Dados incompletos");
        }

        const usuario = await db.usuario.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { nick: credentials.identifier },
            ],
          },
        });

        if (!usuario || !usuario.senha) {
          throw new Error("Usuário não encontrado");
        }


        const isValid = await bcrypt.compare(
          credentials.password as string, 
          usuario.senha
        );

        if (!isValid) {
          throw new Error("Senha incorreta");
        }

        return {
          id: String(usuario.id), 
          email: usuario.email,
          name: usuario.nick,
          nick: usuario.nick,
          pontuacao: usuario.Pontuacao,
        };
      },
    }),
  ],
  
  callbacks: {
    
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.nick = user.nick;
        token.pontuacao = user.pontuacao;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.nick = token.nick as string;
        session.user.pontuacao = token.pontuacao as number;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};