"use client";

import { LoaderCircle, LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type User = { username: string; email: string };
const API_URL = import.meta.env.WAKU_PUBLIC_BACKEND_URL;

export default function AdminUserDropdown({ user }: { user: User }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const logout = async () => {
		setIsLoggingOut(true);
		try {
			const csrf = await fetch(`${API_URL}/auth/csrf/`, {
				credentials: "include",
			});
			if (!csrf.ok) throw new Error("Não foi possível obter o token CSRF");
			const { csrfToken } = (await csrf.json()) as { csrfToken: string };
			const response = await fetch(`${API_URL}/auth/logout/`, {
				method: "POST",
				credentials: "include",
				headers: { "X-CSRFToken": csrfToken },
			});
			if (!response.ok) throw new Error("Não foi possível fazer logout");
			window.location.href = "/auth";
		} catch (error) {
			console.error("Falha ao fazer logout", error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label="Abrir menu do usuário"
				className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			>
				<Avatar size="sm">
					<AvatarFallback className="bg-transparent text-current">
						<UserRound aria-hidden="true" className="size-5" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-64 rounded-2xl border-white/10 bg-[#1c1c1c] p-3 text-white"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="px-2 pb-3">
						<p className="font-semibold">{user.username}</p>
						<p className="mt-1 truncate font-normal text-white/50">{user.email}</p>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-white/10" />
				<DropdownMenuItem
					disabled={isLoggingOut}
					onClick={logout}
					className="mt-2 cursor-pointer rounded-xl px-2 py-2.5 text-white/70 focus:bg-white/5 focus:text-primary"
				>
					{isLoggingOut ? (
						<LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
					) : (
						<LogOut aria-hidden="true" className="size-4" />
					)}
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
