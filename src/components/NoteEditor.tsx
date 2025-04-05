
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { EditorContent } from "@/components/editor/EditorContent";
import { EditorPreview } from "@/components/editor/EditorPreview";
import { changeFontSize, changeFontFamily, createTable } from "@/components/editor/editorUtils";

interface NoteEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [fontSize, setFontSize] = useState('16px');
  const [fontFamily, setFontFamily] = useState('Inter');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      document.execCommand('styleWithCSS', false, 'true');
      document.execCommand('defaultParagraphSeparator', false, 'p');
      
      // Configurar direção inicial
      editorRef.current.style.direction = 'ltr';
      editorRef.current.style.textAlign = 'left';
      editorRef.current.setAttribute('dir', 'ltr');
    }
  }, [initialContent]);

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleContentChange();
  };

  const insertHeading = (level: 1 | 2 | 3) => {
    execCommand('formatBlock', `<h${level}>`);
  };

  const handleChangeFontSize = (size: string) => {
    setFontSize(size);
    changeFontSize(size);
    handleContentChange();
  };

  const handleChangeFontFamily = (family: string) => {
    setFontFamily(family);
    changeFontFamily(family);
    handleContentChange();
  };

  const insertTable = () => {
    const table = createTable();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);
      handleContentChange();
    }
  };

  return (
    <div className="rounded-md border">
      <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
        <div className="flex flex-wrap items-center gap-1 p-1 border-b">
          <TabsList className="mr-auto">
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
          </TabsList>
          
          {view === 'edit' && (
            <EditorToolbar 
              fontSize={fontSize}
              fontFamily={fontFamily}
              onChangeFontSize={handleChangeFontSize}
              onChangeFontFamily={handleChangeFontFamily}
              execCommand={execCommand}
              insertHeading={insertHeading}
              insertTable={insertTable}
            />
          )}
        </div>
        
        <TabsContent value="edit" className="p-0">
          <EditorContent 
            initialContent={initialContent}
            onContentChange={handleContentChange}
            editorRef={editorRef}
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <EditorPreview content={initialContent} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
