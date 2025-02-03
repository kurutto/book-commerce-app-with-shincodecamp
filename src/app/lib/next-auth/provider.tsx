'use client'
//sessionProvider は client component にする必要があるためlayout.tsxへの記述を避けた。
import { SessionProvider } from "next-auth/react"
import { FC, PropsWithChildren } from "react"

export const NextAuthProvider:FC<PropsWithChildren> = ({children}) => {
  return <SessionProvider>{children}</SessionProvider>
}