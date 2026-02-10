import { loadUserDetail } from "@/lib/fetchData";
import Image from "next/image";

export default async function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await loadUserDetail(id);
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <Image alt="user-image" src={user.avatar} width={200} height={200} unoptimized />
        </div>
    );
}
