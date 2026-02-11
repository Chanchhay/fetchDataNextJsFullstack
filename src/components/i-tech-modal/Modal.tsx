"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

type User = {
    name: string;
    email: string;
    avatar: string;
};
export default function Modal({ user }: { user: User }) {
    const router = useRouter();
    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{user.name}</DialogTitle>
                        <DialogDescription>{user.email}</DialogDescription>
                        <Image
                            src={user.avatar}
                            alt="user-image"
                            width={600}
                            height={400}
                            unoptimized
                        />
                    </DialogHeader>
                </DialogContent>
        </Dialog>
    );
}
