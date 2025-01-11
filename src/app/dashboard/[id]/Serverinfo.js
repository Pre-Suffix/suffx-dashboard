import { FaClockRotateLeft, FaUserGroup, FaHashtag, FaFaceGrinWide, FaNoteSticky, FaUserTie } from "react-icons/fa6";

function getServerImage(iconURL, nameAcronym) {
    if(!String(iconURL).startsWith("https://"))
        return (
            <div className="rounded-full min-w-16 min-h-16 max-h-16 max-w-16 bg-gray-600 flex items-center justify-center text-white text-xl">{nameAcronym}</div>
        );

    return (
        <img src={iconURL} className="rounded-full min-w-16 min-h-16 max-h-16 max-w-16" alt="Server icon"></img>
    );
}

const getDateString = (ts) => {
    const date = new Date(0);
    date.setUTCMilliseconds(ts * 1000);
    return date.toUTCString().slice(4, -7) + " UTC";
}

export default function ServerInfo({ guild }) {
    return (
        <div className="bg-white rounded-md w-full flex-col p-5">
            <div className="flex flex-row gap-5 items-center align-middle mb-5">
                {getServerImage(guild.discord.iconURL, guild.discord.nameAcronym)}
                <p className="text-3xl font-semibold">ℹ️ Server Info</p>
            </div>
            <div className="flex flex-row items-center my-3">
                <FaClockRotateLeft />
                <p className="font-bold mx-2">Created:</p>
                {getDateString(guild.discord.createdTimestamp / 1000)}
            </div>
            <div className="flex flex-row items-center my-3">
                <FaUserGroup />
                <p className="font-bold mx-2">Member Count:</p>
                {guild.discord.memberCount + " users"}
            </div>
            <div className="flex flex-row items-center my-3">
                <FaHashtag />
                <p className="font-bold mx-2">Channel Count:</p>
                {guild.discord.channels.length + " channels"}
            </div>
            <div className="flex flex-row items-center my-3">
                <FaFaceGrinWide />
                <p className="font-bold mx-2">Emoji Count:</p>
                {guild.discord.emojis.length + " emojis"}
            </div>
            <div className="flex flex-row items-center my-3">
                <FaNoteSticky />
                <p className="font-bold mx-2">Sticker Count:</p>
                {guild.discord.stickers.length + " stickers"}
            </div>
            <div className="flex flex-row items-center mt-3">
                <FaUserTie />
                <p className="font-bold mx-2">Role Count:</p>
                {guild.discord.roles.length + " roles"}
            </div>
        </div>
    );
}