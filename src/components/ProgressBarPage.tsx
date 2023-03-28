import { Text } from "@geist-ui/core";
import React from "react";
import MutedText from "./MutedText";

function ProgressBarPage({
  progressPercent,
  title,
  subtitle,
}: {
  progressPercent: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-12 items-center justify-center">
      {/* @geist-ui's Progress has problems with rapidly changing progress */}
      <div className="w-48 rounded bg-zinc-200 h-2">
        <div
          className="rounded bg-zinc-800 h-2"
          style={{
            width: `${progressPercent}%`,
          }}
        />
      </div>

      <Text b font="1.2rem" className="mt-12">
        {title}
      </Text>
      <MutedText>{subtitle}</MutedText>
    </div>
  );
}

export default ProgressBarPage;
