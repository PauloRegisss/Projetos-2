"use client";

import { ArrowRight, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

export default function LoginForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		setIsSubmitting(true);

		try {
			const response = await signIn({
				username: String(formData.get("username") ?? ""),
				password: String(formData.get("password") ?? ""),
			});

			if (!response.ok) {
				const data = (await response.json().catch(() => null)) as {
					error?: string;
				} | null;
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
					<FieldLabel htmlFor="username" className="text-foreground/80">
						Usuário
					</FieldLabel>
					<div className="relative">
						<UserRound
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							id="username"
							name="username"
							autoComplete="username"
							placeholder="Seu usuário"
							required
							className="h-11 border-border bg-foreground/[.03] pl-10 text-foreground placeholder:text-muted-foreground/70"
						/>
					</div>
				</Field>
				<Field>
					<FieldLabel htmlFor="password" className="text-foreground/80">
						Senha
					</FieldLabel>
					<div className="relative">
						<LockKeyhole
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							placeholder="Sua senha"
							required
							className="h-11 border-border bg-foreground/[.03] pl-10 text-foreground placeholder:text-muted-foreground/70"
						/>
					</div>
					<FieldDescription className="text-muted-foreground">
						Acesso restrito à área administrativa.
					</FieldDescription>
				</Field>
			</FieldGroup>
			<Button
				type="submit"
				disabled={isSubmitting}
				size="lg"
				className="h-12 w-full rounded-xl font-bold"
			>
				{isSubmitting ? (
					<LoaderCircle aria-hidden="true" className="animate-spin" />
				) : (
					<ArrowRight aria-hidden="true" />
				)}
				{isSubmitting ? "Entrando..." : "Entrar na dashboard"}
			</Button>
		</form>
	);
}
