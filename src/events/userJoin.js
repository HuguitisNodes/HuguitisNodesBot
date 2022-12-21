module.exports = [{
type: "join",
channel: "$getVar[GetStartedChannelID]",
code: `
$deleteIn[10s]
<@$authorID> Get started here ^^

$sendDM[**__Thank you for joining Huguitis Nodes!__**
Here's an infinite invitation in case you ever need it!
> $getVar[OfficialServerInvite];$authorID]

$onlyIf[$getGlobalUserVar[TimesJoined]>=1;]
`
}, {
type: "join",
channel: "$getVar[JoinLogsChannelID]",
code: `
$giveRole[$guildID;$authorID;$getVar[MemberRoleID]]

$addButton[1;Say Hello;primary;SayHello_$authorID_$get[JoinMessage]_$get[JoinID];no;👋]

$color[1;GREEN]
$description[1;
> **$username $get[JoinMessage]**

**- User Tag:** $userTag
**- User ID:** $authorID
**- Creation Date:** $creationDate[$authorID]
**- Times Joined:** $getGlobalUserVar[TimesJoined]]
$thumbnail[1;$authorAvatar]

$let[JoinMessage;$randomText[has joined to the server.;has traversed the server.;has decided to accept an invitation to join this server.;is here, hopefully he brought some popcorn.;has come to visit us, give him a well deserved welcome.]]

$let[JoinID;$random[10000;99999]]

$wait[0.3s]

$setGlobalUserVar[TimesJoined;$sum[$getGlobalUserVar[TimesJoined];1]]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:GREEN}{thumbnail:$userAvatar[$advancedTextSplit[$interactionData[customId];_;2]]}{description:
> **$username[$advancedTextSplit[$interactionData[customId];_;2]] $advancedTextSplit[$interactionData[customId];_;3]**

**- User Tag:** $userTag[$advancedTextSplit[$interactionData[customId];_;2]]
**- User ID:** $advancedTextSplit[$interactionData[customId];_;2]
**- Creation Date:** $creationDate[$advancedTextSplit[$interactionData[customId];_;2]]
**- Times Joined:** $getGlobalUserVar[TimesJoined;$advancedTextSplit[$interactionData[customId];_;2]]

> $username[$advancedTextSplit[$interactionData[customId];_;2]] has been greeted by __$getGlobalUserVar[TimesGreeated;$advancedTextSplit[$interactionData[customId];_;2]]__ users!
}};{actionRow:{button:Say Hello:primary:SayHello_$advancedTextSplit[$interactionData[customId];_;2]_$advancedTextSplit[$interactionData[customId];_;3]_$advancedTextSplit[$interactionData[customId];_;4]:no:👋}}]

$wait[0.3s]

$setGlobalUserVar[TimesGreeated;$sum[$getGlobalUserVar[TimesGreeated;$advancedTextSplit[$interactionData[customId];_;2]];1];$advancedTextSplit[$interactionData[customId];_;2]]

$setLocaleVar[Greeted-$advancedTextSplit[$interactionData[customId];_;2]-$advancedTextSplit[$interactionData[customId];_;4];$authorID;Yes]

$onlyIf[$getLocaleVar[Greeted-$advancedTextSplit[$interactionData[customId];_;2]-$advancedTextSplit[$interactionData[customId];_;4];$authorID;No]!=Yes;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You already greeted that user, you don't want to be annoying, right?**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]!=$authorID;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You can't greet yourself, or yes?**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SayHello;]
`
}]