"use client";

import { useEffect, useState } from "react";

const API_URL = import.meta.env.WAKU_PUBLIC_BACKEND_URL;
type Contact = { id: number; name: string; email: string; subject: string; message: string; date: string };

export default function AdminContacts() {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		fetch(`${API_URL}/contatos/`, { credentials: "include" })
			.then(async (response) => {
				if (response.status === 401 || response.status === 403) {
					window.location.href = "/auth";
					return null;
				}
				if (!response.ok) throw new Error("Falha ao carregar contatos");
				return (await response.json()) as { contacts: Contact[] };
			})
			.then((data) => { if (data) setContacts(data.contacts); })
			.catch(() => setHasError(true))
			.finally(() => setIsLoading(false));

	}, []);

	return (
		<div className="mx-auto max-w-7xl px-6 pt-36 pb-20 lg:px-10">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div><p className="font-mono text-[.68rem] font-bold tracking-[.14em] text-primary uppercase">Central de contatos</p><h1 className="mt-3 text-4xl font-black tracking-[-.06em] text-white sm:text-5xl">Mensagens recebidas</h1><p className="mt-3 max-w-xl text-white/50">Acompanhe os formulários preenchidos pelos visitantes da NEXUS.</p></div>
				{!isLoading && <div className="rounded-full border border-primary/20 bg-primary/[.08] px-4 py-2 font-mono text-xs text-primary">{contacts.length} {contacts.length === 1 ? "mensagem" : "mensagens"}</div>}
			</div>
			{isLoading ? <div className="mt-12 rounded-3xl border border-white/10 px-6 py-16 text-center text-white/50">Carregando mensagens...</div> : hasError ? <div className="mt-12 rounded-3xl border border-destructive/30 px-6 py-16 text-center text-destructive">Não foi possível carregar as mensagens.</div> : contacts.length === 0 ? <div className="mt-12 rounded-3xl border border-dashed border-white/15 px-6 py-16 text-center"><p className="font-semibold text-white">Nenhum contato recebido ainda.</p><p className="mt-2 text-sm text-white/45">As novas mensagens aparecerão aqui.</p></div> : <div className="mt-10 grid gap-4 lg:grid-cols-2">{contacts.map((contact) => <article key={contact.id} className="rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 shadow-lg shadow-black/10"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><h2 className="truncate text-lg font-bold text-white">{contact.subject}</h2><p className="mt-1 text-sm text-primary">{contact.name}</p></div><time className="shrink-0 font-mono text-[10px] text-white/35" dateTime={contact.date}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(contact.date))}</time></div><a href={`mailto:${contact.email}`} className="mt-4 block truncate text-sm text-white/45 transition hover:text-primary">{contact.email}</a><p className="mt-5 whitespace-pre-wrap border-t border-white/10 pt-5 text-sm leading-relaxed text-white/70">{contact.message}</p></article>)}</div>}
		</div>
	);
}
