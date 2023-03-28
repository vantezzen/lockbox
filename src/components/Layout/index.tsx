import { Page } from "@geist-ui/core";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page dotBackdrop width="auto">
      {children}
    </Page>
  );
}

export default Layout;
