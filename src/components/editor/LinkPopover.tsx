
import React, { useState } from 'react';
import { Link } from 'lucide-react';
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

interface LinkPopoverProps {
  execCommand: (command: string, value?: string) => void;
}

export const LinkPopover: React.FC<LinkPopoverProps> = ({ execCommand }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false);

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
        setLinkUrl('');
        setLinkText('');
        setLinkPopoverOpen(false);
      }
    }
  };

  return (
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
  );
};
