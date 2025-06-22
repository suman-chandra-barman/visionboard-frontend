import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd"; // <-- Import this

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" />
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Roboto, Arial, sans-serif",
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
