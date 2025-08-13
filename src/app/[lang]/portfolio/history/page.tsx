import React from "react";
import { Metadata } from "next";
import HistoryView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.History]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function HistoryPage() {
  return <HistoryView />;
}
