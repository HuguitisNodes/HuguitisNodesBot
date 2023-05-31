module.exports = [{
type: "join",
channel: "$getVar[LogsChannelID]",
code: `
$thumbnail[1;$authorAvatar]
$color[1;Green]
$description[1;**__User unsuspended:__**

**Discord User:** $userTag
**Discord ID:** $authorID
**ControlPanel ID:** $getObjectProperty[id]
**Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
**Name:** $getObjectProperty[name]
**Credits:** $getObjectProperty[credits]
**Server Limit:** $getObjectProperty[server_limit]
**Email:** ||$getObjectProperty[email]|| 
**IP:** ||$getObjectProperty[ip]||
**Referral Code:** $getObjectProperty[referral_code]

> **__Reason:__ The user joined again to the server.**
]

$setGlobalUserVar[LeaveSuspension;No]

$let[x;$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]

$onlyIf[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID/unsuspend;PATCH;;message;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=You cannot unsuspend an User who is not suspended.]

$onlyIf[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;GET;;role;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=client;]

$onlyIf[$checkContains[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;GET;;message;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}];No query results for model]!=true;]

$onlyIf[$getGlobalUserVar[LeaveSuspension]!=No;]

$suppressErrors
`
}, {
type: "leave",
channel: "$getVar[LogsChannelID]",
code: `
$thumbnail[1;$authorAvatar]
$color[1;Red]
$description[1;**__User suspended:__**

**Discord User:** $userTag
**Discord ID:** $authorID
**ControlPanel ID:** $getObjectProperty[id]
**Pterodactyl ID:** $getObjectProperty[pterodactyl_id]
**Name:** $getObjectProperty[name]
**Credits:** $getObjectProperty[credits]
**Server Limit:** $getObjectProperty[server_limit]
**Email:** ||$getObjectProperty[email]|| 
**IP:** ||$getObjectProperty[ip]||
**Referral Code:** $getObjectProperty[referral_code]

> **__Reason:__ The user left the server.**
]

$setGlobalUserVar[LeaveSuspension;Yes]

$let[x;$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]

$onlyIf[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID/suspend;PATCH;;message;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=You cannot suspend an User who is suspended.]

$onlyIf[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;GET;;role;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=client;]

$onlyIf[$checkContains[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;GET;;message;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}];No query results for model]!=true;]

$onlyIf[$getGlobalUserVar[LeaveSuspension]!=Yes;]

$suppressErrors
`
}]