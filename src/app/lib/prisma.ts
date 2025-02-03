import { PrismaClient } from "@prisma/client";

let prisma:PrismaClient;

//次の方法だとホットリロードするたびにPrismaClient のインスタンスを何個も生成してしまうからglobalに生成する方法にする。
// prisma = new PrismaClient();

//globalにオブジェクトを生成する。シングルトン
//コード中のglobal は、Node.js環境におけるグローバルオブジェクト。
const globalForPrisma = global as unknown as{
  prisma:PrismaClient | undefined;
}
if(!globalForPrisma.prisma){
  globalForPrisma.prisma = new PrismaClient();
}

prisma = globalForPrisma.prisma;

export default prisma;