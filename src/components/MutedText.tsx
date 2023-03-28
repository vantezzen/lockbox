import React from "react";

function MutedText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-zinc-400 text-xs ${className}`}>{children}</p>;
}

export default MutedText;
