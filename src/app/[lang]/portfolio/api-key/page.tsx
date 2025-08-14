import React from "react";
import { Metadata } from "next";
import { generatePageTitle } from "@/utils";
import APIKeyView from "./view";
import { PageTitleMap } from "@/constant";
import { PathEnum } from "@/constant";
import { generateLangParams } from "@/staticParams";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.ApiKey]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function APIKeyPage() {
  return <APIKeyView />;
}
