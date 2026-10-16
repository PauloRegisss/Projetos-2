"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button
				type="button"
				disabled
				aria-label="Carregando tema"
				className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground opacity-50 dark:border-white/10"
			>
				<Sun size={18} />
			</button>
		);
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={`Ativar tema ${isDark ? "claro" : "escuro"}`}
			title={`Ativar tema ${isDark ? "claro" : "escuro"}`}
			className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-white/10"
		>
			{isDark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}
