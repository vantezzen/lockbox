import MutedText from "@/components/MutedText";
import useAddItemStore from "@/store/addItemStore";
import { Input, Text } from "@geist-ui/core";
import { Check, CheckInCircleFill, Copy } from "@geist-ui/icons";
import React from "react";

function Success() {
  const [hasCopiedPassword, setHasCopiedPassword] = React.useState(false);
  const store = useAddItemStore();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
    ? process.env.NEXT_PUBLIC_APP_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  let secretUrl = `${appUrl}/${store.secretId}`;
  if (store.addPasswordToUrl) {
    secretUrl += `#${store.item.password}`;
  }

  const showPasswordCopiedAnimation = () => {
    setHasCopiedPassword(true);
    setTimeout(() => {
      setHasCopiedPassword(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 py-12 md:px-12 items-center justify-center">
      <CheckInCircleFill size={64} />
      <Text b font="1.2rem" className="mt-12">
        Secret is stored
      </Text>
      <MutedText className="text-center">
        The secret has been stored securely and can now be accessed by the
        one-time link:
      </MutedText>

      <Input
        value={secretUrl}
        readOnly
        width="100%"
        iconClickable
        alt="Copy to clipboard"
        iconRight={
          <>
            {hasCopiedPassword ? (
              <Check size={12} color="green" />
            ) : (
              <Copy size={12} />
            )}
          </>
        }
        onIconClick={() => {
          navigator.clipboard.writeText(secretUrl);
          showPasswordCopiedAnimation();
        }}
        className="font-mono"
      />
    </div>
  );
}

export default Success;
