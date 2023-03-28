import AddItem from "@/components/AddSecret";
import About from "@/components/Landing/About";
import Layout from "@/components/Layout";
import { Card, Text } from "@geist-ui/core";
import { Box } from "@geist-ui/icons";
import React from "react";

function Index() {
  const [hideLanding, setHideLanding] = React.useState(false);

  return (
    <Layout>
      <Text
        h1
        font="2rem"
        className="text-center flex gap-3 items-center justify-center"
      >
        LockBox <Box size={30} />
      </Text>

      <Card width="min(90vw, 500px)" mx="auto">
        <AddItem hideLanding={() => setHideLanding(true)} />
      </Card>

      {!hideLanding && <About />}
    </Layout>
  );
}

export default Index;
