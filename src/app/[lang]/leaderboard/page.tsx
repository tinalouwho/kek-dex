import React from "react";
import { Metadata } from "next";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";
import LeaderboardView from "./view";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Leaderboard]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
