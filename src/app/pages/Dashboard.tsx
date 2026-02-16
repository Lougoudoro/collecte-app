import { useState } from 'react';
import { Link } from 'react-router';
import { storageUtils } from '../utils/localStorage';
import { Navigation } from '../components/Navigation';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { BarreProgression } from '../components/BarreProgression';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Leaf, MapPin, Edit, Trash2, Plus, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { toast } from 'sonner';

export default function Dashboard() {
  const [user, setUser] = useState(() => storageUtils.getUser());
  const [contributions, setContributions] = useState(() => storageUtils.getContributions());

  const handleDelete = (id: string) => {
    storageUtils.deleteContribution(id);
    setContributions(storageUtils.getContributions());
    toast.success('Contribution supprimée');
  };

  const stats = {
    total: contributions.length,
    enCours: contributions.filter(c => c.validationStatus === 'en-cours').length,
    valideCommunaute: contributions.filter(c => c.validationStatus === 'valide-communaute').length,
    valideScientifique: contributions.filter(c => c.validationStatus === 'valide-scientifique').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f5] via-white to-[#f9f7f5] pb-24">
      {/* Header with high contrast */}
      <header className="bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">Mon Herbier</h1>
                <p className="text-sm text-white/90">{user?.nom || 'Contributeur'}</p>
              </div>
            </div>
            <Link to="/nouveau">
              <Button className="bg-white text-[#87a878] hover:bg-white/90 h-11 px-6 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Nouveau
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Statistics Cards - High Contrast */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-[#87a878]/30">
            <p className="text-3xl text-[#87a878] mb-1">{stats.total}</p>
            <p className="text-sm text-[#5a5245]">Total</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-[#d4a574]/30">
            <p className="text-3xl text-[#d4a574] mb-1">{stats.enCours}</p>
            <p className="text-sm text-[#5a5245]">En cours</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-[#87a878]/30">
            <p className="text-3xl text-[#87a878] mb-1">{stats.valideCommunaute}</p>
            <p className="text-sm text-[#5a5245]">Validés</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-[#c1664f]/30">
            <p className="text-3xl text-[#c1664f] mb-1">{stats.valideScientifique}</p>
            <p className="text-sm text-[#5a5245]">Certifiés</p>
          </div>
        </div>

        {/* Contributions List */}
        {contributions.length === 0 ? (
          <div className="bg-white rounded-xl p-8 md:p-12 text-center shadow-sm border-2 border-[#87a878]/20">
            <div className="w-20 h-20 rounded-full bg-[#87a878]/10 flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-[#87a878]" />
            </div>
            <h3 className="text-[#5a5245] mb-2">Aucune contribution</h3>
            <p className="text-[#717182] mb-6">
              Commencez à documenter les plantes médicinales de votre région
            </p>
            <Link to="/nouveau">
              <Button className="bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white h-12 px-8 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Créer ma première contribution
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <div
                key={contribution.id}
                className="bg-white rounded-xl p-5 shadow-md border-2 border-[#87a878]/20 hover:border-[#87a878]/40 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#87a878]/10 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-6 h-6 text-[#87a878]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#5a5245] mb-1 truncate">{contribution.nomLocal}</h3>
                      {contribution.nomScientifique && (
                        <p className="text-sm text-[#717182] italic truncate">
                          {contribution.nomScientifique}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {contribution.pathologies.slice(0, 3).map((pathologie, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 bg-[#87a878]/10 text-[#5a5245] rounded-md text-xs"
                          >
                            {pathologie}
                          </span>
                        ))}
                        {contribution.pathologies.length > 3 && (
                          <span className="text-xs text-[#717182] self-center">
                            +{contribution.pathologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-shrink-0">
                    <Link to={`/editer/${contribution.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#87a878] text-[#87a878] hover:bg-[#87a878]/5"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#d4183d] text-[#d4183d] hover:bg-[#d4183d]/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer cette contribution ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irréversible. Toutes les données associées seront perdues.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(contribution.id)}
                            className="bg-[#d4183d] hover:bg-[#d4183d]/90"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {/* Geolocation */}
                {contribution.geolocalisation && (
                  <div className="flex items-center gap-2 mb-3 text-sm text-[#5a5245] bg-[#f9f7f5] p-2 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#d4a574] flex-shrink-0" />
                    <span className="truncate">
                      {contribution.geolocalisation.village && `${contribution.geolocalisation.village}, `}
                      {contribution.geolocalisation.commune || 
                        `${contribution.geolocalisation.latitude.toFixed(4)}°, ${contribution.geolocalisation.longitude.toFixed(4)}°`}
                    </span>
                  </div>
                )}

                {/* Progress */}
                <div className="mt-4">
                  <BarreProgression status={contribution.validationStatus} />
                </div>

                {/* Date */}
                <p className="text-xs text-[#717182] mt-3">
                  Modifié le {format(new Date(contribution.dateModification), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Navigation />
      <OfflineIndicator />
    </div>
  );
}