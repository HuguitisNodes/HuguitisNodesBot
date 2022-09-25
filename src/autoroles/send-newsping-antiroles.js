module.exports = [{
name: "send-newsping-antiroles",
code: `
$apiMessage[$channelID;;{newEmbed:{color:YELLOW}{author:Get notified for the next news, giveaways, offers, etc#COLON#:$serverIcon}{description:
<@&$getVar[NewsPingRole]>
**- Add Role.**
**- Remove Role.**
}};{actionRow:{button:Add Role:success:PingsAdd:no:<:add:978749329500172310>}{button:Remove Role:danger:PingsRemove:no:<:remove:978749565517832202>}}]

$deleteCommand

$onlyForIDs[$getVar[OwnerID];]
` 
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have given you the role "Ping - News"**}};;;;yes]

$giveRoles[$guildID;$authorID;$getVar[NewsPingRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[NewsPingRole]]!=true;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You already have this role!**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==PingsAdd;]
`
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have removed you the role "Ping - News"**}};;;;yes]

$takeRoles[$guildID;$authorID;$getVar[NewsPingRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[NewsPingRole]]!=false;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have the role.**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==PingsRemove;]
`
}]