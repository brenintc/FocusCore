
import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/UserProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { AlertCircle, Save, Trash2, Plus, FileText, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { NoteEditor } from '@/components/NoteEditor';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Notes: React.FC = () => {
  const { userId } = useUser();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`focuscore-${userId}-notes`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [userId]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`focuscore-${userId}-notes`, JSON.stringify(notes));
    }
  }, [notes, userId]);

  const createNewNote = () => {
    if (!newNoteTitle.trim()) {
      toast({
        title: "Título obrigatório",
        description: "Por favor, digite um título para a nota.",
        variant: "destructive",
      });
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => [newNote, ...prev]);
    setActiveNote(newNote);
    setNewNoteTitle('');
    
    toast({
      title: "Nota criada",
      description: "Nova nota criada com sucesso!",
    });
  };

  const updateNote = (updatedContent: string) => {
    if (!activeNote) return;

    const updatedNote = {
      ...activeNote,
      content: updatedContent,
      updatedAt: new Date().toISOString(),
    };

    setActiveNote(updatedNote);
    setNotes(prev => prev.map(note => note.id === activeNote.id ? updatedNote : note));
  };

  const saveNote = () => {
    if (!activeNote) return;
    
    localStorage.setItem(`focuscore-${userId}-notes`, JSON.stringify(notes));
    
    toast({
      title: "Nota salva",
      description: "Suas alterações foram salvas com sucesso!",
    });
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    
    if (activeNote && activeNote.id === noteId) {
      setActiveNote(null);
    }
    
    toast({
      title: "Nota excluída",
      description: "A nota foi excluída permanentemente.",
    });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 bg-background" dir="ltr" style={{ direction: 'ltr' }}>
      <div className="max-w-7xl mx-auto" dir="ltr" style={{ direction: 'ltr' }}>
        <h1 className="text-3xl font-bold mb-8 text-foreground" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
          Bloco de Notas
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" dir="ltr" style={{ direction: 'ltr' }}>
          {/* Sidebar with Notes List */}
          <div className="lg:col-span-1 space-y-4" dir="ltr" style={{ direction: 'ltr' }}>
            <Card dir="ltr" style={{ direction: 'ltr' }}>
              <CardHeader className="pb-3" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                <CardTitle dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>Suas Notas</CardTitle>
                <CardDescription dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                  Crie, gerencie e organize suas notas
                </CardDescription>
                
                <div className="relative mt-2" dir="ltr" style={{ direction: 'ltr' }}>
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar notas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                    dir="ltr"
                    style={{ direction: 'ltr', textAlign: 'left' }}
                  />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4" dir="ltr" style={{ direction: 'ltr' }}>
                <div className="flex items-end gap-2" dir="ltr" style={{ direction: 'ltr' }}>
                  <div className="flex-1" dir="ltr" style={{ direction: 'ltr' }}>
                    <Label htmlFor="new-note" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>Nova Nota</Label>
                    <Input
                      id="new-note"
                      placeholder="Digite o título da nota..."
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && createNewNote()}
                      dir="ltr"
                      style={{ direction: 'ltr', textAlign: 'left' }}
                    />
                  </div>
                  <Button onClick={createNewNote} dir="ltr" style={{ direction: 'ltr' }}>
                    <Plus className="h-4 w-4 mr-1" />
                    Criar
                  </Button>
                </div>
                
                <Separator />
                
                {filteredNotes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground" dir="ltr" style={{ direction: 'ltr' }}>
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                    <p dir="ltr" style={{ direction: 'ltr' }}>
                      {searchTerm ? 'Nenhuma nota encontrada' : 'Nenhuma nota criada'}
                    </p>
                    {searchTerm && (
                      <Button
                        variant="ghost" 
                        onClick={() => setSearchTerm('')}
                        className="mt-2"
                      >
                        Limpar busca
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[calc(100vh-380px)] overflow-y-auto pr-2" dir="ltr" style={{ direction: 'ltr' }}>
                    {filteredNotes.map(note => (
                      <div
                        key={note.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          activeNote?.id === note.id
                            ? 'bg-primary/10 border-primary/30'
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => setActiveNote(note)}
                        dir="ltr"
                        style={{ direction: 'ltr' }}
                      >
                        <div className="flex justify-between items-start" dir="ltr" style={{ direction: 'ltr' }}>
                          <div dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                            <h3 className="font-medium line-clamp-1" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>{note.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                              {format(new Date(note.updatedAt), 'dd/MM/yyyy HH:mm')}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                          {note.content.replace(/<[^>]*>?/gm, '')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Note Editor */}
          <div className="lg:col-span-2" dir="ltr" style={{ direction: 'ltr' }}>
            <Card className="h-full" dir="ltr" style={{ direction: 'ltr' }}>
              {!activeNote ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center text-muted-foreground" dir="ltr" style={{ direction: 'ltr' }}>
                  <FileText className="h-16 w-16 mb-4 text-muted-foreground/50" />
                  <h3 className="text-xl font-medium mb-2" dir="ltr" style={{ direction: 'ltr' }}>Nenhuma nota selecionada</h3>
                  <p className="max-w-md" dir="ltr" style={{ direction: 'ltr' }}>
                    Selecione uma nota existente para editar ou crie uma nova nota.
                  </p>
                </div>
              ) : (
                <>
                  <CardHeader className="pb-3" dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                    <div className="flex justify-between items-center" dir="ltr" style={{ direction: 'ltr' }}>
                      <CardTitle dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>{activeNote.title}</CardTitle>
                      <div className="flex space-x-2" dir="ltr" style={{ direction: 'ltr' }}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={saveNote}
                          dir="ltr" 
                          style={{ direction: 'ltr' }}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Salvar
                        </Button>
                      </div>
                    </div>
                    <CardDescription dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
                      Última atualização: {format(new Date(activeNote.updatedAt), 'dd/MM/yyyy HH:mm')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent dir="ltr" style={{ direction: 'ltr' }}>
                    <NoteEditor 
                      initialContent={activeNote.content} 
                      onChange={updateNote} 
                    />
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
