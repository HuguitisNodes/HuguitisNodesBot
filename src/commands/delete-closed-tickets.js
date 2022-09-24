module.exports = [{
name: "delete-closed-tickets",
code: `
Done.
$forEachGuildChannel[1;{};delete-closed-tickets;]
$onlyForIDs[$botOwnerID;]`
}, {
name: "delete-closed-tickets",
type: "awaited",
code: `$deleteChannel[$channelID]
$onlyIf[$checkContains[$channelName[$channelID];closed-]!=false;]`
}]