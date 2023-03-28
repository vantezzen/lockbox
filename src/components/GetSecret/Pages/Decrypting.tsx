import ProgressBarPage from "@/components/ProgressBarPage";
import useGetItemStore from "@/store/getItemStore";
import React from "react";
import useAddItemStore from "../../../store/addItemStore";

function Decrypting() {
  const item = useGetItemStore((state) => state.item);
  const currentRound = useAddItemStore((state) => state.currentRound);

  return (
    <ProgressBarPage
      progressPercent={
        (currentRound / item.securityLevel.encryptionRounds) * 100
      }
      title="Decrypting"
      subtitle={`${currentRound} rounds have been completed.`}
    />
  );
}

export default Decrypting;
