import ProductLoading from "@/components/i-tech-loading/loading";
import Modal from "@/components/i-tech-modal/Modal";
import { SkeletonCard } from "@/components/i-tech-skeleton/Skeleton-card";
import { loadUserDetail } from "@/lib/fetchData";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await loadUserDetail(id);
    return <Modal user={user} />;
}
