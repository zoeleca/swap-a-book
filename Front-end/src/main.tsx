import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Auth0Provider} from "@auth0/auth0-react";

console.log('Auth0 Domain:', process.env.VITE_AUTH0_DOMAIN); // This should output your correct Auth0 domain

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-b77oxg884oraklfh.eu.auth0.com"
      clientId="VWwfUcSXgvdiwLuP6l3uttMckvPNbczM"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:8000",
      }}
    >
      <App/>
    </Auth0Provider>
  </StrictMode>
);
