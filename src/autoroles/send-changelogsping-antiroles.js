module.exports = [{
name: "send-changelogsping-antiroles",
code: `
$apiMessage[$channelID;;{newEmbed:{color:YELLOW}{author:Get notified for the current improvements, changes, etc#COLON#:$serverIcon}{description:
<@&$getVar[ChangelogsPingRole]>
**- Add Role.**
**- Remove Role.**
}};{actionRow:{button:Add Role:success:PingsChangelogsAdd:no:<:add:978749329500172310>}{button:Remove Role:danger:PingsChangelogsRemove:no:<:remove:978749565517832202>}}]

$deleteCommand

$onlyForIDs[$botOwnerID;]
` 
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have given you the role "Ping - Changelogs"**}};;;;yes]

$giveRoles[$guildID;$authorID;$getVar[ChangelogsPingRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[ChangelogsPingRole]]!=true;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You already have this role!**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==PingsChangelogsAdd;]
`
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have removed you the role "Ping - Changelogs"**}};;;;yes]

$takeRoles[$guildID;$authorID;$getVar[ChangelogsPingRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[ChangelogsPingRole]]!=false;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have the role.**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==PingsChangelogsRemove;]
`
}]