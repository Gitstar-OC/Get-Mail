"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeWrapperProps {
  title: string;
  description: string;
  component: React.ReactNode;
  clientCode: string;
  serverCode?: string;
}

export function CodeWrapper({
  title,
  description,
  component,
  clientCode,
  serverCode,
}: CodeWrapperProps) {
  return (
    <div className="p-6 rounded-lg space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="client">Client Code</TabsTrigger>
          {serverCode && <TabsTrigger value="server">Server Code</TabsTrigger>}
        </TabsList>

        <TabsContent value="preview" className="p-4  rounded-lg">
          {component}
        </TabsContent>

        <TabsContent value="client">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            className="rounded-lg"
          >
            {clientCode}
          </SyntaxHighlighter>
        </TabsContent>

        {serverCode && (
          <TabsContent value="server">
            <SyntaxHighlighter
              language="typescript" 
              style={vscDarkPlus}
              className="rounded-lg"
            >
              {serverCode}
            </SyntaxHighlighter>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}