import { createBrowserRouter } from "react-router-dom";
import { CustomPizzaPage } from "../components/CustomPizzaPage";
import CardPizzaPage from "../components/CardPizzaPage";
import { FrontPage } from "../components/FrontPage";
import CommandPage from "../components/CommandPage";

export const accueil = "/"
export const generazza = "/generazza"
export const carte = "/carte"
export const commande = "/commande"

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
]);


