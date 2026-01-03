import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
});

// Product IDs from Polar dashboard
// Update these after creating products in Polar
export const PRODUCTS = {
  gridAd: process.env.POLAR_PRODUCT_GRID_AD || "",
  bannerAd: process.env.POLAR_PRODUCT_BANNER_AD || "",
  premiumBundle: process.env.POLAR_PRODUCT_PREMIUM || "",
};

// Pricing display (in cents)
export const PRICING = {
  gridAd: 9900, // $99
  bannerAd: 14900, // $149
  premiumBundle: 19900, // $199
};
