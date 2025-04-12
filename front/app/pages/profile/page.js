import Card from "@/app/components/Card";
import Image from "next/image";

export default function profile(){
    return(
        <Card>
            <div className="px-20 pb-100 ">
                <Image
                src="/icons/user.svg"
                width={100}
                height={100}
                alt="user.png"
                />
                <div className="text-center">
                    user name
                </div>
            </div>
        </Card>
    );
}