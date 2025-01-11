"use client";

import { useState } from "react";
import { Switch, Select, SelectItem, Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FaCircleQuestion } from "react-icons/fa6";

function saveSettings(id, active, channel, msgEdit, msgDel) {
    fetch("/api", {
        method: "POST",
        body: `guilds/save/logging?id=${id}&active=${String(active)}&channelId=${channel ?? "none"}&messageEdit=${String(msgEdit)}&messageDelete=${String(msgDel)}`
    });
}

export default function LoggingPanel({ guild }) {
    const [  active, setActive  ] = useState(guild.database.logging.active);
    const [ channel, setChannel ] = useState(guild.database.logging.channelId);
    const [ msgEdit, setmsgEdit ] = useState(guild.database.logging.messageEdit);
    const [  msgDel, setmsgDel  ] = useState(guild.database.logging.messageDelete);

    let selectOptions = [];

    guild.channels.forEach((c) => {
        if(c.text) selectOptions.push(<SelectItem key={c.id} textValue={"#" + c.name}><p className="text-gray-900">#{c.name}</p></SelectItem>)
    });

    const handleSelectionChange = (e) => {
        setChannel(e.target.value.length != 18 ? "none" : e.target.value);
    }
    
    return (
        <div className="bg-white w-full rounded-md flex flex-col p-5">
            <div className="flex flex-row items-center justify-between">
                <p className="text-3xl font-semibold mb-2.5">📜 Logging</p>
                <Popover placement="bottom" color="foreground">
                    <PopoverTrigger>
                        <FaCircleQuestion className="cursor-pointer" size={24} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="font-light text-black w-40">Logs any message edits or deletions to a specified text channel.</p>
                    </PopoverContent>
                </Popover>
            </div>
            <Switch color="success" isSelected={active}  onValueChange={setActive} className="my-2.5"><p className="text-black">Enable feature</p></Switch>
            <Select className="max-w-xs my-2.5" label="Log channel" isDisabled={!active} onChange={handleSelectionChange} defaultSelectedKeys={[channel]}>
                {selectOptions}
            </Select>
            <Switch isSelected={msgEdit} onValueChange={setmsgEdit} className="my-2.5" isDisabled={!active}><p className="text-black">Log message edits</p></Switch>
            <Switch isSelected={msgDel}  onValueChange={setmsgDel}  className="my-2.5" isDisabled={!active}><p className="text-black">Log message deletes</p></Switch>
            <div className="min-w-full flex flex-col items-end">
                <Button color="warning" variant="ghost" onPress={() => saveSettings(guild.database.guildId, active, channel, msgEdit, msgDel)}>Save</Button>
            </div>
        </div>
    );
}