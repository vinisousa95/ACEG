import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/cn";

/** Renderiza Markdown dos arquivos de conteúdo (HTML bruto é ignorado por padrão). */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-aceg", className)}>
      <ReactMarkdown
        components={{
          a: ({ href = "", children: c }) => {
            const externo = /^https?:/.test(href);
            return (
              <a href={href} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {c}
              </a>
            );
          },
          h1: ({ children: c }) => <h2>{c}</h2>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
