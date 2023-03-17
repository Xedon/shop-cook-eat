import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Provider as ClientProvider } from "urql";
import { Auth0Provider } from "@auth0/auth0-react";
import { boot } from "./bootstrap";

const { store, graphqlClient } = boot();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_CLIENT_ID!}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
      audience="http://postgraphile:5000"
    >
      <ClientProvider value={graphqlClient}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            <App />
          </Provider>
        </ThemeProvider>
      </ClientProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
