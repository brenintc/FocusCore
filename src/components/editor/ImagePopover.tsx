
import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImagePopoverProps {
  execCommand: (command: string, value?: string) => void;
}

export const ImagePopover: React.FC<ImagePopoverProps> = ({ execCommand }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);

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
        setImageUrl('');
        setImagePopoverOpen(false);
      }
    }
  };

  return (
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
  );
};
