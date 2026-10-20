import type { User } from "@/auth/session";
import AdminUserDropdown from "./admin-user-dropdown";
import NexusIcon from "./nexus-icon";
import ThemeSwitcher from "./theme-switch";

export default async function AdminHeader({ user }: { user: User }) {
	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
			<div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/85 px-5 py-3 shadow-sm shadow-black/5 backdrop-blur-xl sm:px-7 dark:border-white/10 dark:shadow-none">
				<div className="flex items-center gap-2 text-xl font-black tracking-[0.1em] text-foreground">
					<NexusIcon width={30} height={30} />
					<p>NEXUS</p>
				</div>
				<div className="flex items-center gap-3">
					<ThemeSwitcher />
					{user && <AdminUserDropdown user={user} />}
				</div>
			</div>
		</header>
	);
}
