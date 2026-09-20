import type { ReactNode } from "react";
import AdminHeader from "@/components/admin-header";

export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="min-h-screen font-sans">
			<AdminHeader />
			<main>{children}</main>
		</div>
	);
}

export const getConfig = async () => ({ render: "dynamic" as const });
