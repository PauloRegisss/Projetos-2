"use client";

import { Button } from "./ui/button";
import type { ButtonHTMLAttributes } from "react";
import { useRouter } from "waku";

type FloatingChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function FloatingChatButton({ className = "", onClick, ...props }: FloatingChatButtonProps) {
  const { path } = useRouter();

  // A página da simulação já é um chat em tela cheia, e o botão cobriria os controles dela.
  if (path === "/showroom/new") return null;

  return (
    <Button
      type="button"
      aria-label="Abrir assistente NEXUS"
      onClick={(event) => {
        window.dispatchEvent(new CustomEvent("nexus-chatbot:open"));
        onClick?.(event);
      }}
      variant="ghost"
      size="icon-lg"
      className={`size-15 p-0 fixed right-5 bottom-5 z-50 flex min-h-14 min-w-14 items-center justify-center rounded-full border border-primary/40  text-primary-foreground shadow-[0_12px_30px_rgba(170,255,0,.2)] transition hover:scale-105  focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-95 sm:right-8 sm:bottom-8 ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="pulso-sinal absolute inset-0 rounded-full border border-primary/60" />
      <img src="/images/chat.png" alt="" className="flutuar size-15" />
    </Button>
  );
}
