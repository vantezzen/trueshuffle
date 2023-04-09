import React from "react";

function MutedText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-zinc-400 font-medium text-sm ${className}`}>
      {children}
    </span>
  );
}

export default MutedText;
