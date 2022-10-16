module.exports = ({
name: "serverinfo",
aliases: ['guildinfo'],
code: `
$title[Info of $serverName]
$thumbnail[$replaceText[$serverIcon;null;https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD72SS-ObdahMJamnwVLjdBYW4tKaJBuh88Q&usqp=CAU]]
$footer[Requested by $userTag[$authorID];$authorAvatar]
$addTimestamp
$color[GREEN]
$addField[**Members**[$membersCount];**Humans:** $math[$membersCount-$botCount]
**Bots:** $botCount;yes]
$addField[**Info**;**Name:** $serverName
**Server ID:** $guildID
**Voice:** $serverPreferredLocale
**Boost Count:** $serverBoostCount
**Boost Tier:** $serverBoostLevel;yes]
$addField[**Owner**;$userTag[$ownerID];yes]`
});
