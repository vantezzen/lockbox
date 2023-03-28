import InputGroup from "@/components/InputGroup";
import Label from "@/components/Label";
import MutedText from "@/components/MutedText";
import { SECURITY_LEVELS } from "@/lib/types";
import { Select } from "@geist-ui/core";
import React from "react";
import useAddItemStore from "../../../store/addItemStore";

function SecurityLevelFormField() {
  const item = useAddItemStore((state) => state.item);
  const setItem = useAddItemStore((state) => state.setItem);

  return (
    <InputGroup>
      <Label>Security level</Label>

      <Select
        value={String(item.securityLevel.id)}
        onChange={(value) =>
          setItem({
            ...item,
            securityLevel: SECURITY_LEVELS.find(
              (level) => level.id === +value
            )!,
          })
        }
      >
        {SECURITY_LEVELS.map((level) => (
          <Select.Option value={String(level.id)} key={level.id}>
            {level.name}
            {level.name === "High" && <> (Recommended)</>}
          </Select.Option>
        ))}
      </Select>

      <MutedText>
        The higher your security level, the more secure your secret will be, but
        it will take longer to encrypt and decrypt.
        <br />
        If you plan on encrypting or decrypting your secret on a low-power
        device, choose a lower security level.
      </MutedText>
    </InputGroup>
  );
}

export default SecurityLevelFormField;
