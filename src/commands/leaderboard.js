module.exports = [{
name: "leaderboard",
code: `
$editMessage[$get[id];{newEmbed:{description:**__Amount of times mentioning Huguitis__:**
$globalUserLeaderboard[HuguitisPinged;asc;**{top}: {username}** - {value} times.]

**__Amount of messages sent__:**
$globalUserLeaderboard[MessagesSent;asc;**{top}: {username}** - {value} messages.]}{color:GREEN}}]
    
$let[id;$sendMessage[{
"embeds" : "{newEmbed:{description:$getVar[LoadingEmoji] **Loading...**}{color:YELLOW}}"
};yes]]
`
}]