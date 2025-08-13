import React from "react";
import { Metadata } from "next";
import OrdersView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generatePageTitle, generateLangParams } from "@/utils";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Orders]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function OrdersPage() {
  return <OrdersView />;
}
