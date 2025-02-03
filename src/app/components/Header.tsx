import { getServerSession } from "next-auth";
// import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { nextAuthOptions } from "../lib/next-auth/options";
import { User } from "../types/types";

const Header = async () => {
  //client コンポーネントで表示が遅かったため、getServerSessionを使用してサーバサイドへ
  // const { data: session } = useSession();
  // const user = session?.user;

  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  console.log(user);
  return (
    <header className="bg-slate-600 text-gray-100 shadow-lg">
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          Book Commerce
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            ホーム
          </Link>
          <Link
            //href={user ? "/profile" : "/login"} next authが用意しているsignin機能に変更
            href={user ? "/profile" : "/api/auth/signin"}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            {user ? "プロフィール" : "ログイン"}
          </Link>

          {user && (
            //onClickだとclient コンポーネントにしなければいけないので別の方法で。
            //<button
            // onClick={() => signOut({ callbackUrl: "/login" })}
            //  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            //  >
            //   ログアウト
            // </button>

            <Link
              href={"/api/auth/signout"}//next authが用意しているsignout機能
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              ログアウト
            </Link>
          )}

          <Link href={`/profile`}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={user?.image || "/default_icon.png"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
