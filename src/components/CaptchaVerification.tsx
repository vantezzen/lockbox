import InputGroup from "@/components/InputGroup";
import MutedText from "@/components/MutedText";
import { Note } from "@geist-ui/core";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import React from "react";

function CaptchaVerification({
  error,
  setToken,
}: {
  error: boolean;
  setToken: (token: string) => void;
}) {
  return (
    <InputGroup>
      <div className="mx-auto">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          onVerify={(token) => setToken(token)}
        />
      </div>
      {error && <Note type="error">Please complete the captcha.</Note>}
      <MutedText>
        To prevent automated spam we currently use a captcha.
      </MutedText>
    </InputGroup>
  );
}

export default CaptchaVerification;
