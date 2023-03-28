import { Page } from "@geist-ui/core";
import React from "react";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page dotBackdrop width="auto">
      <Page.Content style={{ minHeight: "90vh" }}>{children}</Page.Content>

      <Page.Footer className="!relative">
        <Footer />
      </Page.Footer>
    </Page>
  );
}

export default Layout;
