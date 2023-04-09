import { Loading } from "@geist-ui/core";
import React from "react";

function LoadingOverlay() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default LoadingOverlay;
