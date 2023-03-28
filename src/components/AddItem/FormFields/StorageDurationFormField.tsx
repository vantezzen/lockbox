import InputGroup from "@/components/InputGroup";
import Label from "@/components/Label";
import MutedText from "@/components/MutedText";
import { Select } from "@geist-ui/core";
import React from "react";
import useAddItemStore from "../../../store/addItemStore";

function StorageDurationFormField() {
  const item = useAddItemStore((state) => state.item);
  const setItem = useAddItemStore((state) => state.setItem);

  return (
    <InputGroup>
      <Label>Storage duration</Label>

      <Select
        value={String(item.storageDuration)}
        onChange={(value) => setItem({ ...item, storageDuration: +value })}
      >
        <Select.Option value="1">1 hour</Select.Option>
        <Select.Option value="12">12 hours</Select.Option>
        <Select.Option value="24">1 day</Select.Option>
        <Select.Option value="168">1 week</Select.Option>
      </Select>

      <MutedText>
        After the storage duration has passed, your secret will be deleted
        automatically. Additionally, your secret will be immediately deleted
        after it has been accessed.
      </MutedText>
    </InputGroup>
  );
}

export default StorageDurationFormField;
