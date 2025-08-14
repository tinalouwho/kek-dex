import React from "react";
import { Metadata } from "next";
import { generatePageTitle } from "@/utils";
import PositionsView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generateLangParams } from "@/staticParams";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Positions]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function PositionsPage() {
  return <PositionsView />;
}
