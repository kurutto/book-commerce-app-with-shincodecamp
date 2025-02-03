import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };

//https://next-auth.js.org/configuration/initialization#route-handlers-app
//https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments
