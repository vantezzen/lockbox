import MutedText from "@/components/MutedText";
import { Loading, Text } from "@geist-ui/core";
import React from "react";

function Uploading() {
  return (
    <div className="flex flex-col gap-4 p-12 items-center justify-center">
      <Loading />
      <Text b font="1.2rem" className="mt-12">
        Uploading
      </Text>
      <MutedText className="text-center">
        Uploading your encrypted secret to the database. This should only take a
        few seconds.
      </MutedText>
    </div>
  );
}

export default Uploading;
