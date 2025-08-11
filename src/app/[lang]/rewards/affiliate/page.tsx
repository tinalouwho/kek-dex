import React from "react";
import { Metadata } from "next";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";
import AffiliateView from "./view";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.RewardsAffiliate]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function AffiliatePage() {
  return <AffiliateView />;
}
