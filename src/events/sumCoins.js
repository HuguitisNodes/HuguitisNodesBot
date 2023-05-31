module.exports = [{
name: "$alwaysExecute",
code: `
$setGlobalUserVar[MessagesSent;$sum[$getGlobalUserVar[MessagesSent];1]]

$if[$isBoosting==true;{execute:IsBoostingCredits};{execute:IsNotBoostingCredits}]

$cooldown[0.5s;]

$onlyIf[$userExists!=false;]
`
}, {
name: "IsBoostingCredits",
type: "awaited",
code: `
$setGlobalUserVar[Coins;$sum[$getGlobalUserVar[Coins];$random[5;10]]]

$onlyIf[$checkContains[$message;h!]!=true;]
`
}, {
name: "IsNotBoostingCredits",
type: "awaited",
code: `
$setGlobalUserVar[Coins;$sum[$getGlobalUserVar[Coins];$random[1;5]]]

$onlyIf[$checkContains[$message;h!]!=true;]
`
}]