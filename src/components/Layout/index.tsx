import { Page } from "@geist-ui/core";
import React from "react";
import IncompatibleInfo from "../IncompatibleInfo";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page dotBackdrop width="auto">
      <IncompatibleInfo />

      <Page.Content style={{ minHeight: "90vh" }}>{children}</Page.Content>

      <Page.Footer className="!relative">
        <Footer />
      </Page.Footer>
    </Page>
  );
}

export default Layout;
