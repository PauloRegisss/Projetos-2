"use client";

import { MessageCircle } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type FloatingChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function FloatingChatButton({
	className = "",
	onClick,
	...props
}: FloatingChatButtonProps) {
	return (
		<button
			 type="button"
			 aria-label="Abrir assistente NEXUS"
			onClick={(event) => {
				window.dispatchEvent(new CustomEvent("nexus-chatbot:open"));
				onClick?.(event);
			}}
			className={`fixed right-5 bottom-5 z-50 flex min-h-14 min-w-14 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(170,255,0,.2)] transition hover:scale-105 hover:bg-[#c1ff52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-95 sm:right-8 sm:bottom-8 ${className}`}
			{...props}
		>
			<MessageCircle aria-hidden="true" className="size-6" strokeWidth={2.25} />
		</button>
	);
}
