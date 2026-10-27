"use client";

import { MessageCircle } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";

type FloatingChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function FloatingChatButton({
	className = "",
	onClick,
	...props
}: FloatingChatButtonProps) {
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
			<img src="/images/chat.png" alt="alt" className="size-15" />
		</Button>
	);
}
