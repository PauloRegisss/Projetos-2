import type { ReactNode } from "react";
import { unstable_getHeaders, unstable_redirect } from "waku/router/server";
import { api } from "@/auth/api";
import { getSession } from "@/auth/session";
import AdminHeader from "@/components/admin-header";

export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getData();
	return (
		<div className="min-h-screen font-sans">
			<AdminHeader user={session} />
			<main>{children}</main>
		</div>
	);
}
const getData = async () => {
	const session = await getSession();
	if (!session) unstable_redirect("/auth");
	return session;
};
export const getConfig = async () => ({ render: "dynamic" as const });
