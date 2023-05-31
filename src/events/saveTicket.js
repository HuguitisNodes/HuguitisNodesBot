module.exports = ({
name: "$alwaysExecute",
code: `
$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $getChannelVar[TicketOwner] - $channelID.txt;[$formatDate[$dateStamp] | $hour:$minute:$second] $userTag ($authorID): $message
;utf8]

$timezone[Europe/Madrid]

$onlyIf[$getChannelVar[TicketOpened]!=No;]
$onlyIf[$getChannelVar[TicketChannel]!=No;]
`
})