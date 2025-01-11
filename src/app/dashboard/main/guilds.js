import { fetchEndpoint } from "@/utils/api";
import { FaGear } from "react-icons/fa6";

function getServerImage(iconURL) {
    if(!iconURL.startsWith("https://"))
        return (
            <div className="rounded-full min-w-32 min-h-32 bg-gray-600 flex items-center justify-center text-white text-3xl">{iconURL}</div>
        );

    return (
        <img src={iconURL} className="rounded-full min-w-32 min-h-32" alt="Server icon"></img>
    );
}

export default async function Guilds({ headers }) {
    const guilds = await fetchEndpoint(headers, "guilds");

    if(guilds.length < 1) {
        return (
            <div className="w-screen text-center">
            <p className="my-10 text-2xl font-bold">You're not admin in any servers.</p>
        </div>
        );
    }

    const getGuildHTML = (guild) => {
        return (
            <div key={guild.guildId} className="rounded bg-white text-black p-5 w-full mn:w-3/4 h-64 flex mt-5">
                <div className="flex flex-row gap-2 items-center m-auto w-full">
                    {getServerImage(guild.guild.iconURL)}
                    <div className="flex flex-col w-full">
                        <p className="text-3xl">{guild.guild.name}</p>
                        <div className="grid grid-cols-1 mt-10 gap-5 w-full">
                            <a href={"/dashboard/" + guild.guildId}>
                                <div className="mx-10 bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg text-white text-lg transition-color duration-100 items-center flex flex-row gap-2 justify-center"><FaGear size={24} /> Manage</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid m-5 gap-10 mn:grid-cols-2 grid-cols-1 w-screen text-center place-items-center">
            {guilds.map((x) => getGuildHTML(x))}
        </div>
    );
}