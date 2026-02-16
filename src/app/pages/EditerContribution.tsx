import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FormulaireSavoir, SavoirData } from '../components/FormulaireSavoir';
import { ZoneMultimedia } from '../components/ZoneMultimedia';
import { ModuleGeolocalisation } from '../components/ModuleGeolocalisation';
import { Navigation } from '../components/Navigation';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { Button } from '../components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { storageUtils, MediaFile } from '../utils/localStorage';

export default function EditerContribution() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contribution, setContribution] = useState(() => 
    id ? storageUtils.getContribution(id) : null
  );

  const [savoirData, setSavoirData] = useState<SavoirData>({
    nomLocal: contribution?.nomLocal || '',
    nomScientifique: contribution?.nomScientifique || '',
    pathologies: contribution?.pathologies || [],
    modesPreparation: contribution?.modesPreparation || '',
    dosages: contribution?.dosages || '',
    contraindications: contribution?.contraindications || '',
    autreInfos: contribution?.autreInfos || '',
  });

  const [media, setMedia] = useState<MediaFile[]>(contribution?.media || []);
  const [geolocalisation, setGeolocalisation] = useState(
    contribution?.geolocalisation || {
      latitude: 12.3714,
      longitude: -1.5197,
    }
  );

  useEffect(() => {
    if (!contribution) {
      toast.error('Contribution introuvable');
      navigate('/herbier');
    }
  }, [contribution, navigate]);

  const handleMediaAdd = (newMedia: MediaFile) => {
    setMedia([...media, newMedia]);
    toast.success('Fichier ajouté avec succès');
  };

  const handleMediaRemove = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
    toast.info('Fichier supprimé');
  };

  const handleSave = () => {
    if (!id) return;

    // Validation
    if (!savoirData.nomLocal || savoirData.pathologies.length === 0 || 
        !savoirData.modesPreparation || !savoirData.dosages) {
      toast.error('Champs requis manquants', {
        description: 'Veuillez remplir tous les champs obligatoires (*)',
      });
      return;
    }

    try {
      storageUtils.updateContribution(id, {
        ...savoirData,
        media,
        geolocalisation,
      });

      toast.success('Modifications enregistrées !');

      setTimeout(() => {
        navigate('/herbier');
      }, 1500);
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  if (!contribution) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f5] via-white to-[#f9f7f5] pb-24">
      <Toaster position="top-center" richColors />
      
      {/* Header */}
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
              <h1 className="text-xl">Éditer la Contribution</h1>
              <p className="text-sm text-white/90">{contribution.nomLocal}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <FormulaireSavoir data={savoirData} onChange={setSavoirData} />

        <ModuleGeolocalisation
          geolocalisation={geolocalisation}
          onChange={setGeolocalisation}
        />

        <ZoneMultimedia
          onMediaAdd={handleMediaAdd}
          media={media}
          onMediaRemove={handleMediaRemove}
        />

        {/* Action Buttons */}
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
            Enregistrer les modifications
          </Button>
        </div>
      </main>

      <Navigation />
      <OfflineIndicator />
    </div>
  );
}