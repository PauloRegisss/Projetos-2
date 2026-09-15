import { ArrowUpRight } from "lucide-react";
import { Link } from "waku";
import NexusIcon from "./nexus-icon";
import { Button, buttonVariants } from "./ui/button";

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
					<a className="transition-colors hover:text-primary" href="#solucoes">
						Soluções
					</a>
					<a
						className="transition-colors hover:text-primary"
						href="#como-funciona"
					>
						Como funciona
					</a>
					<a className="transition-colors hover:text-primary" href="#relatos">
						Relatos
					</a>
				</nav>
				<Link className={buttonVariants()} to="/">
					Fale conosco <ArrowUpRight aria-hidden="true" className="size-3" />
				</Link>
			</div>
		</header>
	);
}
