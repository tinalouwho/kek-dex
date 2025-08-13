import React from "react";
import { Metadata } from "next";
import FeeTierView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.FeeTier]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function FeeTierPage() {
  return <FeeTierView />;
}
