module.exports = [{
name: "$alwaysExecute",
code: `
<@$authorID>; Imagine pinging Huguitis __$getGlobalUserVar[HuguitisPinged]__ times.
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=100;{execute:100PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=50;{execute:50PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=30;{execute:30PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=15;{execute:15PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=10;<@$authorID>, you've already been mentioning Huguitis 10 times, do you have an obsession with him?]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=5;<@$authorID>, you should stop mentioning Huguitis, you've already mentioned him 5 times.]
$wait[0.3s]
$setGlobalUserVar[HuguitisPinged;$sum[$getGlobalUserVar[HuguitisPinged];1]]
$onlyIf[$checkContains[$message;<@759796588842450944>]!=false;]`
}, {
name: "15PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned Huguitis 15 times in total!]
<@$authorID>; 15 times mentioning Huguitis... Did you want a prize or something? Well, you've done it, look at your roles.
`
}, {
name: "30PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned Huguitis 30 times in total!]
<@$authorID>; Already 30 times, I have given you another role so that you shut up.
`
}, {
name: "50PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned Huguitis 50 times in total!]
<@$authorID>; This is getting out of control, Huguitis must be fed up with so many mentions of you!
`
}, {
name: "100PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned Huguitis 100 times in total!]
<@$authorID>; I honestly don't know what more you want, but you've got another role, so that's fine, I guess...
`
}]