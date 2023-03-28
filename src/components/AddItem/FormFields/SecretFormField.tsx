import InputGroup from "@/components/InputGroup";
import Label from "@/components/Label";
import { Textarea } from "@geist-ui/core";
import React from "react";
import useAddItemStore from "../../../store/addItemStore";

function SecretFormField() {
  const item = useAddItemStore((state) => state.item);
  const setItem = useAddItemStore((state) => state.setItem);

  return (
    <InputGroup>
      <Label>Secret</Label>
      <Textarea
        placeholder="Type your secret content here"
        value={item.content}
        onChange={(e) => setItem({ ...item, content: e.target.value })}
        required
        className="font-mono"
      />
    </InputGroup>
  );
}

export default SecretFormField;
