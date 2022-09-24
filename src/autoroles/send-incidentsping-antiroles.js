module.exports = [{
name: "send-incidentsping-antiroles",
code: `
$apiMessage[$channelID;;{newEmbed:{color:YELLOW}{author:Get notified for the current problems, incidents, etc#COLON#:$serverIcon}{description:
<@&$getVar[IncidentPingRole]>
**- Add Role.**
**- Remove Role.**
}};{actionRow:{button:Add Role:success:PingsIncidentsAdd:no:<:add:978749329500172310>}{button:Remove Role:danger:PingsIncidentsRemove:no:<:remove:978749565517832202>}}]

$deleteCommand

$onlyForIDs[$botOwnerID;]
` 
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have given you the role "Ping - Incidents"**}};;;;yes]

$giveRoles[$guildID;$authorID;$getVar[IncidentPingRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[IncidentPingRole]]!=true;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You already have this role!**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==PingsIncidentsAdd;]
`
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have removed you the role "Ping - Incidents"**}};;;;yes]

$takeRoles[$guildID;$authorID;$getVar[IncidentPingRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[IncidentPingRole]]!=false;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have the role.**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==PingsIncidentsRemove;]
`
}]