import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
});

export const PRODUCTS = {
  gridAd: process.env.POLAR_PRODUCT_GRID_AD || "",
  bannerAd: process.env.POLAR_PRODUCT_BANNER_AD || "",
  premiumBundle: process.env.POLAR_PRODUCT_PREMIUM || "",
};

export const PRICING = {
  gridAd: 9900,
  bannerAd: 14900,
  premiumBundle: 19900,
};
