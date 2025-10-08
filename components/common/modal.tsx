"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      setElement(modalRoot);
      setMounted(true);
    }
  }, []);

  if (!mounted || !element) return null;
  return createPortal(children, element);
};

export default Modal;
