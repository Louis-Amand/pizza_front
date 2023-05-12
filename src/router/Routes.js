import {createBrowserRouter} from "react-router-dom";
import {CustomPizzaPage} from "../components/CustomPizzaPage";
import CardPizzaPage from "../components/CardPizzaPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <><h1>Salut</h1></>,
    },
    {
        path: "/generazza",
        element: <CustomPizzaPage/>,
    },
    {
        path: "/carte",
        element: <CardPizzaPage/>,
    },
]);
