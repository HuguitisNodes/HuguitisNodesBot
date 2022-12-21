module.exports = [{
type: "loop",
channel: "1010920749420261488",
executeOnStartup: true,
every: 86400000,
code: `
$appendFile[./Database/ClientCheck/log.txt;> Finished Checking.
;utf8]
$forEachMember[1;{};checkclient;]
`
}, {
name: "checkclient",
type: "awaited",
code: `
$appendFile[./Database/ClientCheck/log.txt;User $userTag ($authorID) is a client.
;utf8]

$giveRoles[$guildID;$authorID;932516472297775125]

$onlyIf[$getObjectProperty[role]==client;]

$let[Remove;$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]

$suppressErrors
`
}]