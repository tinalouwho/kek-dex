"use client";

import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window === "undefined") return;

      // Check for mobile devices using user agent
      const userAgent = navigator.userAgent || "";
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

      // Check screen size for mobile
      const isMobileScreen = window.innerWidth <= 768;

      // Check for touch devices
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // More specific mobile detection
      const isAndroid = /Android/i.test(userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isMobileUA = mobileRegex.test(userAgent);

      // Tablet detection
      const isTabletScreen =
        window.innerWidth > 768 && window.innerWidth <= 1024;
      const isIPad =
        /iPad/.test(userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      const mobile =
        isMobileUA ||
        (isMobileScreen && isTouchDevice) ||
        isAndroid ||
        (isIOS && !isIPad);
      const tablet = isIPad || (isTabletScreen && isTouchDevice);

      setIsMobile(mobile);
      setIsTablet(tablet);
    };

    checkDevice();

    // Re-check on resize
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isMobileOrTablet: isMobile || isTablet,
  };
};
