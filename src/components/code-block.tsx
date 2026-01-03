interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="p-4 font-mono border border-border text-sm overflow-x-auto rounded-md bg-[#121212] text-[#e0cdb8]">
      <code>{code}</code>
    </pre>
  );
}
