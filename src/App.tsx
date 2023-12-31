import React from "react";
import "./App.css";

// react router for in-app routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// importing layouts
import RootLayout from "./layouts/RootLayout";

// importing pages
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

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
        {
          path: "/favourites",
          element: <Favourites />,
        },
        {
          path: "/add-product",
          element: <AddProduct />,
        },
        {
          path: "/edit-product/:id",
          element: <EditProduct />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
