import { Button } from "@geist-ui/core";
import { ArrowRight } from "@geist-ui/icons";
import Link from "next/link";
import React from "react";

function GetStartedButton() {
  return (
    <div className="mt-6">
      <Link href="/app">
        <Button type="secondary-light">
          <div className="flex hover:gap-4 gap-3 transition-all duration-200 items-center">
            Get Started
            <ArrowRight size={16} />
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default GetStartedButton;
