import ProgressBarPage from "@/components/ProgressBarPage";
import { EncryptionItem } from "@/lib/types";
import React from "react";

function Hashing({
  item,
  currentRound,
}: {
  item: EncryptionItem;
  currentRound: number;
}) {
  return (
    <ProgressBarPage
      progressPercent={
        (currentRound / item.securityLevel.passwordHashRounds) * 100
      }
      title="Preparing password"
      subtitle={`${currentRound} rounds have been completed.`}
    />
  );
}

export default Hashing;
