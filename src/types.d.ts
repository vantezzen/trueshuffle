
declare module "next-auth" {
  interface Session {
    token: string;
  }
}
