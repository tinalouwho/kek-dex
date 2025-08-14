import React from "react";
import { Metadata } from "next";
import { generatePageTitle } from "@/utils";
import OrdersView from "./view";
import { PageTitleMap, PathEnum } from "@/constant";
import { generateLangParams } from "@/staticParams";

export const metadata: Metadata = {
  title: generatePageTitle(PageTitleMap[PathEnum.Orders]),
};

export async function generateStaticParams() {
  return generateLangParams();
}

export default function OrdersPage() {
  return <OrdersView />;
}
