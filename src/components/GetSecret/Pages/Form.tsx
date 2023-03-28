import CaptchaVerification from "@/components/CaptchaVerification";
import InputGroup from "@/components/InputGroup";
import MutedText from "@/components/MutedText";
import useGetItemStore from "@/store/getItemStore";
import downloadAndDecryptSecret from "@/lib/decryption/downloadAndDecryptSecret";
import { Button, Input } from "@geist-ui/core";
import React from "react";
import Link from "next/link";

function Form() {
  const [showCaptchaError, setShowCaptchaError] = React.useState(false);
  const state = useGetItemStore();
  const hCaptchaToken = useGetItemStore((state) => state.hCaptchaToken);
  const setHCaptchaToken = useGetItemStore((state) => state.setHCaptchaToken);

  const hasPrefilledPassword =
    typeof window !== "undefined" &&
    window.location.hash.replace("#", "").length > 0;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY && !hCaptchaToken) {
          setShowCaptchaError(true);
          return;
        }
        downloadAndDecryptSecret();
      }}
      suppressHydrationWarning
    >
      <MutedText>
        This secret is encrypted. Please note that it can only be retrieved once
        and will be deleted after that.
      </MutedText>

      {!hasPrefilledPassword && (
        <Input
          htmlType="password"
          placeholder="Password"
          width="100%"
          onChange={(e) =>
            state.setItem({
              ...state.item,
              password: e.target.value,
            })
          }
          value={state.item.password}
          required
          suppressHydrationWarning
        />
      )}

      {process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY && (
        <CaptchaVerification
          error={showCaptchaError}
          setToken={setHCaptchaToken}
        />
      )}

      <InputGroup>
        <Button type="secondary-light" htmlType="submit">
          Retrieve secret
        </Button>
        <MutedText>
          By retrieving a secret you agree to our{" "}
          <Link href="/legal/terms">Terms of Service</Link> and{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </MutedText>
      </InputGroup>
    </form>
  );
}

export default Form;
