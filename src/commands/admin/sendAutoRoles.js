module.exports = [{
name: "sendAutoRoles",
code: `
$addButton[1;News Pings;primary;NewsPings;no]
$addButton[1;Incidents Pings;primary;IncidentsPings;no]
$addButton[1;Changelogs Pings;primary;ChangelogsPings;no]

$color[1;GREEN]

$thumbnail[1;$serverIcon]

$description[1;> **__Pick your roles:__**

**- Changelogs Pings:** Get notified for the current improvements, changes, etc.
**- Incidents Pings:** Get notified for the current problems, incidents, etc.
**- News Pings:** Get notified for the next news, giveaways, offers, etc.]

$deleteCommand

$onlyForIDs[$joinSplitText[;];]
$textSplit[$getVar[StaffIDs];, ]
` 
}, {
type: "interaction",
prototype: "button",
$if: "v4",
code:`
$if[$hasRoles[$guildID;$authorID;$getVar[NewsPingRoleID]]==true]

$takeRoles[$guildID;$authorID;$getVar[NewsPingRoleID]]
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **The role "News Pings" has been __deleted__.**}};;;;yes]

$else

$giveRoles[$guildID;$authorID;$getVar[NewsPingRoleID]]
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **The role "News Pings" has been __added__.**}};;;;yes]

$endIf

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==NewsPings;]
`
}, {
type: "interaction",
prototype: "button",
$if: "v4",
code:`
$if[$hasRoles[$guildID;$authorID;$getVar[IncidentsPingRoleID]]==true]

$takeRoles[$guildID;$authorID;$getVar[IncidentsPingRoleID]]
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **The role "Incidents Pings" has been __deleted__.**}};;;;yes]

$else

$giveRoles[$guildID;$authorID;$getVar[IncidentsPingRoleID]]
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **The role "Incidents Pings" has been __added__.**}};;;;yes]

$endIf

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==IncidentsPings;]
`
}, {
type: "interaction",
prototype: "button",
$if: "v4",
code:`
$if[$hasRoles[$guildID;$authorID;$getVar[ChangelogsPingRoleID]]==true]

$takeRoles[$guildID;$authorID;$getVar[ChangelogsPingRoleID]]
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **The role "Changelogs Pings" has been __deleted__.**}};;;;yes]

$else

$giveRoles[$guildID;$authorID;$getVar[ChangelogsPingRoleID]]
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **The role "Changelogs Pings" has been __added__.**}};;;;yes]

$endIf

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ChangelogsPings;]
`
}]