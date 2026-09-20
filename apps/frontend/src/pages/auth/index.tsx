import { ArrowLeft } from "lucide-react";
import { Link } from "waku";
import { unstable_redirect } from "waku/router/server";
import { getSession } from "@/auth/auth";
import LoginForm from "@/components/login-form";

export default async function AuthPage() {
	const user = await getSession();
	if (user != null)
		unstable_redirect({
			to: "/admin",
		});

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-28">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(170,255,0,.12),transparent_32%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-size-[auto,48px_48px,48px_48px] mask-[linear-gradient(to_bottom,black,transparent)]" />
			<div className="absolute top-8 left-6 lg:left-10">
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
				>
					<ArrowLeft aria-hidden="true" className="size-4" />
					Voltar à página principal
				</Link>
			</div>
			<section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#141414]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
				<div className="mb-8">
					<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
						Área restrita
					</p>
					<h1 className="mt-3 text-3xl font-black tracking-[-.05em] text-white">
						Bem-vindo de volta.
					</h1>
					<p className="mt-2 text-sm leading-relaxed text-white/45">
						Entre para acessar a dashboard da NEXUS.
					</p>
				</div>
				<LoginForm />
			</section>
		</main>
	);
}
export const getConfig = async () => {
	return {
		render: "dynamic",
	} as const;
};
