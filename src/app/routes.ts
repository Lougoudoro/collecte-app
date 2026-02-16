import { createBrowserRouter } from 'react-router';
import Accueil from './pages/Accueil';
import Dashboard from './pages/Dashboard';
import NouvelleContribution from './pages/NouvelleContribution';
import EditerContribution from './pages/EditerContribution';
import Profil from './pages/Profil';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Accueil,
  },
  {
    path: '/herbier',
    Component: Dashboard,
  },
  {
    path: '/nouveau',
    Component: NouvelleContribution,
  },
  {
    path: '/editer/:id',
    Component: EditerContribution,
  },
  {
    path: '/profil',
    Component: Profil,
  },
]);
