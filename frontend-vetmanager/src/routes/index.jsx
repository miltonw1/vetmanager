import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom'

import AppPage from '../pages/AppPage'
import RootPage from '../pages/RootPage'
import LoginPage from '../pages/LoginPage'
import ClientPage from '../pages/clients/ClientPage'
import CreateClientPage from '../pages/clients/CreateClientPage'
import EditClientPage from '../pages/clients/EditClientPage'
import ClientsListPage from '../pages/clients/ClientsListPage'
import PetPage  from '../pages/pets/PetPage'
import PetsListPage from '../pages/pets/PetsListPage'

const router = createBrowserRouter([
  {
    path: '',
    loader: () => {
      return redirect('/login')
    }
  },
  {
    path: '/app',
    element: <AppPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/clients',
    element: <ClientsListPage />
  },
  {
    path: '/clients/create',
    element: <CreateClientPage />
  },
  {
    path: '/clients/:id',
    element: <ClientPage />
  },
  {
    path: '/clients/:id/edit',
    element: <EditClientPage />
  },
  {
    path: '/pets',
    element: <PetsListPage />
  },
  {
    path: '/pets/:id',
    element: <PetPage />
  },
])

export default function () {
    return <RouterProvider router={router} />
}