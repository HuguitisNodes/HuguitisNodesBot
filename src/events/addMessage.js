module.exports = [{
name: "$alwaysExecute",
code: `
$onlyIf[$getGlobalUserVar[MessagesSent]!=10000;{execute:10000MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=3000;{execute:3000MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=1000;{execute:1000MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=500;{execute:500MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=300;{execute:300MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=100;{execute:100MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=50;{execute:50MessagesReward}]
$onlyIf[$getGlobalUserVar[MessagesSent]!=10;{execute:10MessagesReward}]
$wait[0.3s]
$setGlobalUserVar[MessagesSent;$sum[$getGlobalUserVar[MessagesSent];1]]
$setGlobalUserVar[Coins;$sum[$getGlobalUserVar[Coins];$random[1;5]]]
$cooldown[0.5s;]
$onlyForServers[$getVar[OfficialServerID];]
`
}, {
name: "10MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 10 messages in total!]
<@$authorID>; You have sent 10 messages in total, cool.
`
}, {
name: "50MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 50 messages in total!]
<@$authorID>; You have sent 50 messages in total, you are so active!
`
}, {
name: "100MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 100 messages in total!]
<@$authorID>; You have sent 100 messages in total, amazing!
`
}, {
name: "300MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 300 messages in total!]
<@$authorID>; You have sent 300 messages in total! Thanks for being so active :)
`
}, {
name: "500MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 500 messages in total!]
<@$authorID>; You have sent 500 messages in total. That's a lot, you should take a break.
`
}, {
name: "1000MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 1000 messages in total!]
<@$authorID>; You have sent 1000 messages??? It looks like it is... Woah.
`
}, {
name: "3000MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 3000 messages in total!]
<@$authorID>; 3000 messages, you should stop.
`
}, {
name: "10000MessagesReward",
type: "awaited",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user <@$authorID> sent 10000 messages in total!]
<@$authorID>; You have definitely sent here 10000 messages.
We greatly appreciate your effort and everything you dedicate to this server. You will always be identified here as a great user.
My respects!
`
}]
