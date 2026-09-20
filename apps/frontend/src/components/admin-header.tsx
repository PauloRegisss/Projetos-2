import { Link } from "waku";
import { unstable_redirect } from "waku/router/server";
import { getSession } from "@/auth/auth";
import AdminUserDropdown from "./admin-user-dropdown";
import NexusIcon from "./nexus-icon";

export default async function AdminHeader() {
	const user = await getSession();
	if (!user || !user.is_staff) unstable_redirect({ to: "/auth" });

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
			<div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#141414]/85 px-5 py-3 backdrop-blur-xl sm:px-7">
				<Link
					className="flex items-center gap-2 space-x-1 text-xl font-black tracking-[0.1em] text-white"
					to="/"
				>
					<NexusIcon width={30} height={30} />
					<p>NEXUS</p>
				</Link>
				<AdminUserDropdown user={user} />
			</div>
		</header>
	);
}
