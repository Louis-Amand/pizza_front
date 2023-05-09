import {createBrowserRouter} from "react-router-dom";
import {CustomPizzaPage} from "../components/CustomPizzaPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <><h1>Salut</h1></>,
    },
    {
        path: "/generazza",
        element: <CustomPizzaPage/>,
    },
]);