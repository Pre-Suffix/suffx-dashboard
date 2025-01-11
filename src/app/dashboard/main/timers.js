import { fetchEndpoint } from "@/utils/api";

export default async function Timers({ headers }) {
    const timers = await fetchEndpoint(headers, "timers");

    if(timers.length < 1) {
        return (
            <div className="w-screen text-center">
                <p className="my-10 text-2xl font-bold">You don't have any upcoming timers! Use the <code className="p-2 bg-gray-700 rounded">/timer set</code> command with the bot to set a timer.</p>
            </div>
        );
    }

    const getDateString = (ts) => {
        const date = new Date(0);
        date.setUTCMilliseconds(ts * 1000);
        return date.toUTCString().slice(4, -7) + " UTC";
    }

    const getReminder = (reminder) => {
        if(!reminder) return "";
        return (
            <div className="ml-2 p-1 rounded bg-gray-700 italic text-white px-2 mn:text-lg font-normal">
                {reminder}
            </div>
        )
    }

    const getDuration = (setoffTS) => {
        const duration = setoffTS - Math.floor(Date.now() / 1000);

        if(duration >= 86400) return Math.floor(duration / 86400) + " day" + (Math.floor(duration / 86400) > 1 ? "s" : "");
        else if(duration >= 3600) return Math.floor(duration / 3600) + " hour" + (Math.floor(duration / 3600) > 1 ? "s" : "");
        else if(duration >= 60) return Math.floor(duration / 60) + " minute" + (Math.floor(duration / 60) > 1 ? "s" : "");
        
        return duration + " second" + (duration > 1 ? "s" : "");
    }

    const getTimerHTML = (timer, index) => {
        return (
            <div key={timer._id} className="bg-white relative rounded w-full mn:w-4/6 p-5 flex flex-row gap-4 text-black items-center">
                <p className="bg-slate-300 p-3 rounded-full text-4xl font-bold">{index + 1}</p>
                <div className="mb-8 sm:mb-5 mn:mb-0 ml-2 flex flex-col h-full w-full justify-center items-center gap-3">
                    <div className="text-lg">Ends in {getDuration(timer.setoffTS)} ({getDateString(timer.setoffTS).slice(1)}){
                        timer.inDM ? " • Direct Message" : ""   
                    }</div>
                    {getReminder(timer.reminder)}
                </div>
                <div className="text-sm absolute bottom-2 right-3">Created: {getDateString(timer.regTS)}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col my-5 mx-10 gap-10 w-screen text-center items-center">
            {timers.map((x, i) => getTimerHTML(x, i))}
        </div>
    )
}