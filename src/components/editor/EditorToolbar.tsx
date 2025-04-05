
import React from 'react';
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
  AlignJustify
} from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkPopover } from "@/components/editor/LinkPopover";
import { ImagePopover } from "@/components/editor/ImagePopover";

interface EditorToolbarProps {
  fontSize: string;
  fontFamily: string;
  onChangeFontSize: (size: string) => void;
  onChangeFontFamily: (family: string) => void;
  execCommand: (command: string, value?: string) => void;
  insertHeading: (level: 1 | 2 | 3) => void;
  insertTable: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  fontSize,
  fontFamily,
  onChangeFontSize,
  onChangeFontFamily,
  execCommand,
  insertHeading,
  insertTable,
}) => {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1">
        <Select value={fontSize} onValueChange={onChangeFontSize}>
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

        <Select value={fontFamily} onValueChange={onChangeFontFamily}>
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
          
          <LinkPopover execCommand={execCommand} />
          <ImagePopover execCommand={execCommand} />

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
  );
};
