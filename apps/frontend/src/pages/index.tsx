export default function HomePage() {
	return (
		<div className="text-center">
			{/*<nav className="fixed top-0 left-0 w-full py-4 bg-gray-200 px-8 flex justify-between items-center">
				<span className="text-2xl font-bold">NEXUS</span>
				<ul className="flex gap-6">
					<li>
						<Link to="#">O que é</Link>
					</li>
					<li>
						<Link to="#">Relatos</Link>
					</li>
					<li>
						<Link to="#">Quem somos</Link>
					</li>
				</ul>
			</nav>*/}
			<section className="pt-24 mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</section>

			<section>
				<h2 className="text-2xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h2>
				<p>
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat.
				</p>
			</section>
			<section className="pt-24 mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</section>
			<section className="pt-24 mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</section>
			<section className="pt-24 mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</section>
			<section className="pt-24 mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</section>
			<section className="pt-24 mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-2">
					Lorem ipsum dolor sit amet
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</section>
		</div>
	);
}

export const getConfig = async () => {
	return {
		render: "static",
	} as const;
};
