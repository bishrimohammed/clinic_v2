//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@coreui/coreui/dist/css/coreui.min.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@coreui/coreui/dist/js/coreui.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./store/index";
//import './scss/styles.scss'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </Provider>
);
