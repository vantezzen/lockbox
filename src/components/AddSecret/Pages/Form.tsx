import InputGroup from "@/components/InputGroup";
import MutedText from "@/components/MutedText";
import useAddItemStore from "@/store/addItemStore";
import { Button } from "@geist-ui/core";
import Link from "next/link";
import React from "react";
import CaptchaVerification from "../../CaptchaVerification";
import PasswordFormField from "../FormFields/PasswordFormField";
import SecretFormField from "../FormFields/SecretFormField";
import SecurityLevelFormField from "../FormFields/SecurityLevelFormField";
import StorageDurationFormField from "../FormFields/StorageDurationFormField";

function Form({ encryptAndUpload }: { encryptAndUpload: () => void }) {
  const [showCaptchaError, setShowCaptchaError] = React.useState(false);
  const hCaptchaToken = useAddItemStore((state) => state.hCaptchaToken);
  const setHCaptchaToken = useAddItemStore((state) => state.setHCaptchaToken);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY && !hCaptchaToken) {
          setShowCaptchaError(true);
          return;
        }
        encryptAndUpload();
      }}
    >
      <SecretFormField />
      <PasswordFormField />
      <SecurityLevelFormField />
      <StorageDurationFormField />
      {process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY && (
        <CaptchaVerification
          error={showCaptchaError}
          setToken={setHCaptchaToken}
        />
      )}

      <InputGroup>
        <Button type="secondary-light" htmlType="submit">
          Upload secret
        </Button>
        <MutedText>
          By uploading your secret you agree to our{" "}
          <Link href="/legal/terms">Terms of Service</Link> and{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </MutedText>
      </InputGroup>
    </form>
  );
}

export default Form;
