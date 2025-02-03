import { PrismaAdapter } from "@next-auth/prisma-adapter";//インストールの必要あり
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import prisma from "../prisma";
//基本的にはこのページを参考　https://next-auth.js.org/getting-started/example,https://next-auth.js.org/ にしている
//オプションは　https://next-auth.js.org/configuration/options
export const nextAuthOptions:NextAuthOptions = {
  debug: false,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),//google provider 等他の設定もできる　https://next-auth.js.org/configuration/providers/oauth
  ],
  adapter:PrismaAdapter(prisma),//githubでユーザー認証すると同時にプリズマの中のモデルのユーザーに保存されていく。https://next-auth.js.org/configuration/options#adapter
  callbacks: {
    //next authのセッションやユーザー情報を返すことができる設定 
    //今回はログインしているのかしていないのかを判断するために使用する
    //https://next-auth.js.org/getting-started/example#extensibility
    //https://next-auth.js.org/configuration/options#callbacks
    session:({session, user}) => {
      return {
        ...session,
        user:{
          ...session.user,
          id:user.id
        }
      }
    }
  }
}
