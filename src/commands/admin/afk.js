module.exports = [{
name: "afk",
code: `
$description[1;
**Now you are afk for the reason:** "$message"
]
$color[1;GREEN]
$setGlobalUserVar[AFK;Yes]
$setGlobalUserVar[AFKReason;$message]

$argsCheck[>0;]

$onlyIf[$getGlobalUserVar[AFK]!=Yes;You are already afk, to change your afk reason run **$getVar[Prefix]remove-afk** and run again this command.]
$onlyForIDs[763471049894527006;752699129683247154;688693850180812856;967904098047381587;$getVar[OwnerID];You are not staff.]`
}, {
name: "$alwaysExecute",
code: `
$description[1;**__$username[$mentioned[1;no]]__ is afk for this reason:** $getGlobalUserVar[AFKReason;$mentioned[1;no]]

> Please do not ping him and be pacient.]
$color[1;RED]
$onlyIf[$getGlobalUserVar[AFK;$mentioned[1;no]]!=No]
`
}, {
name: "remove-afk",
code: `
Done.

$setGlobalUserVar[AFK;No]
$setGlobalUserVar[AFKReason;None.]

$onlyIf[$getGlobalUserVar[AFK]!=No;You are not afk.]
$onlyForIDs[763471049894527006;752699129683247154;688693850180812856;967904098047381587;$getVar[OwnerID];You are not staff.]
`
}]
