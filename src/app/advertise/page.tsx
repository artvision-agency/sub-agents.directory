import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Advertise on Sub-Agents Directory",
  description:
    "Reach developers building with Claude Code. Advertise your product or service on Sub-Agents Directory.",
};

export default function Advertise() {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto px-6 py-12 pb-32">
        <h1 className="text-4xl mb-12 mt-20 text-center font-fraunces">
          Advertise on <br />
          Sub-Agents Directory
        </h1>

        <div className="space-y-6 mt-10">
          <section>
            <h2 className="text-xl mb-2">Reach an Engaged Developer Audience</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              Sub-Agents Directory attracts thousands of developers daily - and we're growing
              steadily. Our audience consists of developers, engineering leaders, and technical
              decision-makers who are actively building with Claude Code and looking for ways to
              improve their development workflow.
            </p>
            <p className="text-[#878787] leading-relaxed text-sm mt-4">
              View our{" "}
              <a
                href="https://dashboard.simpleanalytics.com/sub-agents.directory"
                className="text-primary border-border border-dashed border-b-[1px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                public analytics dashboard
              </a>{" "}
              for real-time traffic stats.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-2">Why Advertise With Us</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              Our community is highly engaged with AI development tools, prompts, and MCP servers.
              If you're offering developer tools, APIs, cloud services, or any tech product, our
              platform provides direct access to your ideal audience. Our users are early adopters
              who actively influence technology choices within their organizations.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-2">Advertising Options</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              We offer various advertising opportunities including:
              <br />• Grid Ad - $10/month (in-grid card placement)
              <br />• Banner Ad - $15/month (fixed bottom-right banner)
              <br />• Premium Bundle - $20/month (grid + banner)
            </p>

            <p className="text-primary mt-6 text-sm w-full">
              <Button asChild className="w-full">
                <Link href="/checkout?products=89fe2dff-f85e-45b5-b2e9-46f5863abde2&products=7ffa002b-8710-4919-9cdc-e6d2e10cdcd6&products=1744ea1d-9d45-48c4-b3a3-b25b757eb4d3">
                  Buy ad slot
                </Link>
              </Button>
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-2">How It Works</h2>
            <p className="text-[#878787] leading-relaxed text-sm">
              1. Choose your ad placement and complete payment
              <br />
              2. Send your ad content (logo, image, description, link) to{" "}
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
              3. Your ad goes live within 24-48 hours
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
