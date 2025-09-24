import { useMemo } from "react";
import Image from "next/image";
import { type RestrictedInfoOptions } from "@orderly.network/hooks";
import { useTranslation } from "@orderly.network/i18n";
import { AppLogos } from "@orderly.network/react-app";
import { TradingPageProps } from "@orderly.network/trading";
import { FooterProps, MainNavWidgetProps } from "@orderly.network/ui-scaffold";
import { PathEnum } from "@/constant";
import { OrderlyActiveIcon, OrderlyIcon } from "../components/icons/orderly";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
    restrictedInfo?: RestrictedInfoOptions;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    footerProps: FooterProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
  };
};

export const useOrderlyConfig = () => {
  const { t } = useTranslation();

  return useMemo<OrderlyConfig>(() => {
    return {
      scaffold: {
        mainNavProps: {
          mainMenus: [
            { name: t("common.trading"), href: PathEnum.Root },
            { name: t("common.portfolio"), href: PathEnum.Portfolio },
            { name: t("common.markets"), href: PathEnum.Markets },
            // Temporarily hidden - Leaderboard
            // {
            //   name: t("tradingLeaderboard.leaderboard"),
            //   href: PathEnum.Leaderboard,
            // },
            { name: "$KEK", href: PathEnum.Kek },
            {
              name: t("tradingRewards.rewards"),
              href: PathEnum.Rewards,
              children: [
                {
                  name: t("common.tradingRewards"),
                  href: PathEnum.RewardsTrading,
                  description: t("extend.tradingRewards.description"),
                },
                {
                  name: t("common.affiliate"),
                  href: PathEnum.RewardsAffiliate,
                  tag: t("extend.affiliate.tag"),
                  description: t("extend.affiliate.description"),
                },
                {
                  name: t("extend.staking"),
                  href: "https://app.orderly.network/staking",
                  description: t("extend.staking.description"),
                  target: "_blank",
                  icon: <OrderlyIcon size={14} />,
                  activeIcon: <OrderlyActiveIcon size={14} />,
                },
              ],
            },
          ],
          initialMenu: PathEnum.Root,
        },
        footerProps: {
          telegramUrl: "https://orderly.network",
          discordUrl: "https://discord.com/invite/orderlynetwork",
          twitterUrl: "https://twitter.com/OrderlyNetwork",
        },
      },
      orderlyAppProvider: {
        appIcons: {
          main: {
            component: (
              <Image
                alt="KEK DEX logo"
                src="/images/keklogo2.png"
                width={100}
                height={100}
                priority
                className="w-14 h-14 ml-2 mt-1 object-cover"
              />
            ),
          },
          secondary: {
            img: "/images/keklogo2.png",
          },
        },
        restrictedInfo: {
          enableDefault: true,
          customRestrictedIps: [],
          customRestrictedRegions: [],
        },
      },
      tradingPage: {
        tradingViewConfig: {
          scriptSRC: "/tradingview/charting_library/charting_library.js",
          library_path: "/tradingview/charting_library/",
          customCssUrl: "/tradingview/chart.css",
          theme: "dark",
          toolbar_bg: "#1b1b1b",
          loading_screen: {
            backgroundColor: "#0a0a0a",
            foregroundColor: "#00ff37",
          },
          overrides: {
            "paneProperties.background": "#1b1b1b",
            "paneProperties.backgroundType": "solid",
            "scalesProperties.backgroundColor": "#1b1b1b",
            "scalesProperties.lineColor": "1b1b1b",
            "scalesProperties.textColor": "rgba(255, 255, 255, 0.98)",
            "mainSeriesProperties.candleStyle.upColor": "#00ff37",
            "mainSeriesProperties.candleStyle.downColor": "#ff0000",
            "mainSeriesProperties.candleStyle.borderUpColor": "#00ff37",
            "mainSeriesProperties.candleStyle.borderDownColor": "#ff0000",
            "mainSeriesProperties.candleStyle.wickUpColor": "#00ff37",
            "mainSeriesProperties.candleStyle.wickDownColor": "#ff0000",
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
            "paneProperties.vertGridProperties.color": "rgba(0, 0, 0, 1)",
            "paneProperties.horzGridProperties.color": "rgba(0, 0, 0, 1)",
            "paneProperties.crossHairProperties.color": "#00ff37",
            // Volume colors
            "volume.volume.color.0": "#ff0000",
            "volume.volume.color.1": "#00ff37",
            "volume.volume.transparency": 0,
            "volume.precision": 0,
            "volume.scale": 0,
            "volume.volume ma.visible": false,
            "Volume.volume.color.0": "#ff0000",
            "Volume.volume.color.1": "#00ff37",
            "Volume.scale": 0,
            // Bollinger Bands colors
            "bollinger bands.median.color": "#00e0d0",
            "bollinger bands.upper.color": "#ff0000",
            "bollinger bands.lower.color": "#00ff37",
          },
        },
        sharePnLConfig: {
          backgroundImages: [
            "/images/pnl/poster_bg_1.png",
            "/images/pnl/poster_bg_2.png",
            "/images/pnl/poster_bg_3.png",
            "/images/pnl/poster_bg_4.png",
          ],

          color: "rgba(255, 255, 255, 0.98)",
          profitColor: "rgba(0, 255, 55, 1)", // KEK Terminal green
          lossColor: "rgba(255, 0, 0, 1)", // KEK Terminal red
          brandColor: "rgba(255, 255, 255, 0.98)",

          // ref
          refLink: "https://orderly.network",
          refSlogan: "Orderly referral",
        },
      },
    };
  }, [t]);
};
