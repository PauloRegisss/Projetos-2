"use client";

import { useEffect, useState } from "react";
import AdminUserDropdown from "./admin-user-dropdown";
import NexusIcon from "./nexus-icon";

type User = {
	username: string;
	email: string;
};

const API_URL = import.meta.env.WAKU_PUBLIC_BACKEND_URL;

export default function AdminHeader() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetch(`${API_URL}/auth/me/`, { credentials: "include" })
			.then(async (response) => {
				if (!response.ok) throw new Error("Sessão inválida");
				const data = (await response.json()) as { user?: User & { is_staff?: boolean } };
				if (!data.user?.is_staff) throw new Error("Acesso não autorizado");
				setUser(data.user);
			})
			.catch(() => {
				window.location.href = "/auth";
			});
	}, []);

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
			<div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#141414]/85 px-5 py-3 backdrop-blur-xl sm:px-7">
				<div className="flex items-center gap-2 text-xl font-black tracking-[0.1em] text-white">
					<NexusIcon width={30} height={30} />
					<p>NEXUS</p>
				</div>
				{user && <AdminUserDropdown user={user} />}
			</div>
		</header>
	);
}
