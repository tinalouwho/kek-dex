import React from "react";
import { Metadata } from "next";
import PositionsView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Positions]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function PositionsPage() {
  return <PositionsView />;
}
