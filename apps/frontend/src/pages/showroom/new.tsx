import ShowRoomBot from "@/components/showroom-bot";

export default function ShowroomChatCreate() {
	return <ShowRoomBot />;
}

export const getConfig = async () => ({ render: "static" as const });
