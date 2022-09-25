module.exports = [{
name: "$alwaysExecute",
code: `
<@$authorID>; Imagine pinging $username[$getVar[OwnerID]] __$getGlobalUserVar[HuguitisPinged]__ times.
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=100;{execute:100PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=50;{execute:50PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=30;{execute:30PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=15;{execute:15PingsReward}]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=10;<@$authorID>, you've already been mentioning $username[$getVar[OwnerID]] 10 times, do you have an obsession with him?]
$onlyIf[$getGlobalUserVar[HuguitisPinged]!=5;<@$authorID>, you should stop mentioning $username[$getVar[OwnerID]], you've already mentioned him 5 times.]
$wait[0.3s]
$setGlobalUserVar[HuguitisPinged;$sum[$getGlobalUserVar[HuguitisPinged];1]]
$onlyIf[$checkContains[$message;<@$getVar[OwnerID]>]!=false;]`
}, {
name: "15PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned $username[$getVar[OwnerID]] 15 times in total!]
<@$authorID>; 15 times mentioning $username[$getVar[OwnerID]]...
`
}, {
name: "30PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned $username[$getVar[OwnerID]] 30 times in total!]
<@$authorID>; Already 30 times pinging him.
`
}, {
name: "50PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned $username[$getVar[OwnerID]] 50 times in total!]
<@$authorID>; This is getting out of control, $username[$getVar[OwnerID]] must be fed up with so many mentions of you!
`
}, {
name: "100PingsReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> mentioned $username[$getVar[OwnerID]] 100 times in total!]
<@$authorID>; I honestly don't know what more you want, you pinged it 100 times...
`
}]