import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful - Sub-Agents Directory",
  description: "Thank you for your purchase!",
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto px-6 py-12 pb-32">
        <h1 className="text-4xl mb-12 mt-20 text-center font-fraunces">Payment Successful!</h1>

        <div className="space-y-6 mt-10">
          <section>
            <h2 className="text-xl mb-2">Thank You</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              Your ad slot purchase on Sub-Agents Directory has been confirmed. We appreciate your
              support and look forward to featuring your brand to our engaged developer community.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-2">Next Steps</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              1. Send your ad content to{" "}
              <a
                href="https://twitter.com/shydev69"
                className="text-primary border-border border-dashed border-b-[1px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                @shydev69 on Twitter
              </a>{" "}
              or{" "}
              <a
                href="mailto:ayush1337@hotmail.com"
                className="text-primary border-border border-dashed border-b-[1px]"
              >
                ayush1337@hotmail.com
              </a>
              <br />
              2. Include: Company name, Logo (square, min 128x128px), Ad image (1:1 ratio),
              Description (max 100 chars), and Link URL
              <br />
              3. Your ad will be live within 24-48 hours after review
            </p>

            <p className="text-primary mt-6 text-sm w-full">
              <Button asChild className="w-full">
                <a href="https://twitter.com/shydev69" target="_blank" rel="noopener noreferrer">
                  Contact on Twitter
                </a>
              </Button>
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-2">Questions?</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              If you have any questions about your purchase or need assistance, feel free to reach
              out on{" "}
              <a
                href="https://twitter.com/shydev69"
                className="text-primary border-border border-dashed border-b-[1px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter @shydev69
              </a>{" "}
              or email{" "}
              <a
                href="mailto:ayush1337@hotmail.com"
                className="text-primary border-border border-dashed border-b-[1px]"
              >
                ayush1337@hotmail.com
              </a>
              .
            </p>

            <p className="mt-6 text-sm w-full">
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
