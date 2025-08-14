import React from "react";
import { Metadata } from "next";
import { generatePageTitle } from "@/utils";
import HistoryView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generateLangParams } from "@/staticParams";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.History]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function HistoryPage() {
  return <HistoryView />;
}
