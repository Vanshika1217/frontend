import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from './components/CartContext'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <CartProvider>
    {/* <AuthProvider> */}
      <App />
      </CartProvider>
    {/* </AuthProvider> */}
  </BrowserRouter>
);
