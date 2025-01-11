import Navbar from "@/app/ui/navbar";
import { fetchEndpoint } from "@/utils/api";
import { headers } from "next/headers";
import LoggingPanel from "./Logging";
import ServerInfo from "./Serverinfo";
import AutorolePanel from "./Autorole";
import LevelrolePanel from "./LevelRole";

export default async function ServerDashboard({ params }) {
    const Headers = await headers();  
    const status = await fetchEndpoint(Headers, "auth/status");
  
    if(status.error) return (
      <script>window.location.href = "/";</script>
    )

    const id = (await params).id;
    const guild = await fetchEndpoint(Headers, "guilds/get?id=" + id);

    if(guild.error || !guild.discord || !guild.database) return (
        <main className="w-screen h-screen bg-slate-900">
            <div className="w-full flex-none drop-shadow-lg">
                <Navbar page="guilds" />
            </div>
            <div className="w-screen text-center">
                <p className="my-10 text-2xl font-bold">Invalid Server.</p>
            </div>
        </main>
    );

    // flex flex-col mn:flex-row mt-10 mx-5 gap-5 md:mx-10 md:gap-10
    return (
        <main className="w-screen h-screen bg-slate-900">
            <div className="w-full flex-none drop-shadow-lg">
                <Navbar page="guilds" />
            </div>
            <div className="flex flex-col">
               <div className="w-screen overflow-hidden h-64 bg-[#313338] flex flex-row items-center relative">
                    {guild.discord.bannerURL ? <img src={guild.discord.bannerURL} className="aspect-auto w-screen" /> : ""}
                    <div className="absolute w-screen h-full items-center text-center justify-center flex">
                        <p className="text-3xl mx-5 sm:text-4xl md:text-6xl bg-black/50 p-5 rounded backdrop-blur-sm drop-shadow-sm">{guild.database.guild.name}</p>
                    </div>
               </div>
               <div className="flex flex-col mn:flex-row mt-10 mx-5 gap-5 mn:mx-10 mn:gap-10 text-black">
                    <ServerInfo guild={guild} />
                    <LoggingPanel guild={guild} />
                    <LevelrolePanel guild={guild} />
                    <AutorolePanel guild={guild} />
                </div>
            </div>
        </main>

    );
}