import { Metadata } from "next";
import PortfolioView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Portfolio]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function PortfolioPage() {
  return <PortfolioView />;
}
