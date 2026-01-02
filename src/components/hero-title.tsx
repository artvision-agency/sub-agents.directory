"use client";

export function HeroTitle() {
  const text = "Discover Claude Code sub-agents, prompts and more";

  return (
    <div className="text-center mb-8">
      <h1
        className="text-[21px] mb-2 font-fraunces"
        style={{
          opacity: 0,
          animation: "fadeIn 0.2s ease forwards",
        }}
      >
        {text}
      </h1>

      <p
        className="text-[#878787] text-sm"
        style={{
          opacity: 0,
          animation: "fadeIn 0.2s ease forwards 0.1s",
        }}
      >
        Explore a curated collection of sub-agent prompts and MCP servers. <br />
        <a
          className="border-b border-border border-dashed"
          href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview"
          target="_blank"
          rel="noreferrer"
        >
          New to Claude Code? Learn more here.
        </a>
      </p>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
