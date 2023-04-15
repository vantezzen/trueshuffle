import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/app");
    }
  }, [status]);

  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
