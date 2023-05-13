import { createBrowserRouter } from "react-router-dom";
import { CustomPizzaPage } from "../components/CustomPizzaPage";
import CardPizzaPage from "../components/CardPizzaPage";
import { FrontPage } from "../components/FrontPage";
import CommandPage from "../components/CommandPage";
import { AdminPage } from "../components/AdminPage";
import { BackofficePage } from "../components/BackofficePage";
import ConfirmationPage from "../components/ConfirmationPage";


// List of route constant
export const accueil = "/"
export const generazza = "/generazza"
export const carte = "/carte"
export const commande = "/commande"
export const confirmation = "/confirmation"
export const admin = "/admin"
export const admin_office = "/admin-office"

// Router from react Router link to component
export const router = createBrowserRouter([
    {
        path: accueil,
        element: <FrontPage />,
    },
    {
        path: generazza,
        element: <CustomPizzaPage />,
    },
    {
        path: carte,
        element: <CardPizzaPage />,
    },
    {
        path: commande,
        element: <CommandPage />,
    },
    {
        path: admin,
        element: <AdminPage />,
    },
    {
        path: admin_office,
        element: <BackofficePage />,

    },
    {
        path: confirmation,
        element: <ConfirmationPage />,
    },
]);


