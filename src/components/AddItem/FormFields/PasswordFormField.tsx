import InputGroup from "@/components/InputGroup";
import MutedText from "@/components/MutedText";
import { Crypto } from "@/lib/Crypto";
import { Input, Tabs } from "@geist-ui/core";
import React, { useEffect, useState } from "react";
import { RotateCw } from "@geist-ui/icons";
import useAddItemStore from "../../../store/addItemStore";

function PasswordFormField() {
  const item = useAddItemStore((state) => state.item);
  const setItem = useAddItemStore((state) => state.setItem);
  const setAddPasswordToUrl = useAddItemStore(
    (state) => state.setAddPasswordToUrl
  );

  const [showPasswordField, setShowPasswordField] = useState(false);

  const [passwordBehavior, setPasswordBehavior] = useState<
    "automatic" | "manual"
  >("automatic");

  const generateRandomPassword = async () => {
    const crypto = new Crypto();
    const randomPassword = await crypto.generateSecret();
    setItem({ ...item, password: randomPassword });
  };

  useEffect(() => {
    generateRandomPassword();
  }, []);

  return (
    <InputGroup>
      <Tabs
        value={passwordBehavior}
        onChange={(value) => {
          if (value === "automatic") {
            generateRandomPassword();
          } else {
            setItem({ ...item, password: "" });
          }
          setAddPasswordToUrl(value === "automatic");
          setPasswordBehavior(value as "automatic" | "manual");
        }}
      >
        <Tabs.Item label="Automatic password" value="automatic">
          <MutedText>
            A password will be generated for you and added to the shared URL.
            <br />
            The password will never be transferred to our servers and stays on
            your device at all times!
          </MutedText>
        </Tabs.Item>
        <Tabs.Item label="Manual password" value="manual">
          <Input
            htmlType={showPasswordField ? "text" : "password"}
            placeholder="*********"
            width="100%"
            value={item.password}
            onChange={(e) => setItem({ ...item, password: e.target.value })}
            // @ts-ignore
            iconRight={
              <button className="cursor-pointer">
                <RotateCw size={14} />
              </button>
            }
            onIconClick={async () => {
              generateRandomPassword();
              setShowPasswordField(true);
            }}
            iconClickable
            required
          >
            Password
          </Input>
          <MutedText>
            Choose a secure, long password to increase the security of your
            secret. Alternatively, click the{" "}
            <RotateCw size={11} className="inline-block mx-1" /> button to
            generate a random password.
            <br />
            Be sure to save your password before saving the secret as it will
            not be shown again!
          </MutedText>
        </Tabs.Item>
      </Tabs>
    </InputGroup>
  );
}

export default PasswordFormField;
