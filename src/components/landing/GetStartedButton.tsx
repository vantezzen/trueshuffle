import { Button } from "@geist-ui/core";
import Link from "next/link";
import React from "react";

function GetStartedButton() {
  return (
    <div className="mt-6">
      <Link href="/app">
        <Button type="secondary-light">Get Started</Button>
      </Link>
    </div>
  );
}

export default GetStartedButton;
