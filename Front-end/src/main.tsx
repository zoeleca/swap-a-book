import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Auth0Provider} from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="https://dev-7tlf1lodcp8t8adj.eu.auth0.com"
      clientId="jho4nyC2weC7ZwABTc7nqFe0SPkjz6zw"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "jho4nyC2weC7ZwABTc7nqFe0SPkjz6zw",
        scope: "openid profile email",
      }}
    >
      <App/>
    </Auth0Provider>
  </StrictMode>
);
