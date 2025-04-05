
import React, { useRef, useEffect } from 'react';

interface EditorContentProps {
  initialContent: string;
  onContentChange: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
}

export const EditorContent: React.FC<EditorContentProps> = ({ 
  initialContent, 
  onContentChange,
  editorRef
}) => {
  return (
    <div
      ref={editorRef}
      className="min-h-[300px] max-h-[600px] overflow-y-auto p-4 outline-none prose prose-sm dark:prose-invert max-w-none"
      contentEditable
      onInput={onContentChange}
      onBlur={onContentChange}
      spellCheck="true"
      data-placeholder="Comece a escrever aqui..."
      style={{ direction: 'ltr', textAlign: 'left' }}
      dir="ltr"
    />
  );
};
