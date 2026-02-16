import { Link } from 'react-router';
import { Navigation } from '../components/Navigation';
import { OfflineIndicator } from '../components/OfflineIndicator';
import { Sparkles, Leaf, MapPin, Mic, Users, Shield, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Accueil() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f5] via-white to-[#f9f7f5] pb-24">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl mb-1">Savoirs Thérapeutiques</h1>
              <p className="text-base md:text-lg text-white/90">Burkina Faso</p>
            </div>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-white/95 max-w-2xl">
            Plateforme collaborative de préservation et valorisation des connaissances endogènes 
            de médecine traditionnelle
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Mission Banner */}
        <div className="bg-white rounded-xl p-5 md:p-6 shadow-md border-2 border-[#87a878]/20">
          <h2 className="text-[#5a5245] mb-3">🌿 Notre Mission</h2>
          <p className="text-[#5a5245] leading-relaxed mb-4">
            Préserver la mémoire intergénérationnelle des savoirs thérapeutiques traditionnels 
            en documentant les plantes médicinales, leurs usages et les témoignages des tradipraticiens.
          </p>
          <Link to="/nouveau">
            <Button className="w-full bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white h-14 text-base shadow-lg">
              <Leaf className="w-5 h-5 mr-2" />
              Contribuer maintenant
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-md border-2 border-[#87a878]/20">
            <div className="w-12 h-12 rounded-full bg-[#87a878]/10 flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6 text-[#87a878]" />
            </div>
            <h3 className="text-[#5a5245] mb-2">Documentation complète</h3>
            <p className="text-sm text-[#717182] leading-relaxed">
              Enregistrez les noms locaux et scientifiques, pathologies traitées, 
              modes de préparation et dosages précis.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border-2 border-[#c1664f]/20">
            <div className="w-12 h-12 rounded-full bg-[#c1664f]/10 flex items-center justify-center mb-3">
              <Mic className="w-6 h-6 text-[#c1664f]" />
            </div>
            <h3 className="text-[#5a5245] mb-2">Récits oraux</h3>
            <p className="text-sm text-[#717182] leading-relaxed">
              Capturez les témoignages audio des tradipraticiens pour préserver 
              la transmission orale des savoirs.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border-2 border-[#d4a574]/20">
            <div className="w-12 h-12 rounded-full bg-[#d4a574]/10 flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-[#d4a574]" />
            </div>
            <h3 className="text-[#5a5245] mb-2">Géolocalisation précise</h3>
            <p className="text-sm text-[#717182] leading-relaxed">
              Localisez les plantes médicinales avec GPS et informations géographiques 
              détaillées (village, commune, zone).
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border-2 border-[#87a878]/20">
            <div className="w-12 h-12 rounded-full bg-[#87a878]/10 flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-[#87a878]" />
            </div>
            <h3 className="text-[#5a5245] mb-2">Validation collective</h3>
            <p className="text-sm text-[#717182] leading-relaxed">
              Système de validation communautaire puis scientifique pour garantir 
              la fiabilité des savoirs partagés.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-xl p-5 md:p-6 shadow-md border-2 border-[#87a878]/20">
          <h2 className="text-[#5a5245] mb-5">📋 Comment contribuer ?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#87a878] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                1
              </div>
              <div>
                <h4 className="text-[#5a5245] mb-1">Remplissez le formulaire</h4>
                <p className="text-sm text-[#717182]">
                  Documentez la plante médicinale avec ses noms, pathologies traitées, 
                  modes de préparation et dosages.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#c1664f] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                2
              </div>
              <div>
                <h4 className="text-[#5a5245] mb-1">Ajoutez du contenu multimédia</h4>
                <p className="text-sm text-[#717182]">
                  Photographiez la plante, enregistrez les récits oraux et filmez 
                  les gestes de préparation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#d4a574] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                3
              </div>
              <div>
                <h4 className="text-[#5a5245] mb-1">Localisez la plante</h4>
                <p className="text-sm text-[#717182]">
                  Utilisez le GPS ou indiquez manuellement la zone géographique 
                  où se trouve la plante.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#87a878] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                4
              </div>
              <div>
                <h4 className="text-[#5a5245] mb-1">Validation communautaire</h4>
                <p className="text-sm text-[#717182]">
                  Votre savoir sera validé par la communauté puis par des experts 
                  pour garantir sa fiabilité.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-[#87a878]/10 to-[#d4a574]/10 rounded-xl p-5 border border-[#87a878]/20">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-[#87a878] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-[#5a5245] mb-2">Science Citoyenne</h3>
              <p className="text-sm text-[#5a5245] leading-relaxed">
                Cette plateforme est conçue pour faciliter l'usage par tous, quel que soit 
                le niveau de maîtrise du numérique. Interface optimisée pour mobile avec 
                fort contraste pour lecture en extérieur. Données stockées localement pour 
                fonctionnement en zone rurale.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to="/herbier" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-2 border-[#87a878] text-[#87a878] hover:bg-[#87a878]/5 h-14 text-base"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Mon Herbier
            </Button>
          </Link>
          <Link to="/nouveau" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-[#87a878] to-[#c1664f] text-white h-14 text-base shadow-lg">
              <Leaf className="w-5 h-5 mr-2" />
              Nouvelle Contribution
            </Button>
          </Link>
        </div>
      </main>

      <Navigation />
      <OfflineIndicator />
    </div>
  );
}