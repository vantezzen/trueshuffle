import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import LoadingOverlay from "../LoadingOverlay";
import { useAuthGateState } from "./authGateState";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const needsReauth = useAuthGateState((state) => state.needsReauth);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  useEffect(() => {
    if (needsReauth) {
      signOut().then(() => signIn());
    }
  }, [needsReauth]);

  if (status === "loading" || status === "unauthenticated" || needsReauth) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
}

export default AuthGate;
