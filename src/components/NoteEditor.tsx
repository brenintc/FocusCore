import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Heading1, 
  Heading2, 
  Heading3,
  Link,
  Image,
  Quote,
  Palette,
  Type,
  Edit,
  Trash,
  Copy,
  MoreHorizontal,
  ArrowLeft
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from 'next/navigation';

interface NoteEditorProps {
  initialContent: string;
  title?: string;
  onChange: (content: string) => void;
  onTitleChange?: (title: string) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onBack?: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ 
  initialContent, 
  title = "Nova Nota", 
  onChange, 
  onTitleChange,
  onDelete,
  onDuplicate,
  onBack
}) => {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);

  // Cores predefinidas para texto e destaque
  const colors = [
    { name: 'Preto', value: '#000000' },
    { name: 'Vermelho', value: '#FF0000' },
    { name: 'Azul', value: '#0000FF' },
    { name: 'Verde', value: '#008000' },
    { name: 'Roxo', value: '#800080' },
    { name: 'Laranja', value: '#FFA500' }
  ];

  const highlightColors = [
    { name: 'Amarelo', value: '#FFFF00' },
    { name: 'Verde Claro', value: '#90EE90' },
    { name: 'Azul Claro', value: '#87CEEB' },
    { name: 'Rosa', value: '#FFB6C1' },
    { name: 'Laranja Claro', value: '#FFE4B5' }
  ];

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      document.execCommand('styleWithCSS', false, 'true');
      document.execCommand('defaultParagraphSeparator', false, 'p');
      
      // Configurar direção do texto
      const elements = editorRef.current.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        element.style.direction = 'ltr';
        element.style.textAlign = 'left';
      }
    }
  }, [initialContent]);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  const handleContentChange = () => {
    if (editorRef.current) {
      // Garantir direção correta ao editar
      const elements = editorRef.current.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        element.style.direction = 'ltr';
        element.style.textAlign = 'left';
      }
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    handleContentChange();
  };

  const insertHeading = (level: 1 | 2 | 3) => {
    execCommand('formatBlock', `h${level}`);
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
      execCommand('createLink', url);
      setLinkUrl('');
      setLinkText('');
      setLinkPopoverOpen(false);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      execCommand('insertImage', imageUrl);
      setImageUrl('');
      setImagePopoverOpen(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setCurrentTitle(newTitle);
    onTitleChange?.(newTitle);
    setIsEditingTitle(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleTitleChange(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleChange(e.currentTarget.value);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div 
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center justify-between p-2 border-b bg-background">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <Input
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                className="h-8 w-[200px]"
                autoFocus
              />
            ) : (
              <h2 
                className="text-lg font-semibold cursor-pointer hover:text-primary"
                onClick={handleTitleClick}
              >
                {currentTitle}
              </h2>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Renomear
            </DropdownMenuItem>
            {onDuplicate && (
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
            )}
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as 'edit' | 'preview')}>
        <div className="flex flex-wrap items-center gap-2 p-2 border-b bg-background">
          <TabsList className="mr-auto">
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
          </TabsList>
          
          {view === 'edit' && (
            <TooltipProvider>
              <div className="flex flex-wrap items-center gap-2">
                {/* Formatação de texto básica */}
                <ToggleGroup type="multiple" className="flex-wrap bg-background">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="bold" onClick={() => execCommand('bold')}>
                        <Bold className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Negrito</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="italic" onClick={() => execCommand('italic')}>
                        <Italic className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Itálico</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="underline" onClick={() => execCommand('underline')}>
                        <Underline className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Sublinhado</TooltipContent>
                  </Tooltip>
                </ToggleGroup>

                <Separator orientation="vertical" className="h-6" />

                {/* Títulos */}
                <ToggleGroup type="single" className="flex-wrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="h1" onClick={() => insertHeading(1)}>
                        <Heading1 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Título Grande</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="h2" onClick={() => insertHeading(2)}>
                        <Heading2 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Título Médio</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="h3" onClick={() => insertHeading(3)}>
                        <Heading3 className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Título Pequeno</TooltipContent>
                  </Tooltip>
                </ToggleGroup>

                <Separator orientation="vertical" className="h-6" />

                {/* Listas */}
                <ToggleGroup type="single" className="flex-wrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="ul" onClick={() => execCommand('insertUnorderedList')}>
                        <List className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Lista com Marcadores</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem value="ol" onClick={() => execCommand('insertOrderedList')}>
                        <ListOrdered className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Lista Numerada</TooltipContent>
                  </Tooltip>
                </ToggleGroup>

                <Separator orientation="vertical" className="h-6" />

                {/* Cores */}
                <Popover>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Palette className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Cores</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent className="w-64">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Cor do Texto</h4>
                        <div className="grid grid-cols-6 gap-1">
                          {colors.map((color) => (
                            <Button
                              key={color.value}
                              variant="outline"
                              className="h-6 w-6 p-0"
                              style={{ backgroundColor: color.value }}
                              onClick={() => execCommand('foreColor', color.value)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Destaque</h4>
                        <div className="grid grid-cols-5 gap-1">
                          {highlightColors.map((color) => (
                            <Button
                              key={color.value}
                              variant="outline"
                              className="h-6 w-6 p-0"
                              style={{ backgroundColor: color.value }}
                              onClick={() => execCommand('hiliteColor', color.value)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Links e Imagens */}
                <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Link className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Inserir Link</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Inserir Link</h4>
                        <div className="grid gap-2">
                          <div className="grid gap-1">
                            <Label htmlFor="link-text">Texto do Link</Label>
                            <Input
                              id="link-text"
                              placeholder="Texto do link"
                              value={linkText}
                              onChange={(e) => setLinkText(e.target.value)}
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label htmlFor="link-url">URL</Label>
                            <Input
                              id="link-url"
                              placeholder="https://exemplo.com"
                              value={linkUrl}
                              onChange={(e) => setLinkUrl(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button onClick={insertLink} className="w-full">
                          Inserir Link
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Image className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Inserir Imagem</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Inserir Imagem</h4>
                        <div className="grid gap-2">
                          <div className="grid gap-1">
                            <Label htmlFor="image-url">URL da Imagem</Label>
                            <Input
                              id="image-url"
                              placeholder="https://exemplo.com/imagem.jpg"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button onClick={insertImage} className="w-full">
                          Inserir Imagem
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipProvider>
          )}
        </div>
        
        <TabsContent value="edit" className="p-0">
          <div
            ref={editorRef}
            className="min-h-[300px] max-h-[600px] overflow-y-auto p-4 outline-none prose prose-sm dark:prose-invert max-w-none bg-background dark:bg-background editor-content"
            contentEditable
            onInput={handleContentChange}
            onBlur={handleContentChange}
            spellCheck="true"
            data-placeholder="Comece a escrever aqui..."
            style={{ 
              padding: '1rem',
              borderRadius: '0.375rem',
              writingMode: 'horizontal-tb',
              direction: 'ltr',
              textAlign: 'left'
            }}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none bg-background dark:bg-background">
          {initialContent ? (
            <div 
              dangerouslySetInnerHTML={{ __html: initialContent }} 
              className="text-foreground dark:text-foreground editor-content"
              style={{ 
                writingMode: 'horizontal-tb',
                direction: 'ltr',
                textAlign: 'left'
              }}
            />
          ) : (
            <p className="text-muted-foreground dark:text-muted-foreground">Sem conteúdo para exibir.</p>
          )}
        </TabsContent>
      </Tabs>

      <style>
        {`
          .editor-content.prose {
            writing-mode: horizontal-tb;
            direction: ltr;
            text-align: left;
            --tw-prose-body: hsl(var(--foreground));
            --tw-prose-headings: hsl(var(--foreground));
            --tw-prose-lead: hsl(var(--foreground));
            --tw-prose-links: hsl(var(--primary));
            --tw-prose-bold: hsl(var(--foreground));
            --tw-prose-counters: hsl(var(--foreground));
            --tw-prose-bullets: hsl(var(--foreground));
            --tw-prose-hr: hsl(var(--border));
            --tw-prose-quotes: hsl(var(--foreground));
            --tw-prose-quote-borders: hsl(var(--border));
            --tw-prose-captions: hsl(var(--muted-foreground));
            --tw-prose-code: hsl(var(--foreground));
            --tw-prose-pre-code: hsl(var(--foreground));
            --tw-prose-pre-bg: hsl(var(--muted));
            --tw-prose-th-borders: hsl(var(--border));
            --tw-prose-td-borders: hsl(var(--border));
          }

          .dark .editor-content.prose {
            writing-mode: horizontal-tb;
            direction: ltr;
            text-align: left;
            --tw-prose-body: hsl(var(--foreground));
            --tw-prose-headings: hsl(var(--foreground));
            --tw-prose-lead: hsl(var(--foreground));
            --tw-prose-links: hsl(var(--primary));
            --tw-prose-bold: hsl(var(--foreground));
            --tw-prose-counters: hsl(var(--foreground));
            --tw-prose-bullets: hsl(var(--foreground));
            --tw-prose-hr: hsl(var(--border));
            --tw-prose-quotes: hsl(var(--foreground));
            --tw-prose-quote-borders: hsl(var(--border));
            --tw-prose-captions: hsl(var(--muted-foreground));
            --tw-prose-code: hsl(var(--foreground));
            --tw-prose-pre-code: hsl(var(--foreground));
            --tw-prose-pre-bg: hsl(var(--muted));
            --tw-prose-th-borders: hsl(var(--border));
            --tw-prose-td-borders: hsl(var(--border));
          }

          [contenteditable="true"] {
            writing-mode: horizontal-tb !important;
            direction: ltr !important;
            text-align: left !important;
          }

          [contenteditable="true"] * {
            writing-mode: horizontal-tb !important;
            direction: ltr !important;
            text-align: left !important;
          }

          [contenteditable="true"]:empty:before {
            content: attr(data-placeholder);
            color: hsl(var(--muted-foreground));
            pointer-events: none;
          }

          [contenteditable="true"]:focus {
            outline: none;
            box-shadow: 0 0 0 2px hsl(var(--ring));
          }

          /* Estilos específicos para o botão de voltar */
          .back-button {
            transition: all 0.2s ease;
          }

          .back-button:hover {
            transform: translateX(-2px);
          }

          /* Ajustes para tema escuro */
          .dark .back-button {
            color: hsl(var(--muted-foreground));
          }

          .dark .back-button:hover {
            color: hsl(var(--foreground));
          }
        `}
      </style>
    </div>
  );
};
