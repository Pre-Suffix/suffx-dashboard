import Image from 'next/image';

export default function Navbar({ page }) {
    const highlighted = (name) => {
        return name == page ? " text-blue-600" : "";
    }

    return (
        <nav className="py-5 bg-background drop-shadow-xl">
            <div className="flex flex-row gap-5 items-center">
                <a href="/dashboard/" className="hover:underline border-r ml-5 pr-5 w-40 md:w-fit">
                    <div className="flex gap-2 items-center">
                        <Image
                            src="/suffx_logo.png"
                            width={24}
                            height={24}
                            alt="SuffX Logo"
                            priority
                        />
                        SuffX Dashboard
                    </div>
                </a>
                <div className="md:grid-rows-1 md:grid-cols-5 grid-cols-2 grid-rows-2 grid">
                    <a href="/dashboard/" className={"hover:underline hover:text-sky-500 transition-color duration-100 ml-0 m-2.5" + highlighted("guilds")}>Servers</a>
                    <a href="/dashboard/timers" className={"hover:underline hover:text-sky-500 transition-color duration-100 m-2.5" + highlighted("timers")}>Timers</a>
                    <a href="/dashboard/chats"  className={"hover:underline hover:text-sky-500 transition-color duration-100 m-2.5" + highlighted("chats")}>Chats</a>
                </div>
            </div>
        </nav>
    );
}