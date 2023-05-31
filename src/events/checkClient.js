module.exports = [{
type: "loop",
channel: "1104669519223468103",
executeOnStartup: true,
every: 3600000,
code: `
$forEachMember[1;{};checkclient;]
`
}, {
name: "checkclient",
type: "awaited",
code: `
$appendFile[./Database/ClientCheck/log.txt;User $userTag ($authorID) is a client.
;utf8]

$giveRole[$guildID;$authorID;932516472297775125]

$onlyIf[$getObjectProperty[role]==client;]

$let[Remove;$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]

$suppressErrors
`
}]