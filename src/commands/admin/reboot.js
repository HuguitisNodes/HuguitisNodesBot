module.exports = ({
name: "reboot",
aliases: "restart",
code: `
$reboot[Index.js]
$sendMessage[**⚠️ Warning ⚠️**:**\`\`\`
Manual Reboot has started by $userTag[$authorID]!! Now i will stop to respond to all commands for 5seconds - 1min!\`\`\`**]
$onlyForIDs[$getVar[OwnerID];** Only $username[$getVar[OwnerID]] can perform this action!!**]`
});
