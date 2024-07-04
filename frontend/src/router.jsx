/* eslint-disable no-unused-vars */
// import Login from "./pages/Login";
// import Maintenances from "./pages/maintenances";
// import Personnels from "./pages/Personnels";
// import Materiels from "./pages/materiels";
// import MaterielsForm from "./pages/materielsForm";
// import Register from './pages/Register';
// import StocksForm from './pages/PiecesForm';
// import MaintenancesForm from './pages/maintenancesForm';
// import PersonnelsForm from './pages/PersonnelsForm';
// import Accueil from './pages/Accueil';
// import Pieces from "./pages/Pieces";
// import Hierarchies from "./pages/Hierarchie";
// import PiecesForm from './pages/PiecesForm';
import NotFound from "./pages/NotFound";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultComponent from "./components/DefaultComponent";
import ClientComponent from "./components/ClientComponent";
import Home from "./pages/Home";
// import Login2 from './pages/login2';
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Drive from "./pages/Drive";
import Ride from "./pages/Ride";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Dashboard from "./pages/dashboard";
import Help from "./pages/Help";
import TestComponent from "./pages/TestComponent";
import Profil from "./pages/profil";
import AnnonceForm from "./pages/AnnonceForm";
import Recherche from "./pages/Recherche";
import Alertes from "./pages/Alertes";
import Reservation from "./pages/Reservation";
import Annonce from "./pages/Annonce";
import TabbedContainer from "./pages/TabContainer";
import MesAnnonces from "./pages/MesAnnonces";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultComponent />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/ride",
        element: <Ride />,
      },
      {
        path: "/drive",
        element: <Drive />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/testcomponent",
        element: <TestComponent />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "rechercher",
        element: <Recherche />,
      },
      {
        path: "mesalertes",
        element: <Alertes />,
      },
      {
        path: "mesreservation",
        element: <Reservation />,
      },
      {
        path: "mesannonce",
        element: <MesAnnonces/>,
      },
      {
        path: "annonce",
        element: <Annonce />,
      },
    ],
  },
  {
    path: "/client/*",
    element: <ClientComponent />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "ride",
        element: <Ride />,
      },
      {
        path: "drive",
        element: <Drive />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "testcomponent",
        element: <TestComponent />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profil",
        element: <Profil />,
      },
      {
        path: "annonce_form",
        element: <AnnonceForm />,
      },
      {
        path: "rechercher",
        element: <Recherche />,
      },
      {
        path: "mesalertes",
        element: <Alertes />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "mesannonce",
        element: <MesAnnonces />,
      },
      {
        path: "tab",
        element: <TabbedContainer />,
      },
      {
        path: "annonce",
        element: <Annonce />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;


