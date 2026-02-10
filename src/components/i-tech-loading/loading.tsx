import { SkeletonCard } from "../i-tech-skeleton/Skeleton-card";

export default function ProductLoading() {
    return (
        <section className="grid grid-cols-4 gap-4 m-24">
            {[...Array(15)].map((_, index) => (
                <div key={index}>
                    <SkeletonCard />
                </div>
            ))}
        </section>
    );
}
