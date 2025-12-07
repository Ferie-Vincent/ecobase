import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, FileEdit, Trash2, Save, FileText, BookOpen } from "lucide-react";
import { documentsData, rapportsData, type Document } from "@/data/documentsData";

export default function PageDocuments() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Convertir les données existantes en format éditable
  const [documents, setDocuments] = useState<Document[]>([...documentsData]);
  const [rapports, setRapports] = useState<Document[]>([...rapportsData]);
  
  // État pour l'édition
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newDocCategory, setNewDocCategory] = useState<'document' | 'rapport'>('document');

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.acronym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRapports = rapports.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.acronym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    toast({
      title: "Modifications enregistrées",
      description: "Les documents ont été mis à jour avec succès.",
    });
  };

  const addDocument = (category: 'document' | 'rapport') => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: "Nouveau document",
      acronym: "NOUVEAU",
      description: "Description du document...",
      yearStart: new Date().getFullYear(),
      yearEnd: new Date().getFullYear(),
      category: category,
      fileSize: "",
      fileType: "PDF"
    };
    
    if (category === 'document') {
      setDocuments([...documents, newDoc]);
    } else {
      setRapports([...rapports, newDoc]);
    }
    setEditingDoc(newDoc);
  };

  const removeDocument = (id: string, category: 'document' | 'rapport') => {
    if (category === 'document') {
      setDocuments(documents.filter(doc => doc.id !== id));
    } else {
      setRapports(rapports.filter(doc => doc.id !== id));
    }
    toast({
      title: "Document supprimé",
      description: "Le document a été supprimé avec succès.",
    });
  };

  const updateDocument = (id: string, field: keyof Document, value: any, category: 'document' | 'rapport') => {
    if (category === 'document') {
      setDocuments(documents.map(doc => 
        doc.id === id ? { ...doc, [field]: value } : doc
      ));
    } else {
      setRapports(rapports.map(doc => 
        doc.id === id ? { ...doc, [field]: value } : doc
      ));
    }
  };

  const renderDocumentTable = (docs: Document[], category: 'document' | 'rapport') => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Acronyme</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Période</TableHead>
          <TableHead>Taille</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {docs.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>
              <Input
                value={doc.acronym}
                onChange={(e) => updateDocument(doc.id, "acronym", e.target.value, category)}
                className="w-32"
              />
            </TableCell>
            <TableCell>
              <Input
                value={doc.title}
                onChange={(e) => updateDocument(doc.id, "title", e.target.value, category)}
              />
            </TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={doc.yearStart}
                  onChange={(e) => updateDocument(doc.id, "yearStart", parseInt(e.target.value), category)}
                  className="w-20"
                />
                <span>-</span>
                <Input
                  type="number"
                  value={doc.yearEnd}
                  onChange={(e) => updateDocument(doc.id, "yearEnd", parseInt(e.target.value), category)}
                  className="w-20"
                />
              </div>
            </TableCell>
            <TableCell>
              <Input
                value={doc.fileSize || ""}
                onChange={(e) => updateDocument(doc.id, "fileSize", e.target.value, category)}
                placeholder="ex: 5.2 MB"
                className="w-24"
              />
            </TableCell>
            <TableCell>
              <Select
                value={doc.fileType || "PDF"}
                onValueChange={(value) => updateDocument(doc.id, "fileType", value, category)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="DOC">DOC</SelectItem>
                  <SelectItem value="XLS">XLS</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setEditingDoc(doc)}
                >
                  <FileEdit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeDocument(doc.id, category)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion - Documents & Rapports</h1>
          <p className="text-muted-foreground">Gérez la bibliothèque de documents stratégiques et rapports</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>

      {/* Barre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents Stratégiques
          </TabsTrigger>
          <TabsTrigger value="rapports" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Rapports d'Activités
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents Stratégiques</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Plans et cadres stratégiques de référence
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{filteredDocuments.length} documents</Badge>
                <Button onClick={() => addDocument('document')} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {renderDocumentTable(filteredDocuments, 'document')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rapports" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Rapports d'Activités</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Bilans et évaluations des performances
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{filteredRapports.length} rapports</Badge>
                <Button onClick={() => addDocument('rapport')} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {renderDocumentTable(filteredRapports, 'rapport')}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal d'édition de description */}
      {editingDoc && (
        <Card className="fixed bottom-4 right-4 w-[500px] shadow-lg border-2 z-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Éditer la description</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setEditingDoc(null)}>
              ✕
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Document: {editingDoc.acronym}</Label>
            </div>
            <div>
              <Label htmlFor="description">Description détaillée</Label>
              <Textarea
                id="description"
                rows={6}
                value={editingDoc.description}
                onChange={(e) => {
                  const category = editingDoc.category;
                  updateDocument(editingDoc.id, "description", e.target.value, category);
                  setEditingDoc({ ...editingDoc, description: e.target.value });
                }}
                placeholder="Description du document..."
              />
            </div>
            <div>
              <Label htmlFor="fileUrl">URL du fichier</Label>
              <Input
                id="fileUrl"
                value={editingDoc.fileUrl || ""}
                onChange={(e) => {
                  const category = editingDoc.category;
                  updateDocument(editingDoc.id, "fileUrl", e.target.value, category);
                  setEditingDoc({ ...editingDoc, fileUrl: e.target.value });
                }}
                placeholder="/documents/fichier.pdf"
              />
            </div>
            <Button onClick={() => setEditingDoc(null)} className="w-full">
              Fermer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
