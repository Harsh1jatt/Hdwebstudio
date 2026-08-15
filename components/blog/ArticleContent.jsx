import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { sanitizeArticleHtml, getContentFormat } from "@/lib/content/sanitizeArticleHtml";

export default function ArticleContent({ content = "", contentFormat }) {
  const format = getContentFormat(content, contentFormat);

  if (!content?.trim()) {
    return null;
  }

  if (format === "html") {
    const safe = sanitizeArticleHtml(content);
    return (
      <div
        className="article-content prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl prose-pre:bg-slate-900 prose-pre:text-slate-100"
        dangerouslySetInnerHTML={{ __html: safe }}
      />
    );
  }

  return <MarkdownRenderer markdown={content} />;
}
