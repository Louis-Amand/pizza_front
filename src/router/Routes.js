import {createBrowserRouter} from "react-router-dom";
import {CustomPizzaPage} from "../components/CustomPizzaPage";
import CardPizzaPage from "../components/CardPizzaPage";
import {FrontPage} from "../components/FrontPage";
import {AdminPage} from "../components/public/AdminPage";
import {BackofficePage} from "../components/BackofficePage";
import CommandPage from "../components/CommandPage";

export const accueil = "/"
export const generazza = "/generazza"
export const carte = "/carte"
export const commande = "/commande"
export const admin = "/admin"
export const admin_office = "/admin-office"

export const router = createBrowserRouter([
    {
        path: accueil,
        element: <FrontPage/>,
    },
    {
        path: generazza,
        element: <CustomPizzaPage/>,
    },
    {
        path: carte,
        element: <CardPizzaPage/>,
    },
    {
        path: commande,
        element: <CommandPage />,
    },{
        path: admin,
        element: <AdminPage/>,
    },{
        path: admin_office,
        element: <BackofficePage/>,
    },
]);


