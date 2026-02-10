import ProductLoading from "@/components/i-tech-loading/loading";
import { loadUserDetail } from "@/lib/fetchData";
import Image from "next/image";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const user = await loadUserDetail(id);
    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {user.name}
                        </h3>
                        <div className="mt-2 px-7 py-3">
                            <p className="text-lg text-gray-500">
                                {user.email}
                            </p>
                            <Image
                                alt="user-image"
                                src={user.avatar}
                                width={200}
                                height={200}
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
