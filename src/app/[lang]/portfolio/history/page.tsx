import React from "react";
import { Metadata } from "next";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";
import HistoryView from "./view";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.History]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function HistoryPage() {
  return <HistoryView />;
}
