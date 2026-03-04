import axios from "axios";
import { UploadResponse } from "./types/upload";

const baseAPI = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export async function uploadImageToServer(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);


    const response = await axios.post<UploadResponse>(
        `${baseAPI}/api/v1/files/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
    );

    return response.data;
}

    export async function uploadImage(file: File) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch(`${baseAPI}/api/v1/files/upload`, {
            method: "POST",
            body: fd,
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Upload failed (${res.status}): ${text}`);
        }
        const data = await res.json();
        const url = data.location as string | undefined;
        if (!url) throw new Error("Upload succeeded but no image URL returned");
        return url;
    }
