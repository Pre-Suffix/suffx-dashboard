"use client";

import { useState } from "react";
import { Switch, Popover, PopoverContent, PopoverTrigger, Button, Select, SelectItem } from "@nextui-org/react";
import { FaCircleQuestion } from "react-icons/fa6";

export default function AutorolePanel({ guild }) {
    const [ roles, setRoles ] = useState(guild.database.autoRoles);
    const [ keep, setKeep ] = useState(guild.database.keepRoles);
    const [ add, setAdd ] = useState("");
    const [ rem, setRem ] = useState("");

    const getRoles = () => {
        if((roles ?? []).length == 0) return [{name: "No roles added.", id: "nul", color: "#000000"}];

        return roles.map((x) => { return guild.roles.find((r) => r.id == x)});
    }

    const getNewRoles = () => {
        let resp = [];

        guild.roles.forEach((role) => {
            if(!role.everyone && !roles.includes(role.id) && !role.above) 
                resp.push(<SelectItem key={role.id} textValue={"@" + role.name}><p style={{color: role.color}}>@{role.name}</p></SelectItem>);
        });
        return resp;
    }

    const getCurRoles = () => {
        let resp = [];

        roles.forEach((r) => {
            let role = guild.roles.find((x) => x.id == r);

            if(role) resp.push(<SelectItem key={role.id} textValue={"@" + role.name}><p style={{color: role.color}}>@{role.name}</p></SelectItem>);
        });
        return resp;
    }

    const saveSettings = (id, roleId, add) => {
        if(!roleId) return;
        else if(roleId && add && roles.includes(roleId)) return;
        else if(roleId && !add && !roles.includes(roleId)) return;
        
        if(add)
            setRoles([...roles, roleId]);
        else {
            let r = [];
            roles.forEach((x) => { if(x != roleId) r.push(x); });

            setRoles(r);
        }

        fetch("/api", {
            method: "POST",
            body: `guilds/save/autorole?id=${id}&roleId=${roleId}&add=${String(add)}`
        });
    }

    const roleKeeping = (id) => {
        setKeep(!keep);

        fetch("/api", {
            method: "POST",
            body: `guilds/save/rolekeep?id=${id}&active=${String(!keep)}`
        });
    }

    return (
        <div className="bg-white w-full rounded-md flex flex-col p-5">
            <div className="flex flex-row items-center justify-between">
                <p className="text-3xl font-semibold mb-2.5">🆕 Autoroles</p>
                <Popover placement="bottom" color="foreground">
                    <PopoverTrigger>
                        <FaCircleQuestion className="cursor-pointer" size={24} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="font-light text-black w-40">Automatically give roles from a defined list to new users.</p>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="my-2 bg-gray-100 p-3 rounded-md">
                <p className="font-bold text-lg border-b-2 border-gray-500 pb-1 mb-1">Roles:</p>
                {getRoles().map((x) => {
                    return (
                        <div key={x.id} style={{color: x.color}}>
                            {x.id != "nul" ? "@" : ""}{x.name}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-row items-center gap-2 my-2">
                <Select className="max-w-xs" label="Add new role" onChange={(e) => {setAdd(e.target.value)}} >
                    {getNewRoles()}
                </Select>
                <Button color="primary" variant="solid" onPress={() => saveSettings(guild.database.guildId, add, true)}>Add</Button>
            </div>
            <div className="flex flex-row items-center gap-2 my-2.5">
                <Select className="max-w-xs" label="Remove role" isDisabled={getCurRoles().length == 0} onChange={(e) => {setRem(e.target.value)}} >
                    {getCurRoles()}
                </Select>
                <Button color="danger" variant="solid" onPress={() => saveSettings(guild.database.guildId, rem, false)} isDisabled={getCurRoles().length == 0}>Remove</Button>
            </div>
            <div className="flex flex-row items-center gap-3">
                <Switch color="success" className="mt-2.5" isSelected={keep} onValueChange={() => roleKeeping(guild.database.guildId)}><p className="text-black">Enable rolekeeping</p></Switch>
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <FaCircleQuestion className="cursor-pointer mt-2.5" size={20} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="font-light text-black w-40">Automatically gives to any user re-joining the server the roles they had before leaving.</p>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}