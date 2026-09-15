import { Link } from "waku";
import { buttonVariants } from "./ui/button";

export default function Header() {
	return (
		<header className="flex items-center justify-around w-full p-5 border-2 rounded-md fixed bg-white">
			<span className="text-2xl font-extrabold text-primary ">NEXUS</span>
			<div>
				<Link
					className={buttonVariants({
						variant: "link",
					})}
					to="/"
				>
					O que é
				</Link>
				<Link
					className={buttonVariants({
						variant: "link",
					})}
					to="/"
				>
					Sobre nós
				</Link>
				<Link
					className={buttonVariants({
						variant: "link",
					})}
					to="/"
				>
					Relatos
				</Link>
			</div>
		</header>
	);
}
