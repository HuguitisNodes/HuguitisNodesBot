module.exports = ({
name: "user",
aliases: "profile",
code: `
$editMessage[$get[id];{newEmbed:{description:> **__$userTag[$findUser[$message]]'s profile:__**
**• __General Info:__**
**- Times Joined:** $getGlobalUserVar[TimesJoined;$findUser[$message]]
**- Messages Sent:** $getGlobalUserVar[MessagesSent;$findUser[$message]]
**- Coins:** $getGlobalUserVar[Coins;$findUser[$message]]

**• __Pings:__**
**- Ping - News:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[NewsPingRoleID]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Ping - Incidents:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[IncidentsPingRoleID]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Ping - Changelogs:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[ChangelogsPingRoleID]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]

**• __Achievements:__**
**- Server Booster:** $if[$isBoosting[$findUser[$message]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Cool Guy:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[CoolGuyRoleID]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Early User:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[EarlyUserRoleID]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Very Early User:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[VeryEarlyUserRoleID]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
}{color:Green}{thumbnail:$userAvatar[$findUser[$message]]}}]
$let[id;$sendMessage[{newEmbed:{description:$getVar[LoadingEmoji] **Loading...**}{color:Yellow}};true]]`
})