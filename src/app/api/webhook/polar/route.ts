import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle webhook events
    // For manual fulfillment, check Polar dashboard for order details
    // Then update src/data/ads.ts with customer's ad content

    switch (payload.type) {
      case "checkout.updated": {
        // Payment completed - new ad slot purchase
        // Customer email: payload.data.customerEmail
        // Metadata: payload.data.metadata
        break;
      }

      case "order.created": {
        // Order created
        break;
      }

      default:
        // Unhandled event
        break;
    }
  },
});
