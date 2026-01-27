import { UserCard } from "@/components/i-tech-cards/UserCard";
import { loadUser } from "@/lib/fetchData";
import { ResponseUser } from "@/lib/types/responProducts";

export default async function page() {
    const users: ResponseUser[] = await loadUser();
    return (
        <section className="grid grid-cols-4 gap-4 m-24">
            {users.map((user, index) => (
                <UserCard
                    key={index}
                    name={user.name}
                    email={user.email}
                    avatar={user.avatar}
                />
            ))}
        </section>
    );
}
