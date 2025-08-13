import React from "react";
import { Metadata } from "next";
import LeaderboardView from "./view";
import { generatePageTitle, generateLangParams } from "@/utils";
import { PageTitleMap, PathEnum } from "@/constant";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Leaderboard]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
