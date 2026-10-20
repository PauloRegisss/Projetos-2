import { unstable_getHeaders, unstable_redirect } from "waku/router/server";
import { api } from "@/auth/api";

type Contact = {
	id: number;
	name: string;
	email: string;
	subject: string;
	message: string;
	date: string;
};
export default async function AdminPage() {
	const contacts = await getData();
	return (
		<div className="mx-auto max-w-7xl px-6 pt-36 pb-20 lg:px-10">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">
						Central de contatos
					</p>
					<h1 className="mt-3 text-4xl font-black tracking-[-.06em] text-foreground sm:text-5xl">
						Mensagens recebidas
					</h1>
					<p className="mt-3 max-w-xl text-muted-foreground">
						Acompanhe os formulários preenchidos pelos visitantes da NEXUS.
					</p>
				</div>
			</div>
			{contacts.length === 0 ? (
				<div className="mt-12 rounded-3xl border border-dashed border-border px-6 py-16 text-center">
					<p className="font-semibold text-foreground">
						Nenhum contato recebido ainda.
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						As novas mensagens aparecerão aqui.
					</p>
				</div>
			) : (
				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					{contacts.map((contact) => (
						<article
							key={contact.id}
							className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-black/5 dark:border-white/10 dark:shadow-black/10"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="min-w-0">
									<h2 className="truncate text-lg font-bold text-card-foreground">
										{contact.subject}
									</h2>
									<p className="mt-1 text-sm text-primary">{contact.name}</p>
								</div>
								<time
									className="shrink-0 font-mono text-[10px] text-muted-foreground"
									dateTime={contact.date}
								>
									{new Intl.DateTimeFormat("pt-BR", {
										dateStyle: "medium",
									}).format(new Date(contact.date))}
								</time>
							</div>
							<a
								href={`mailto:${contact.email}`}
								className="mt-4 block truncate text-sm text-muted-foreground transition hover:text-primary"
							>
								{contact.email}
							</a>
							<p className="mt-5 whitespace-pre-wrap border-t border-border pt-5 text-sm leading-relaxed text-card-foreground/80">
								{contact.message}
							</p>
						</article>
					))}
				</div>
			)}
		</div>
	);
}

const getData = async () => {
	const res = await api("/contatos/", {
		headers: unstable_getHeaders(),
	});
	if (!res.ok) unstable_redirect("/auth");
	return (await res.json()).contacts as Contact[];
};

export const getConfig = async () => ({ render: "dynamic" as const });
