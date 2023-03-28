import { Button, Note } from "@geist-ui/core";
import React from "react";

function Error({ error, onReset }: { error: string; onReset: () => void }) {
  return (
    <div>
      <Note mb="2rem">There was an error: {error}</Note>

      <Button type="secondary-light" width="100%" onClick={onReset}>
        Go back
      </Button>
    </div>
  );
}

export default Error;
