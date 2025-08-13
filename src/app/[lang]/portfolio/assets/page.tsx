import React from "react";
import { Metadata } from "next";
import { PageTitleMap, PathEnum } from "@/constant";
import AssetsView from "./view";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Assets]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function AssetsPage() {
  return <AssetsView />;
}
