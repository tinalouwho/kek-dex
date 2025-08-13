import React from "react";
import { PerpPage } from "./perp";

/**
 * when in dev mode, not found page should display the perp page.
 * when deployed on Nginx, the 404 page will display the index.html file instead of 404.html.
 */
export default function NotFound() {
  return <PerpPage />;
}
