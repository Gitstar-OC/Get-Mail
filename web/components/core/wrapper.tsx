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
        <TabsList className="w-full justify-start bg-inherit border-b rounded-none">
          <TabsTrigger
            className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
            value="client"
          >
            Client Code
          </TabsTrigger>
          {serverCode && (
            <TabsTrigger
              className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              value="server"
            >
              Server Code
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="preview" className="p-4  rounded-lg">
          {component}
        </TabsContent>

        <TabsContent value="client" className="text">
          <div className="max-h-[500px] overflow-y-auto ">
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              className="rounded-lg "
            >
              {clientCode}
            </SyntaxHighlighter>
          </div>
        </TabsContent>

        {serverCode && (
          <TabsContent value="server">
            <div className="max-h-[500px] overflow-y-auto">
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                className="rounded-lg"
              >
                {serverCode}
              </SyntaxHighlighter>
              </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

