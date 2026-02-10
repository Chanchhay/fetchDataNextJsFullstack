import { UserCard } from "@/components/i-tech-cards/UserCard";
import { loadUser } from "@/lib/fetchData";
import { ResponseUser } from "@/lib/types/responProducts";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
    const users: ResponseUser[] = await loadUser();
    return (
        <section className="grid grid-cols-4 gap-4 m-24">
            {users.map((user, index) => (
                <Link href={`users/user-detail/${user.id}`} key={index}>
                    <Suspense
                        fallback={<h1 className="text-center">loading...</h1>}
                    >
                        <UserCard
                            name={user.name}
                            email={user.email}
                            avatar={user.avatar}
                        />
                    </Suspense>
                </Link>
            ))}
        </section>
    );
}
