import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export default async function RootElement({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body data-version="1.0">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

export const getConfig = async () => {
	return {
		render: "static",
	} as const;
};
