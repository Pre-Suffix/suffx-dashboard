import Image from "next/image";
import LoginButton from "./ui/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col min-w-screen min-h-screen justify-center items-center bg-background">
      <div className="flex flex-row justify center items-center mb-5">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/suffx_logo.png"
            width={80}
            height={80}
            alt="SuffX Logo"
          />
          <p className="text-3xl">SuffX Dashboard</p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center mt-5">
        <LoginButton />
      </div>
    </div>
  );
}
