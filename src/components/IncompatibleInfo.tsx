import { Note } from "@geist-ui/core";
import React from "react";

function IncompatibleInfo() {
  const [isIncompatible, setIsIncompatible] = React.useState(false);

  React.useEffect(() => {
    if (!("crypto" in window) || !("subtle" in window.crypto)) {
      setIsIncompatible(true);
    }
  }, []);

  if (!isIncompatible) return null;

  return (
    <div className="max-w-lg mx-auto my-12">
      <Note type="error">
        Your browser is not compatible with LockBox as it does not support
        on-device encryption. Please use a modern browser. To learn more about
        updating your browser, visit{" "}
        <a href="https://browsehappy.com/" target="_blank" rel="noreferrer">
          browsehappy.com
        </a>
      </Note>
    </div>
  );
}

export default IncompatibleInfo;
