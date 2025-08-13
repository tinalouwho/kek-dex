import React from "react";
import { Metadata } from "next";
import MarketsView from "./view";
import { PathEnum, PageTitleMap } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Markets]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function MarketsPage() {
  return <MarketsView />;
}
