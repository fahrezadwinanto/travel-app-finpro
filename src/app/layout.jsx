"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/store/store";
import Header from "@/components/header";
import { usePathname } from "next/navigation";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({ children }) {
  const path = usePathname();
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {path === "/login" || path === "/register" ? null : <Header />}
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
