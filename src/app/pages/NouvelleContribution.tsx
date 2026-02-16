import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FormulaireSavoir, SavoirData } from '../components/FormulaireSavoir';
import { ZoneMultimedia } from '../components/ZoneMultimedia';
import { ModuleGeolocalisation } from '../components/ModuleGeolocalisation';
import { Navigation } from '../components/Navigation';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { Button } from '../components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { storageUtils, MediaFile } from '../utils/localStorage';

export default function NouvelleContribution() {
  const navigate = useNavigate();
  const [savoirData, setSavoirData] = useState<SavoirData>({
    nomLocal: '',
    nomScientifique: '',
    pathologies: [],
    modesPreparation: '',
    dosages: '',
    contraindications: '',
    autreInfos: '',
  });

  const [media, setMedia] = useState<MediaFile[]>([]);
  const [geolocalisation, setGeolocalisation] = useState({
    latitude: 12.3714,
    longitude: -1.5197,
  });

  const handleMediaAdd = (newMedia: MediaFile) => {
    setMedia([...media, newMedia]);
    toast.success('Fichier ajouté avec succès', {
      description: `${newMedia.type === 'photo' ? 'Photo' : newMedia.type === 'audio' ? 'Enregistrement audio' : 'Vidéo'} ajouté(e)`,
    });
  };

  const handleMediaRemove = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
    toast.info('Fichier supprimé');
  };

  const handleSave = () => {
    // Validation
    if (!savoirData.nomLocal || savoirData.pathologies.length === 0 || 
        !savoirData.modesPreparation || !savoirData.dosages) {
      toast.error('Champs requis manquants', {
        description: 'Veuillez remplir tous les champs obligatoires (*)',
      });
      return;
    }

    try {
      storageUtils.addContribution({
        ...savoirData,
        media,
        geolocalisation,
        validationStatus: 'en-cours',
      });

      toast.success('Savoir enregistré avec succès !', {
        description: 'Votre contribution est en attente de validation',
      });

      setTimeout(() => {
        navigate('/herbier');
      }, 1500);
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement', {
        description: 'Veuillez réessayer',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f5] via-white to-[#f9f7f5] pb-24">
      <Toaster position="top-center" richColors />
      
      {/* Header with high contrast */}
      <header className="bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl">Nouvelle Contribution</h1>
              <p className="text-sm text-white/90">Documenter un savoir thérapeutique</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Info Banner - High Contrast */}
        <div className="bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white rounded-xl p-4 md:p-5 shadow-lg">
          <p className="text-sm md:text-base leading-relaxed">
            <strong>💡 Conseil :</strong> Prenez votre temps pour documenter précisément le savoir. 
            Ajoutez des photos, enregistrez les témoignages oraux et localisez la plante pour enrichir la base de données.
          </p>
        </div>

        {/* Form */}
        <FormulaireSavoir data={savoirData} onChange={setSavoirData} />

        {/* Geolocation Module */}
        <ModuleGeolocalisation
          geolocalisation={geolocalisation}
          onChange={setGeolocalisation}
        />

        {/* Multimedia Zone */}
        <ZoneMultimedia
          onMediaAdd={handleMediaAdd}
          media={media}
          onMediaRemove={handleMediaRemove}
        />

        {/* Action Buttons - High Contrast */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-20 bg-gradient-to-t from-white via-white to-transparent pb-4">
          <Button
            variant="outline"
            className="border-2 border-[#87a878] text-[#87a878] hover:bg-[#87a878]/5 h-14 px-8 text-base"
            onClick={() => {
              if (confirm('Abandonner les modifications ?')) {
                navigate('/herbier');
              }
            }}
          >
            Annuler
          </Button>
          <Button
            className="bg-gradient-to-r from-[#87a878] to-[#c1664f] hover:from-[#87a878]/90 hover:to-[#c1664f]/90 text-white h-14 px-8 text-base shadow-xl flex-1"
            onClick={handleSave}
          >
            <Save className="w-5 h-5 mr-2" />
            Enregistrer le savoir
          </Button>
        </div>
      </main>

      <Navigation />
      <OfflineIndicator />
    </div>
  );
}