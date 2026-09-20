import "../styles.css";

import path from "node:path/win32";
import type { ReactNode } from "react";
import { unstable_getHeaders } from "waku/router/server";
import { Toaster } from "@/components/ui/toast";
import FloatingChatButton from "../components/floating-chat-button";
import Header from "../components/header";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
	const data = await getData();
	return (
		<div className="min-h-screen font-sans">
			<meta name="description" content={data.description} />
			<link rel="icon" type="image/png" href={data.icon} />
			<title>Projeto Nexus</title>
			<FloatingChatButton />
			<Toaster />
			<main>{children}</main>
		</div>
	);
}

const getData = async () => {
	const data = {
		description: "Projeto Nexus, venha conhecer!",
		icon: "/images/favicon.png",
	};

	return data;
};

export const getConfig = async () => {
	return {
		render: "dynamic",
	} as const;
};
