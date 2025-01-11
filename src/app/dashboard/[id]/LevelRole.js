"use client";

import { Popover, PopoverTrigger, PopoverContent, Button, Select, SelectItem, Input, Form } from "@nextui-org/react";
import { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";

export default function LevelrolePanel({ guild }) {
    const [ roles, setRoles ] = useState(guild.database.levelRoles);
    const [ add, setAdd ] = useState("");
    const [ rem, setRem ] = useState("");
    const [ lvl, setLvl ] = useState(1);

    const getRoles = () => {
        if((roles ?? []).length == 0) return [
            <div key="nul" style={{color: "#000000"}}>
                No roles added.
            </div>
        ];

        let resp = [];

        roles.forEach((x) => {
            let role = guild.roles.find((r) => r.id == x.roleId);
            if(!role) return;

            resp.push(
                <div key={role.id} style={{color: role.color}}>
                    @{role.name} • Level {x.level}
                </div>
            );
        });

        return resp;
    }

    const getNewRoles = () => {
        let resp = [];

        guild.roles.forEach((role) => {
            if(!role.everyone && !roles.find((x) => x.roleId == role.id) && !role.above) 
                resp.push(<SelectItem key={role.id} textValue={"@" + role.name}><p style={{color: role.color}}>@{role.name}</p></SelectItem>);
        });
        return resp;
    }

    const getCurRoles = () => {
        let resp = [];

        roles.forEach((r) => {
            let role = guild.roles.find((x) => x.id == r.roleId);

            if(role) resp.push(<SelectItem key={role.id} textValue={"@" + role.name}><p style={{color: role.color}}>@{role.name}</p></SelectItem>);
        });
        return resp;
    }

    let invalidInput = false;

    if(lvl < 1) invalidInput = "Level number has to be greater than 0.";
    else if(roles.find((x) => x.level == lvl)) invalidInput = "There is already a role with that level number";

    const addRole = (guildId, roleId, level) => {
        if(invalidInput || !guildId || !roleId || !level) return;

        setRoles([ ...roles, { roleId, level }]);

        fetch("/api", {
            method: "POST",
            body: `guilds/save/levelrole?id=${guildId}&roleId=${roleId}&level=${level}&add=true`
        });
    }

    const removeRole = (guildId, roleId) => {
        if(!guildId || !roleId) return;

        let r = [];
        roles.forEach((x) => { if(x.roleId != roleId) r.push(x); })
        setRoles(r);

        fetch("/api", {
            method: "POST",
            body: `guilds/save/levelrole?id=${guildId}&roleId=${roleId}&add=false`
        });
    }

    return (
        <div className="bg-white w-full rounded-md flex flex-col p-5">
            <div className="flex flex-row items-center justify-between">
                <p className="text-3xl font-semibold mb-2.5">🌟 Level Roles</p>
                <Popover placement="bottom" color="foreground">
                    <PopoverTrigger>
                        <FaCircleQuestion className="cursor-pointer" size={24} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <p className="font-light text-black w-40">Gives a specified role to any user once they pass a specified level on the bot's XP system.</p>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="my-2 bg-gray-100 p-3 rounded-md">
                <p className="font-bold text-lg border-b-2 border-gray-500 pb-1 mb-1">Roles:</p>
                {getRoles()}
            </div>
            <div className="flex flex-row items-center justify-between my-2">
                <div className="flex flex-row items-center justify-between w-full gap-6 bg-gray-200 p-2 rounded-md drop-shadow-md">
                    <div className="flex flex-col w-full gap-2">
                        <Select label="Select role" onChange={(e) => {setAdd(e.target.value)}} >
                            {getNewRoles()}
                        </Select>
                        <Input label="Level" labelPlacement="inside" type="number" onValueChange={setLvl} value={lvl} isInvalid={!!invalidInput} errorMessage={invalidInput} />
                    </div>
                    <Button color="primary" variant="solid" onPress={() => addRole(guild.database.guildId, add, lvl)}>Add</Button>
                </div>
            </div>
            <div className="flex flex-row items-center gap-2 my-2.5 w-full">
                <Select className="max-w-xs" label="Remove role" isDisabled={getCurRoles().length == 0} onChange={(e) => {setRem(e.target.value)}} >
                    {getCurRoles()}
                </Select>
                <Button color="danger" variant="solid" onPress={() => removeRole(guild.database.guildId, rem)} isDisabled={getCurRoles().length == 0}>Remove</Button>
            </div>
        </div>
    );
}