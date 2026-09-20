import AdminContacts from "@/components/admin-contacts";

export default function AdminPage() {
	return <AdminContacts />;
}

export const getConfig = async () => ({ render: "dynamic" as const });
