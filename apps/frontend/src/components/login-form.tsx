"use client";

import { ArrowRight, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const API_URL = import.meta.env.WAKU_PUBLIC_BACKEND_URL;

export default function LoginForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		setIsSubmitting(true);

		try {
			const csrfResponse = await fetch(`${API_URL}/auth/csrf/`, {
				credentials: "include",
			});
			if (!csrfResponse.ok) throw new Error("CSRF");
			const { csrfToken } = (await csrfResponse.json()) as { csrfToken: string };
			document.cookie = `csrftoken=${encodeURIComponent(csrfToken)}; Path=/; SameSite=Lax`;

			const response = await fetch(`${API_URL}/auth/login/`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken,
				},
				body: JSON.stringify({
					username: formData.get("username"),
					password: formData.get("password"),
				}),
			});

			if (!response.ok) {
				const data = (await response.json().catch(() => null)) as { error?: string } | null;
				throw new Error(data?.error ?? "Usuário ou senha inválidos.");
			}

			window.location.href = "/admin";
		} catch (error) {
			toast.add({
				title: "Não foi possível entrar",
				description:
					error instanceof Error && error.message !== "CSRF"
						? error.message
						: "Verifique seus dados e tente novamente.",
				type: "error",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="username" className="text-white/80">
						Usuário
					</FieldLabel>
					<div className="relative">
						<UserRound aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/35" />
						<Input id="username" name="username" autoComplete="username" placeholder="Seu usuário" required className="h-11 border-white/10 bg-white/[.04] pl-10 text-white placeholder:text-white/30" />
					</div>
				</Field>
				<Field>
					<FieldLabel htmlFor="password" className="text-white/80">
						Senha
					</FieldLabel>
					<div className="relative">
						<LockKeyhole aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/35" />
						<Input id="password" name="password" type="password" autoComplete="current-password" placeholder="Sua senha" required className="h-11 border-white/10 bg-white/[.04] pl-10 text-white placeholder:text-white/30" />
					</div>
					<FieldDescription className="text-white/35">Acesso restrito à área administrativa.</FieldDescription>
				</Field>
			</FieldGroup>
			<Button type="submit" disabled={isSubmitting} size="lg" className="h-12 w-full rounded-xl font-bold">
				{isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <ArrowRight aria-hidden="true" />}
				{isSubmitting ? "Entrando..." : "Entrar na dashboard"}
			</Button>
		</form>
	);
}
