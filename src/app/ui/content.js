import Guilds from "../dashboard/main/guilds";
import Timers from "../dashboard/main/timers";
import Chats from "../dashboard/main/chats";

export default function Content({ page, headers }) {
    switch(page) {
        case "guilds":
            return (<Guilds headers={headers} />);
        case "timers":
            return (<Timers headers={headers} />);    
        case "chats":
            return (<Chats headers={headers} />);    
    }
}