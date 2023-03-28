import GetSecret from "@/components/GetSecret";
import Layout from "@/components/Layout";
import useGetItemStore from "@/store/getItemStore";
import { Card, Text } from "@geist-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function GetSecretPage() {
  const router = useRouter();
  const { secretId } = router.query;
  const password =
    typeof window !== "undefined"
      ? window.location.hash.replace("#", "")
      : null;
  const store = useGetItemStore();

  useEffect(() => {
    if (secretId) {
      store.setSecretId(secretId as string);
    }
  }, [secretId]);

  useEffect(() => {
    if (password) {
      store.setItem({
        ...store.item,
        password,
      });
    }
  }, [password]);

  return (
    <Layout>
      <Text h1 font="2rem" className="text-center">
        Get secret
      </Text>

      <Card width="min(70vw, 500px)" mx="auto">
        <GetSecret />
      </Card>
    </Layout>
  );
}

export default GetSecretPage;
