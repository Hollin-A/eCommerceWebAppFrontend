import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing layouts
import RootLayout from "./layouts/RootLayout";

// importing pages
import Home from "./pages/Home";

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
