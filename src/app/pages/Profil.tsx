import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, LogOut, Trash2 } from 'lucide-react';
import { storageUtils } from '../utils/localStorage';
import { toast, Toaster } from 'sonner';
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

export default function Profil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => storageUtils.getUser());
  const [nom, setNom] = useState(user?.nom || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (!user) {
      // Initialize a default user if none exists
      const newUser = storageUtils.initUser('Contributeur', 'contributeur@savoirs-bf.local');
      setUser(newUser);
      setNom(newUser.nom);
      setEmail(newUser.email);
    }
  }, [user]);

  const handleSave = () => {
    if (!nom.trim()) {
      toast.error('Le nom ne peut pas être vide');
      return;
    }

    if (user) {
      storageUtils.saveUser({
        ...user,
        nom: nom.trim(),
        email: email.trim(),
      });
      setUser(storageUtils.getUser());
      toast.success('Profil mis à jour');
    }
  };

  const handleClearData = () => {
    storageUtils.clearAll();
    toast.success('Toutes les données ont été supprimées');
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const contributions = storageUtils.getContributions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f5] via-white to-[#f9f7f5] pb-24">
      <Toaster position="top-center" richColors />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl">Mon Profil</h1>
              <p className="text-sm text-white/90">Gérez vos informations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#87a878]/20">
          <h3 className="text-[#5a5245] mb-4">Vos contributions</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl text-[#87a878] mb-1">{contributions.length}</p>
              <p className="text-sm text-[#5a5245]">Total</p>
            </div>
            <div>
              <p className="text-3xl text-[#c1664f] mb-1">
                {contributions.filter(c => c.validationStatus === 'valide-communaute').length}
              </p>
              <p className="text-sm text-[#5a5245]">Validées</p>
            </div>
            <div>
              <p className="text-3xl text-[#d4a574] mb-1">
                {contributions.filter(c => c.validationStatus === 'valide-scientifique').length}
              </p>
              <p className="text-sm text-[#5a5245]">Certifiées</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#87a878]/20">
          <h3 className="text-[#5a5245] mb-5">Informations personnelles</h3>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-[#5a5245]">
                Nom complet
              </Label>
              <Input
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Votre nom"
                className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5a5245]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] h-12 text-base"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white h-12 shadow-lg"
            >
              Enregistrer les modifications
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-[#d4a574]/10 to-[#87a878]/10 rounded-xl p-5 border border-[#87a878]/20">
          <p className="text-sm text-[#5a5245] leading-relaxed">
            <strong>📱 Mode local :</strong> Vos données sont stockées localement sur cet appareil. 
            Pour une synchronisation multi-appareils et un partage communautaire, une connexion à une base de données serait nécessaire.
          </p>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#d4183d]/20">
          <h3 className="text-[#d4183d] mb-4">Zone de danger</h3>
          <p className="text-sm text-[#5a5245] mb-4">
            Cette action supprimera toutes vos contributions et données de profil. Cette opération est irréversible.
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-2 border-[#d4183d] text-[#d4183d] hover:bg-[#d4183d]/5 h-12 px-6"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Supprimer toutes mes données
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer toutes les données ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Toutes vos contributions ({contributions.length}) et 
                  informations de profil seront définitivement supprimées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearData}
                  className="bg-[#d4183d] hover:bg-[#d4183d]/90"
                >
                  Supprimer tout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>

      <Navigation />
      <OfflineIndicator />
    </div>
  );
}