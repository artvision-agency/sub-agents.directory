export function SearchTitle() {
  return (
    <div className="text-center mb-6">
      <h1 className="text-xl mb-2">Find MCP servers</h1>
      <p className="text-sm text-[#878787]">
        Discover and search for custom MCP tools to extend Claude Code.{" "}
        <a
          href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/tutorials/set-up-model-context-protocol"
          className="underline"
        >
          How to use them in Claude Code.
        </a>
      </p>
    </div>
  );
}
