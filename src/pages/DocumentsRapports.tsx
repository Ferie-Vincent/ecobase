import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileText, Calendar, Info } from "lucide-react";
import { Footer } from "@/components/Footer";
import { documentsData, rapportsData, type Document } from "@/data/documentsData";

const DocumentsRapports = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDocumentClick = (doc: Document) => {
    setSelectedDocument(doc);
    setIsModalOpen(true);
  };

  const handleDownload = (doc: Document) => {
    // Simulate download - in production, this would trigger actual file download
    console.log(`Téléchargement du document: ${doc.title}`);
  };

  const renderDocumentCard = (doc: Document) => (
    <Card 
      key={doc.id} 
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-card/60 backdrop-blur-sm border-border/50"
      onClick={() => handleDocumentClick(doc)}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {doc.acronym}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-1">
                {doc.title}
              </CardDescription>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(doc);
            }}
            className="shrink-0"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {doc.yearStart === doc.yearEnd 
              ? doc.yearStart 
              : `${doc.yearStart} - ${doc.yearEnd}`
            }
          </span>
          {doc.fileSize && (
            <>
              <span className="mx-2">•</span>
              <span>{doc.fileSize}</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Documents & Rapports</h1>
          <p className="text-lg text-white/90">
            Accédez aux documents stratégiques et rapports d'activités du ministère
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Section Documents */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Documents Stratégiques</h2>
              <p className="text-sm text-muted-foreground">
                Plans et cadres stratégiques de référence
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentsData.map(renderDocumentCard)}
          </div>
        </section>

        {/* Section Rapports */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-secondary/10">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Rapports d'Activités</h2>
              <p className="text-sm text-muted-foreground">
                Bilans et évaluations des performances
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rapportsData.map(renderDocumentCard)}
          </div>
        </section>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-accent" />
              <CardTitle className="text-lg">Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ces documents sont régulièrement mis à jour pour refléter les dernières orientations 
              stratégiques et les résultats d'activités du Ministère de l'Intégration Africaine et 
              des Ivoiriens de l'Extérieur. Pour toute question ou demande de document spécifique, 
              veuillez contacter le service de documentation.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modal de détails du document */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedDocument && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">
                      {selectedDocument.acronym}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedDocument.title}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selectedDocument.yearStart === selectedDocument.yearEnd 
                      ? `Année ${selectedDocument.yearStart}` 
                      : `Période: ${selectedDocument.yearStart} - ${selectedDocument.yearEnd}`
                    }
                  </Badge>
                  {selectedDocument.fileSize && (
                    <Badge variant="outline">
                      Taille: {selectedDocument.fileSize}
                    </Badge>
                  )}
                  {selectedDocument.fileType && (
                    <Badge variant="outline">
                      Format: {selectedDocument.fileType}
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Résumé du contenu</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {selectedDocument.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => handleDownload(selectedDocument)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le document
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default DocumentsRapports;
