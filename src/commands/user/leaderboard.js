module.exports = [{
name: "leaderboard",
code: `
$editMessage[$get[id];{newEmbed:{description:**__Amount of times mentioning $username[$getVar[OwnerID]]__:**
$globalUserLeaderboard[HuguitisPinged;asc;**{top}: {username}** - {value} times.]

**__Amount of messages sent__:**
$globalUserLeaderboard[MessagesSent;asc;**{top}: {username}** - {value} messages.]

**__Amount of coins__:**
$globalUserLeaderboard[Coins;asc;**{top}: {username}** - {value} coins.]}{color:GREEN}}]
    
$let[id;$sendMessage[{
"embeds" : "{newEmbed:{description:$getVar[LoadingEmoji] **Loading...**}{color:YELLOW}}"
};yes]]
`
}]