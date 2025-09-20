"use client";

import Spline from "@splinetool/react-spline";

export default function Bars() {
  return (
    <Spline
      scene="/bars.splinecode"
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    />
  );
}
