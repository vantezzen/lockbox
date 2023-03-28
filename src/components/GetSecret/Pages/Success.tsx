import MutedText from "@/components/MutedText";
import useGetItemStore from "@/store/getItemStore";
import { Text, Textarea } from "@geist-ui/core";
import { CheckInCircleFill } from "@geist-ui/icons";
import React from "react";

function Success() {
  const store = useGetItemStore();

  return (
    <div className="flex flex-col gap-4 p-12 items-center justify-center">
      <CheckInCircleFill size={64} />
      <Text b font="1.2rem" className="mt-12">
        Your secret is decrypted
      </Text>
      <MutedText className="text-center">
        The secret has been decrypted and can now be accessed. Please copy or
        remember the value below as it cannot be shown again.
      </MutedText>

      <Textarea
        value={store.item.content}
        readOnly
        width="100%"
        className="font-mono"
        height="200px"
      />
    </div>
  );
}

export default Success;
