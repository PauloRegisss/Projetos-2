import { ArrowUpRight } from "lucide-react";
import { Link } from "waku";
import NexusIcon from "./nexus-icon";
import { buttonVariants } from "./ui/button";

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
			<div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#141414]/85 px-5 py-3 backdrop-blur-xl sm:px-7">
				<Link
					className="flex items-center gap-2 space-x-1 text-xl font-black tracking-[0.1em] text-white"
					to="/"
				>
					<NexusIcon width={30} height={30} />
					<p>NEXUS</p>
				</Link>
				<nav
					aria-label="Navegação principal"
					className="hidden items-center gap-8 text-sm text-white/60 md:flex"
				>
					<Link
						to={"/contato"}
						className="transition-colors hover:text-primary"
					>
						Contato
					</Link>
					<a className="transition-colors hover:text-primary" href="/contato">
						Sobre a NEXUS
					</a>
				</nav>
				{/*<a
					className={buttonVariants({
						className: "hidden min-h-11 md:inline-flex",
					})}
					href="/showroom"
				>
					Acessar showroom
					<ArrowUpRight aria-hidden="true" className="size-3" />
				</a>*/}
				<details className="relative md:hidden">
					<summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/15 text-white transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
						<span className="sr-only">Abrir menu</span>
						<span className="flex w-5 flex-col gap-1" aria-hidden="true">
							<span className="h-px w-full bg-current" />
							<span className="h-px w-3/4 self-end bg-current" />
							<span className="h-px w-full bg-current" />
						</span>
					</summary>
					<nav
						aria-label="Navegação mobile"
						className="absolute right-0 top-14 flex w-56 flex-col gap-1 rounded-2xl border border-white/10 bg-[#1c1c1c] p-2 text-sm text-white/70 shadow-xl"
					>
						<a
							className="rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-primary"
							href="#solucoes"
						>
							Soluções
						</a>
						<a
							className="rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-primary"
							href="#como-funciona"
						>
							Como funciona
						</a>
						<a
							className="rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-primary"
							href="#relatos"
						>
							O que muda
						</a>
						<a
							className="rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-primary"
							href="/contato"
						>
							Contato
						</a>
						<a
							className="mt-1 flex items-center justify-between rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground"
							href="/showroom"
						>
							Acessar showroom{" "}
							<ArrowUpRight aria-hidden="true" className="size-4" />
						</a>
					</nav>
				</details>
			</div>
		</header>
	);
}
