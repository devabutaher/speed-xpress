"use client";

import { useAllState } from "@/hooks/useAllState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const { localTheme } = useAllState();

  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme={localTheme}
      toastClassName="rounded-lg shadow-card text-sm"
    />
  );
};

export default Notification;
