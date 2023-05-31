module.exports = [{
name: "sendAutoRoles",
code: `
$addButton[1;News Pings;primary;NewsPings;false]
$addButton[1;Incidents Pings;primary;IncidentsPings;false]
$addButton[1;Changelogs Pings;primary;ChangelogsPings;false]

$color[1;Green]

$thumbnail[1;$guildIcon]

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
$if: "old",
code:`
$if[$hasRoles[$guildID;$authorID;$getVar[NewsPingRoleID]]==true]

$takeRoles[$guildID;$authorID;$getVar[NewsPingRoleID]]
$interactionReply[;{newEmbed:{color:Green}{description: $getVar[SuccessEmoji] **The role "News Pings" has been __deleted__.**}};;;all;true]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==NewsPings;]

$else

$giveRoles[$guildID;$authorID;$getVar[NewsPingRoleID]]
$interactionReply[;{newEmbed:{color:Green}{description: $getVar[SuccessEmoji] **The role "News Pings" has been __added__.**}};;;all;true]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==NewsPings;]

$endIf
`
}, {
type: "interaction",
prototype: "button",
$if: "old",
code:`
$if[$hasRoles[$guildID;$authorID;$getVar[IncidentsPingRoleID]]==true]

$takeRoles[$guildID;$authorID;$getVar[IncidentsPingRoleID]]
$interactionReply[;{newEmbed:{color:Green}{description: $getVar[SuccessEmoji] **The role "Incidents Pings" has been __deleted__.**}};;;all;true]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==IncidentsPings;]

$else

$giveRoles[$guildID;$authorID;$getVar[IncidentsPingRoleID]]
$interactionReply[;{newEmbed:{color:Green}{description: $getVar[SuccessEmoji] **The role "Incidents Pings" has been __added__.**}};;;all;true]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==IncidentsPings;]

$endIf
`
}, {
type: "interaction",
prototype: "button",
$if: "old",
code:`
$if[$hasRoles[$guildID;$authorID;$getVar[ChangelogsPingRoleID]]==true]

$takeRoles[$guildID;$authorID;$getVar[ChangelogsPingRoleID]]
$interactionReply[;{newEmbed:{color:Green}{description: $getVar[SuccessEmoji] **The role "Changelogs Pings" has been __deleted__.**}};;;all;true]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ChangelogsPings;]

$else

$giveRoles[$guildID;$authorID;$getVar[ChangelogsPingRoleID]]
$interactionReply[;{newEmbed:{color:Green}{description: $getVar[SuccessEmoji] **The role "Changelogs Pings" has been __added__.**}};;;all;true]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ChangelogsPings;]

$endIf
`
}]