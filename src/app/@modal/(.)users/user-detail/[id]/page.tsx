import Modal from "@/components/i-tech-modal/Modal";
import { loadUserDetail } from "@/lib/fetchData";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await loadUserDetail(id);
    return <Modal user={user} />;
}
