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

export function UserCard({
    name,
    email,
    avatar,
}: {
    name: string;
    email: string;
    avatar: string;
}) {
    return (
        <>
            <Card className="relative mx-auto w-full max-w-sm pt-0">
                <div className="absolute inset-0 z-30 rounded-2xl" />
                <Image
                    src={avatar}
                    alt="image"
                    className="relative z-20 w-full h-60 object-cover rounded-2xl"
                    width={100}
                    height={100}
                    unoptimized
                />
                <CardHeader>
                    <CardAction>
                        <Badge variant="secondary">Featured</Badge>
                    </CardAction>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription className="line-clamp-2">{email}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full">View Event</Button>
                </CardFooter>
            </Card>
        </>
    );
}
