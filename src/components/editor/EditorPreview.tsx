
import React from 'react';

interface EditorPreviewProps {
  content: string;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({ content }) => {
  return (
    <div className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none">
      {content ? (
        <div 
          dangerouslySetInnerHTML={{ __html: content }} 
          style={{ direction: 'ltr', textAlign: 'left' }} 
          dir="ltr" 
        />
      ) : (
        <p className="text-muted-foreground">Sem conteúdo para exibir.</p>
      )}
    </div>
  );
};
