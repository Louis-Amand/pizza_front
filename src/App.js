import React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import {router} from "./router/Routes";
import {NavBar} from "./components/public/NavBar";
import {Footer} from "./components/public/Footer";

// Root if application All page are display here
function App() {

  return (
    <div className="App">
        <NavBar></NavBar>
         <RouterProvider router={router} />
        <Footer></Footer>
    </div>
  );
}

export default App;