import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContextStateProvider } from "./context/Context";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ContextStateProvider>
        <App />
    </ContextStateProvider>  
  </QueryClientProvider>,
);
