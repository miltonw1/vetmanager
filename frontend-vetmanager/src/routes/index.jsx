import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom'


import LoginPage from '../pages/LoginPage'
import ClientPage from '../pages/clients/ClientPage'
import CreateClientPage from '../pages/clients/CreateClientPage'
import EditClientPage from '../pages/clients/EditClientPage'
import ClientsListPage from '../pages/clients/ClientsListPage'
import PetPage  from '../pages/pets/PetPage'
import PetsListPage from '../pages/pets/PetsListPage'
import PetHistoriesPage from '../pages/pet-history/PetHistoriesPage'
import SpeciesListPage from '../pages/species/SpeciesListPage'
import CreateSpeciesPage from '../pages/species/CreateSpeciesPage'
import RacesListPage from '../pages/races/RacesListPage'
import CreateRacePage from '../pages/races/CreateRacePage'
import { ProtectedRoute } from './ProtectedRoute';
import HomePage from '../pages/home/HomePage'
import ProfilePage from '../pages/users/ProfilePage'

const router = createBrowserRouter([
  {
    path: '',
    loader: () => redirect('/login'),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    )
  },
  {
    path: '/clients',
    element: (
      <ProtectedRoute>
        <ClientsListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clients/create',
    element: (
      <ProtectedRoute>
        <CreateClientPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clients/:id',
    element: (
      <ProtectedRoute>
        <ClientPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/clients/:id/edit',
    element: (
      <ProtectedRoute>
        <EditClientPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pets',
    element: (
      <ProtectedRoute>
        <PetsListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pets/:id',
    element: (
      <ProtectedRoute>
        <PetPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pets/:id/histories',
    element: (
      <ProtectedRoute>
        <PetHistoriesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/species',
    element: (
      <ProtectedRoute>
        <SpeciesListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/species/create',
    element: (
      <ProtectedRoute>
        <CreateSpeciesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/races',
    element: (
      <ProtectedRoute>
        <RacesListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/races/create',
    element: (
      <ProtectedRoute>
        <CreateRacePage />
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}