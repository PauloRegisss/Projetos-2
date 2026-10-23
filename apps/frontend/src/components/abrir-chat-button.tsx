"use client";

import type { ButtonHTMLAttributes } from "react";
import { EVENTO_ABRIR_CHAT } from "./chatbot";

type AbrirChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variante?: "primario" | "contorno";
};

const ESTILOS = {
	primario: "bg-primary text-primary-foreground hover:brightness-95",
	contorno:
		"border border-current/30 bg-transparent text-current hover:border-current",
};

// Botão comum que abre o chat (mesmo evento do botão flutuante).
export default function AbrirChatButton({
	className = "",
	variante = "primario",
	children,
	...props
}: AbrirChatButtonProps) {
	return (
		<button
			type="button"
			onClick={() => window.dispatchEvent(new CustomEvent(EVENTO_ABRIR_CHAT))}
			className={`inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-sm font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${ESTILOS[variante]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
