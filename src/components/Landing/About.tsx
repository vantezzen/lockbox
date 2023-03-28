import { Text } from "@geist-ui/core";
import React from "react";

function About() {
  return (
    <div className="mt-6 mx-auto max-w-lg">
      <Text h2>Securely share secrets</Text>

      <Text p>
        LockBox is a secure, end-to-end encrypted secret sharing service. It
        allows you to securely share secrets with other people, without having
        to worry about your data being compromised.
      </Text>

      <Text h3>How it works</Text>
      <Text p>
        When you share a secret, the data is encrypted directly on your device,
        meaning it never leaves your device unencrypted. The encrypted data is
        then securely stored on our server. The recipient can access the secret
        by entering the password and decrypting the data on their device. After
        the secret has been decrypted, it is deleted from our server and can no
        longer be accessed.
      </Text>

      <Text h3>Open-Source</Text>
      <Text p>
        LockBox is open-source and available on{" "}
        <a
          href="https://github.com/vantezzen/lockbox"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        . Feel free to check out the code and contribute or to host your own
        server if you want to be in full control of your data.
      </Text>
    </div>
  );
}

export default About;
