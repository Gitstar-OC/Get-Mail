import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps {
  codeString: string;
  language: string;
}

const CodeHighlighter: React.FC<SyntaxHighlighterProps> = ({ codeString, language }) => {
  return (
    <SyntaxHighlighter language={language} style={solarizedlight}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;