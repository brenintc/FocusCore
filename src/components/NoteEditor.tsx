import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading1, 
  Heading2, 
  Heading3,
  Link,
  Code,
  Image,
  Table,
  Quote,
  Strikethrough,
  Highlighter,
  Type,
  AlignJustify
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NoteEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ initialContent, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
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

  const insertLink = () => {
    if (linkUrl && linkText) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const link = document.createElement('a');
        link.href = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
        link.textContent = linkText;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        range.deleteContents();
        range.insertNode(link);
        handleContentChange();
        setLinkUrl('');
        setLinkText('');
        setLinkPopoverOpen(false);
      }
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagem inserida';
        img.className = 'max-w-full h-auto rounded-md';
        range.deleteContents();
        range.insertNode(img);
        handleContentChange();
        setImageUrl('');
        setImagePopoverOpen(false);
      }
    }
  };

  const insertTable = () => {
    const table = document.createElement('table');
    table.className = 'border-collapse border border-gray-300 dark:border-gray-600';
    table.style.direction = 'ltr';
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (let i = 0; i < 3; i++) {
      const th = document.createElement('th');
      th.className = 'border border-gray-300 dark:border-gray-600 p-2 bg-gray-100 dark:bg-gray-700';
      th.contentEditable = 'true';
      th.style.direction = 'ltr';
      headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    for (let i = 0; i < 3; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.className = 'border border-gray-300 dark:border-gray-600 p-2';
        td.contentEditable = 'true';
        td.style.direction = 'ltr';
        row.appendChild(td);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);
      handleContentChange();
    }
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    document.execCommand('fontSize', false, '7');
    const fontElements = document.getElementsByTagName('font');
    for (let i = 0; i < fontElements.length; i++) {
      if (fontElements[i].size === '7') {
        fontElements[i].removeAttribute('size');
        fontElements[i].style.fontSize = size;
      }
    }
    handleContentChange();
  };

  const changeFontFamily = (family: string) => {
    setFontFamily(family);
    document.execCommand('fontName', false, family);
    handleContentChange();
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
            <TooltipProvider>
              <div className="flex flex-wrap items-center gap-1">
                <Select value={fontSize} onValueChange={changeFontSize}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">Pequeno</SelectItem>
                    <SelectItem value="16px">Normal</SelectItem>
                    <SelectItem value="20px">Grande</SelectItem>
                    <SelectItem value="24px">Muito Grande</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={fontFamily} onValueChange={changeFontFamily}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Courier New">Courier New</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="#000000" onValueChange={(color) => execCommand('foreColor', color)}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Cor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="#000000">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-black" />
                        Preto
                      </div>
                    </SelectItem>
                    <SelectItem value="#FF0000">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-600" />
                        Vermelho
                      </div>
                    </SelectItem>
                    <SelectItem value="#0000FF">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-600" />
                        Azul
                      </div>
                    </SelectItem>
                    <SelectItem value="#008000">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-600" />
                        Verde
                      </div>
                    </SelectItem>
                    <SelectItem value="#FFA500">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange-500" />
                        Laranja
                      </div>
                    </SelectItem>
                    <SelectItem value="#800080">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-600" />
                        Roxo
                      </div>
                    </SelectItem>
                    <SelectItem value="#A52A2A">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-brown-600" />
                        Marrom
                      </div>
                    </SelectItem>
                    <SelectItem value="#808080">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500" />
                        Cinza
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Separator orientation="vertical" className="h-6 mx-1" />

                <ToggleGroup type="multiple" className="flex-wrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="bold" aria-label="Negrito" onClick={() => execCommand('bold')}>
                        <Bold className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Negrito</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="italic" aria-label="Itálico" onClick={() => execCommand('italic')}>
                        <Italic className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Itálico</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="underline" aria-label="Sublinhado" onClick={() => execCommand('underline')}>
                        <Underline className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Sublinhado</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="strikethrough" aria-label="Tachado" onClick={() => execCommand('strikethrough')}>
                        <Strikethrough className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Tachado</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="highlight" aria-label="Marcador" onClick={() => execCommand('hiliteColor', '#ffff00')}>
                        <Highlighter className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Marcador</TooltipContent>
                  </Tooltip>
                  
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="h1" aria-label="Título 1" onClick={() => insertHeading(1)}>
                        <Heading1 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Título 1</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="h2" aria-label="Título 2" onClick={() => insertHeading(2)}>
                        <Heading2 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Título 2</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="h3" aria-label="Título 3" onClick={() => insertHeading(3)}>
                        <Heading3 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Título 3</TooltipContent>
                  </Tooltip>
                  
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="ul" aria-label="Lista não ordenada" onClick={() => execCommand('insertUnorderedList')}>
                        <List className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Lista não ordenada</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="ol" aria-label="Lista ordenada" onClick={() => execCommand('insertOrderedList')}>
                        <ListOrdered className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Lista ordenada</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="quote" aria-label="Citação" onClick={() => execCommand('formatBlock', '<blockquote>')}>
                        <Quote className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Citação</TooltipContent>
                  </Tooltip>
                  
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="left" aria-label="Alinhar à esquerda" onClick={() => execCommand('justifyLeft')}>
                        <AlignLeft className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Alinhar à esquerda</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="center" aria-label="Centralizar" onClick={() => execCommand('justifyCenter')}>
                        <AlignCenter className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Centralizar</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="right" aria-label="Alinhar à direita" onClick={() => execCommand('justifyRight')}>
                        <AlignRight className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Alinhar à direita</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="justify" aria-label="Justificar" onClick={() => execCommand('justifyFull')}>
                        <AlignJustify className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Justificar</TooltipContent>
                  </Tooltip>
                  
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <Link className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Inserir link</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Inserir link</h4>
                          <p className="text-sm text-muted-foreground">
                            Adicione um link ao seu texto
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid gap-1">
                            <Label htmlFor="link-text">Texto do link</Label>
                            <Input
                              id="link-text"
                              placeholder="Texto a ser exibido"
                              value={linkText}
                              onChange={(e) => setLinkText(e.target.value)}
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label htmlFor="link-url">URL do link</Label>
                            <Input
                              id="link-url"
                              placeholder="https://exemplo.com"
                              value={linkUrl}
                              onChange={(e) => setLinkUrl(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button onClick={insertLink}>Inserir link</Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                              <Image className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Inserir imagem</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Inserir imagem</h4>
                          <p className="text-sm text-muted-foreground">
                            Adicione uma imagem ao seu texto
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <div className="grid gap-1">
                            <Label htmlFor="image-url">URL da imagem</Label>
                            <Input
                              id="image-url"
                              placeholder="https://exemplo.com/imagem.jpg"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button onClick={insertImage}>Inserir imagem</Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="table" aria-label="Inserir tabela" onClick={insertTable}>
                        <Table className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Inserir tabela</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="code" aria-label="Código" onClick={() => execCommand('formatBlock', '<pre>')}>
                        <Code className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Código</TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </div>
            </TooltipProvider>
          )}
        </div>
        
        <TabsContent value="edit" className="p-0">
          <div
            ref={editorRef}
            className="min-h-[300px] max-h-[600px] overflow-y-auto p-4 outline-none prose prose-sm dark:prose-invert max-w-none bg-white text-black"
            contentEditable
            onInput={handleContentChange}
            onBlur={handleContentChange}
            spellCheck="true"
            data-placeholder="Comece a escrever aqui..."
            style={{ 
              direction: 'ltr', 
              textAlign: 'left',
              backgroundColor: 'white',
              color: 'black',
              padding: '1rem',
              borderRadius: '0.375rem',
              boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
            }}
            dir="ltr"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none bg-white text-black">
          {initialContent ? (
            <div 
              dangerouslySetInnerHTML={{ __html: initialContent }} 
              style={{ 
                direction: 'ltr', 
                textAlign: 'left',
                backgroundColor: 'white',
                color: 'black',
                padding: '1rem',
                borderRadius: '0.375rem',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
              }} 
              dir="ltr"
              className="bg-white text-black" 
            />
          ) : (
            <p className="text-muted-foreground bg-white text-black p-4 rounded-md">Sem conteúdo para exibir.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
