import React from "react";
import { Metadata } from "next";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";
import PositionsView from "./view";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Positions]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function PositionsPage() {
  return <PositionsView />;
}
