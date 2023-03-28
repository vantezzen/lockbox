import ProgressBarPage from "@/components/ProgressBarPage";
import React from "react";
import useAddItemStore from "../../../store/addItemStore";

function Encrypting() {
  const item = useAddItemStore((state) => state.item);
  const currentRound = useAddItemStore((state) => state.currentRound);

  return (
    <ProgressBarPage
      progressPercent={
        (currentRound / item.securityLevel.encryptionRounds) * 100
      }
      title="Encrypting"
      subtitle={`${currentRound} rounds have been completed.`}
    />
  );
}

export default Encrypting;
