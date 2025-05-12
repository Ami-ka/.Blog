import { useRouter } from "next/navigation";

export default function alertAuthorizePlease(){
    const router = useRouter();
    alert("ple");
    router.push("/login");
}