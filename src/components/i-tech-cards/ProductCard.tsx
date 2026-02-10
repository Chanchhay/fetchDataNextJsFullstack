import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";

export function ProductCard({
    title,
    description,
    images,
}: {
    title: string;
    description: string;
    images: string[];
}) {
    return (
        <>
            <Card className="relative mx-auto w-full max-w-sm pt-0">
                <div className="absolute inset-0 z-30 rounded-2xl" />
                <Image
                    src={images[0]}
                    alt="image"
                    className="relative z-20 w-full object-contain rounded-2xl"
                    width={200}
                    height={200}
                    unoptimized
                />
                <CardHeader>
                    <CardAction>
                        <Badge variant="secondary">Featured</Badge>
                    </CardAction>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="line-clamp-2">{description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full">View Event</Button>
                </CardFooter>
            </Card>
        </>
    );
}
