# Savoirs Thérapeutiques du Burkina Faso

Plateforme collaborative mobile-first dédiée à la valorisation et préservation des savoirs endogènes de médecine traditionnelle au Burkina Faso.

## 🌿 Fonctionnalités principales

### Espace Personnel - Mon Herbier
- Tableau de bord utilisateur avec statistiques des contributions
- Gestion multi-fiches de connaissances
- Suivi de l'évolution des validations
- Possibilité d'éditer et supprimer ses contributions

### Formulaire de Collecte Structuré
- Noms local et scientifique de la plante
- Pathologies traitées (multi-saisie)
- Modes de préparation détaillés
- Dosages et posologie
- Contraindications
- Autres informations pertinentes

### Module Multimédia Interactif
- **Photos** : Upload d'images de plantes médicinales (JPG, PNG)
- **Audio** : Enregistrement intégré pour capturer les récits oraux des tradipraticiens
- **Vidéo** : Upload de vidéos pour documenter les gestes de préparation

### Géolocalisation Précise
- Utilisation du GPS pour coordonnées exactes
- Carte interactive pour visualiser et sélectionner l'emplacement
- Saisie manuelle de la zone géographique (village, forêt, commune)

### Système de Validation Progressive
- **En cours** : Savoir nouvellement soumis
- **Validé communauté** : Légitimité traditionnelle confirmée
- **Validé scientifiquement** : Validation par des experts

## 🎨 Design

### Palette de couleurs inspirée de la nature
- **Vert sauge** (#87a878) : Couleur primaire, représente la nature et la médecine
- **Terre cuite** (#c1664f) : Accent, évoque les traditions africaines
- **Ocre** (#d4a574) : Secondaire, chaleureux et naturel
- **Terre claire** (#f9f7f5) : Fond doux pour réduire la fatigue visuelle

### Optimisations pour le terrain
- **Mobile-first** : Interface optimisée pour smartphones
- **Fort contraste** : Lecture facilitée en extérieur sous le soleil
- **Grandes zones tactiles** : Boutons larges et icônes explicites
- **Navigation simplifiée** : Barre de navigation fixe en bas d'écran
- **Mode local** : Données stockées localement (localStorage) pour fonctionnement hors-ligne

## 🔧 Technologies utilisées

- **React** avec TypeScript
- **React Router** pour la navigation multi-pages
- **Tailwind CSS v4** pour le design responsive
- **Leaflet** + **React-Leaflet** pour la cartographie
- **Lucide React** pour les icônes
- **Sonner** pour les notifications toast
- **date-fns** pour la gestion des dates
- **localStorage API** pour la persistance des données

## 📱 Pages de l'application

1. **Accueil** (`/`) - Page d'introduction avec mission et guide
2. **Mon Herbier** (`/herbier`) - Dashboard des contributions de l'utilisateur
3. **Nouvelle Contribution** (`/nouveau`) - Formulaire de création
4. **Éditer Contribution** (`/editer/:id`) - Modification d'une contribution existante
5. **Profil** (`/profil`) - Gestion du compte utilisateur

## 🚀 Science Citoyenne

Cette plateforme est conçue pour être accessible à tous, quel que soit le niveau de maîtrise du numérique :
- Interface intuitive avec icônes explicites
- Ergonomie adaptée aux conditions rurales
- Support de la tradition orale via enregistrements audio
- Préservation de la mémoire intergénérationnelle

## 💾 Stockage des données

Actuellement, l'application utilise le **localStorage** du navigateur pour stocker les données localement :
- ✅ Fonctionnement hors-ligne
- ✅ Pas de dépendance à un serveur
- ⚠️ Données limitées à un seul appareil
- ⚠️ Pas de synchronisation multi-appareils

Pour une utilisation collaborative réelle avec partage communautaire, synchronisation et validation collective, une base de données backend (comme Supabase) serait recommandée.

## 🎯 Objectifs

1. **Préserver** les savoirs thérapeutiques traditionnels
2. **Documenter** les plantes médicinales et leurs usages
3. **Transmettre** les connaissances aux générations futures
4. **Valider** collectivement les savoirs partagés
5. **Localiser** géographiquement les ressources naturelles

---

**Note** : Cette application est un outil de documentation et de partage de connaissances. Elle ne remplace pas une consultation médicale professionnelle.
