import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./assets/styles/tailwind.generated.css";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.scss";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store.js";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    cprimary: {
      400: "#053C6Dcc",
      500: "#053C6D", // you need this
      600: "#022c52",
    },
    csecondary: {
      400: "#ff6600cc",
      500: "#ff6600", // you need this
      600: "#ef6000",
    },
  },
});

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter forceRefresh={false}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
