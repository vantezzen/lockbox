import React from "react";

function Label({
  children,
  className,
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`text-zinc-600 text-sm ${className}`}>
      {children}
    </label>
  );
}

export default Label;
