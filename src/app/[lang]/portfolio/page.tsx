import { Metadata } from "next";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";
import PortfolioView from "./view";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Portfolio]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function PortfolioPage() {
  return <PortfolioView />;
}
