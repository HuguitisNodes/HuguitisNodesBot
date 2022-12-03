module.exports = [{
type: "join",
channel: "$getVar[GetStartedChannel]",
code: `
$deleteIn[10s]
<@$authorID> Get started here ^^
$giveRole[$guildID;$authorID;$getVar[MemberRole]]
$onlyForServers[$getVar[OfficialServerID];]
`
}, {
type: "join",
channel: "$getVar[AutoRolesChannel]",
code: `
$deleteIn[10s]
<@$authorID> Get your roles here ^^
$onlyForServers[$getVar[OfficialServerID];]
`
}, {
type: "join",
channel: "$getVar[JoinLogsChannel]",
code: `
$sendDM[**__Thank you for joining Huguitis Nodes!__**
- If you want to create a free server for your bot, database, etc: https://panel.huguitisnodes.host
- If you need help you can create a ticket or ask on the forum channel.

> Here's an infinite invitation in case you ever need it!
> https://discord.gg/CVbPZRt9yG;$authorID]

$color[1;GREEN]
$description[1;
**__$userTag has joined to the server!__**

> **ID:** $authorID
> **Creation Date:** $creationDate[$authorID]
> **Times Joined:** $getGlobalUserVar[TimesJoined]
]
$thumbnail[1;$authorAvatar]
$footer[1;Say hello!]
$wait[0.3s]
$setGlobalUserVar[TimesJoined;$sum[$getGlobalUserVar[TimesJoined];1]]
$onlyForServers[$getVar[OfficialServerID];]
`
}]
