import MainApp from "@/components/app";
import AuthGate from "@/components/auth/AuthGate";
import React from "react";
import "@total-typescript/ts-reset";

function App() {
  return (
    <AuthGate>
      <MainApp />
    </AuthGate>
  );
}

export default App;
