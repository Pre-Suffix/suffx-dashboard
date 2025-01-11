import Navbar from "@/app/ui/navbar";
import { fetchEndpoint } from "@/utils/api";
import { headers } from "next/headers";
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Chat({ params }) {
    const Headers = await headers();  
    const status = await fetchEndpoint(Headers, "auth/status");
  
    if(status.error) return (
      <script>window.location.href = "/";</script>
    )

    const uuid = (await params).uuid;
    const chat = await fetchEndpoint(Headers, "chats/get?uuid=" + uuid);

    if(chat.error) return (
        <main className="w-screen h-screen bg-slate-900">
            <div className="w-full flex-none drop-shadow-lg">
                <Navbar page="chats" />
            </div>
            <div className="w-screen text-center">
                <p className="my-10 text-2xl font-bold">Invalid UUID.</p>
            </div>
        </main>
    );



    const getMessageHTML = (message, index) => {
        return (
            <div key={"msg+" + index} className={
                "border-b sm:border-b-0 w-screen flex flex-col sm:flex-row py-5 "
                + (message.role == "assistant" ? "bg-background" : "bg-slate-900")
            }>
                <div className="justify-start">
                    <img src={message.role == "assistant" ? "/chatgpt.png" : chat.userIconURL} className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full mx-5" />
                </div>
                <div className="mt-5 sm:mt-0 px-5 prose-sm sm:prose prose-zinc prose-invert sm:prose-zinc sm:prose-invert overflow-scroll sm:border-l">
                    <MDXRemote source={message.content} />
                </div>
            </div>
        );
    }

    return (
        <main className="w-screen h-screen bg-slate-900">
            <div className="w-full flex-none drop-shadow-lg">
                <Navbar page="chats" />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col w-screen items-center mt-10">
                    {
                        !!chat.instructions ?
                        <div className="px-5 italic text-white text-center justify-center items-center w-screen flex flex-row">Instructions:<p className="p-2 ml-3 bg-gray-700 rounded not-italic">{chat.instructions}</p></div> : ""
                    }
                    {chat.messages.map((x, i) => getMessageHTML(x, i))}
                </div>
            </div>
        </main>

    );
}