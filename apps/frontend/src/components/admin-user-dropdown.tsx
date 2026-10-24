"use client";

import { LoaderCircle, LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "waku";
import { signOut } from "@/auth/auth";
import type { User } from "@/auth/session";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "./ui/toast";

export default function AdminUserDropdown({ user }: { user: User }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const route = useRouter();
	const logout = async () => {
		setIsLoggingOut(true);
		try {
			const response = await signOut();
			if (!response.ok)
				toast.add({
					title: "Ocorreu um erro ao tentar sair da conta.",
				});
			route.push("/auth");
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
				className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			>
				<Avatar size="sm">
					<AvatarFallback className="bg-transparent text-current">
						<UserRound aria-hidden="true" className="size-5" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-64 rounded-2xl border-border bg-card p-3 text-card-foreground"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="px-2 pb-3">
						<p className="font-semibold">{user.username}</p>
						<p className="mt-1 truncate font-normal text-muted-foreground">
							{user.email}
						</p>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-border" />
				<DropdownMenuItem
					disabled={isLoggingOut}
					onClick={logout}
					className="mt-2 cursor-pointer rounded-xl px-2 py-2.5 text-foreground/70 focus:bg-foreground/5 focus:text-primary"
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
