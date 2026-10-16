import { ArrowUpRight } from "lucide-react";
import { Link } from "waku";
import NexusIcon from "./nexus-icon";
import ThemeSwitcher from "./theme-switch";

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
			<div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/85 px-5 py-3 shadow-sm shadow-black/5 backdrop-blur-xl sm:px-7 dark:border-white/10 dark:bg-[#141414]/85 dark:shadow-none">
				<Link
					className="flex items-center gap-2 space-x-1 text-xl font-black tracking-[0.1em] text-foreground"
					to="/"
				>
					<NexusIcon width={30} height={30} />
					<p>NEXUS</p>
				</Link>

				<div className="hidden items-center gap-8 md:flex">
					<nav
						aria-label="Navegação principal"
						className="flex items-center gap-8 text-sm text-muted-foreground"
					>
						<Link
							to="/contato"
							className="transition-colors hover:text-primary"
						>
							Contato
						</Link>

						<Link className="transition-colors hover:text-primary" to="/sobre">
							Sobre a NEXUS
						</Link>
					</nav>

					<ThemeSwitcher />
				</div>

				<details className="group relative md:hidden">
					<summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
						<span className="sr-only">Abrir menu</span>

						<span className="flex w-5 flex-col gap-1" aria-hidden="true">
							<span className="h-px w-full bg-current" />
							<span className="h-px w-3/4 self-end bg-current" />
							<span className="h-px w-full bg-current" />
						</span>
					</summary>

					<nav
						aria-label="Navegação mobile"
						className="absolute right-0 top-14 flex w-60 flex-col gap-1 rounded-2xl border border-border bg-background p-2 text-sm text-foreground/75 shadow-xl shadow-black/10 dark:border-white/10 dark:bg-[#1c1c1c] dark:text-white/70 dark:shadow-black/30"
					>
						<a
							className="rounded-xl px-4 py-3 transition hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
							href="/#solucoes"
						>
							Soluções
						</a>

						<a
							className="rounded-xl px-4 py-3 transition hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
							href="/#como-funciona"
						>
							Como funciona
						</a>

						<a
							className="rounded-xl px-4 py-3 transition hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
							href="/#relatos"
						>
							O que muda
						</a>

						<Link
							className="rounded-xl px-4 py-3 transition hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
							to="/contato"
						>
							Contato
						</Link>

						<Link
							className="rounded-xl px-4 py-3 transition hover:bg-foreground/5 hover:text-primary dark:hover:bg-white/5"
							to="/sobre"
						>
							Sobre a NEXUS
						</Link>

						<Link
							className="mt-1 flex items-center justify-between rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground transition hover:brightness-95"
							to="/showroom"
						>
							Acessar showroom
							<ArrowUpRight aria-hidden="true" className="size-4" />
						</Link>

						<div className="mt-1 flex items-center justify-between border-t border-border px-4 py-3 dark:border-white/10">
							<span className="text-sm font-medium text-foreground">Tema</span>
							<ThemeSwitcher />
						</div>
					</nav>
				</details>
			</div>
		</header>
	);
}
