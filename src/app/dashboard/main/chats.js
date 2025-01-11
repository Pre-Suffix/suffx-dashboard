import { fetchEndpoint } from "@/utils/api";
import { FaAngleDoubleRight  } from "react-icons/fa";

export default async function Chats({ headers }) {
    const chats = await fetchEndpoint(headers, "chats/list");

    if(chats.length < 1) {
        return (
            <div className="w-screen text-center">
                <p className="my-10 text-2xl font-bold">You don't have any chats! Use the <code className="p-2 bg-gray-700 rounded">/chat send</code> command with the bot to start a conversation.</p>
            </div>
        );
    }

    const getDateString = (ts) => {
        const date = new Date(0);
        date.setUTCMilliseconds(ts * 1000);
        return date.toUTCString().slice(4, -7) + " UTC";
    }

    const getChatHTML = (chat, index) => {
        return (
            <div key={chat.uuid} className={
                "relative rounded w-full mn:w-4/6 p-5 flex flex-row gap-4 text-black items-center "
                + (chat.active ? "bg-green-400" : "bg-white")
            }>
                <p className="bg-slate-300 p-3 rounded-full text-4xl font-bold">{index + 1}</p>
                <div className="ml-2 flex flex-col h-full w-full justify-center items-center">
                    <div className="flex flex-row text-sm font-bold items-center">Last message:
                        <p className="ml-2 p-1 rounded bg-gray-700 italic text-white px-2 text-lg font-normal">{chat.lastMessage}</p>
                    </div>
                    <a href={"/dashboard/chats/" + chat.uuid}>
                        <div className="mx-10 mt-5 mb-8 sm:mb-5 mn:mb-0 bg-indigo-600 hover:bg-indigo-700 rounded-lg p-4 text-white transition-color duration-100 flex flex-row items-center gap-2">Read <FaAngleDoubleRight  /></div>
                    </a>
                </div>
                <div className="text-sm absolute bottom-2 right-3">Started: {getDateString(chat.created)}{chat.active ? " • Active chat" : ""}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col my-5 mx-10 gap-10 w-screen text-center items-center">
            {chats.map((x, i) => getChatHTML(x, i))}
        </div>
    );
}