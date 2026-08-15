import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

function isSafeSrc(url) {
  return (
    typeof url === "string" &&
    (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))
  );
}

export default function MarkdownRenderer({ markdown = "" }) {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        children={markdown}
        skipHtml={true}
        rehypePlugins={[[rehypeSanitize, {}]]}
        transformLinkUri={(uri) => uri}
        transformImageUri={(uri) => (isSafeSrc(uri) ? uri : "")}
        components={{
          code({ inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="rounded-xl bg-slate-900 p-4 text-slate-100 overflow-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      />
    </div>
  );
}

