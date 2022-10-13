module.exports = ({
name: "user",
aliases: "profile",
code: `
$editMessage[$get[id];{newEmbed:{description:> **__$userTag[$findUser[$message]]'s profile:__**
**• __General Info:__**
**- Preferred Language:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[SpanishRole]]==true;Español :flag_es:;$if[$hasRoles[$guildID;$findUser[$message];$getVar[EnglishRole]]==true;English :flag_us:;None.]]
**- Times Joined:** $getGlobalUserVar[TimesJoined;$findUser[$message]]
**- Messages Sent:** $getGlobalUserVar[MessagesSent;$findUser[$message]] | **Top:** #$getLeaderboardInfo[MessagesSent;$findUser[$message];globaluser;top]
**- Times Mentioned $username[$getVar[OwnerID]]:** $getGlobalUserVar[HuguitisPinged;$findUser[$message]] | **Top:** #$getLeaderboardInfo[HuguitisPinged;$findUser[$message];globaluser;top]
**- Coins:** $getGlobalUserVar[Coins;$findUser[$message]]
**• __Pings:__**
**- Ping - News:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[NewsPingRole]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Ping - Incidents:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[IncidentPingRole]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Ping - Changelogs:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[ChangelogsPingRole]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**• __Achievements:__**
**- Patreon Donator:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[PatreonDonator]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Cool Guy:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[CoolGuyRole]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Early User:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[EarlyUserRole]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Very Early User:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[VeryEarlyUserRole]]==true;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Mentioning $username[$getVar[OwnerID]] 15 Times:** $if[$getGlobalUserVar[HuguitisPinged;$findUser[$message]]>=15;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Mentioning $username[$getVar[OwnerID]] 30 Times:** $if[$getGlobalUserVar[HuguitisPinged;$findUser[$message]]>=30;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Mentioning $username[$getVar[OwnerID]] 50 Times:** $if[$getGlobalUserVar[HuguitisPinged;$findUser[$message]]>=50;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- Mentioning $username[$getVar[OwnerID]] 100 Times:** $if[$getGlobalUserVar[HuguitisPinged;$findUser[$message]]>=100;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]  
**- 10 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=10;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 50 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=50;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 100 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=100;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 300 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=300;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 500 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=500;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 1000 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=1000;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 3000 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=3000;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
**- 10000 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=10000;Yes $getVar[SuccessEmoji];No $getVar[ErrorEmoji]]
}{color:GREEN}{thumbnail:$userAvatar[$findUser[$message]]}}]
$let[id;$sendMessage[{
"embeds" : "{newEmbed:{description:$getVar[LoadingEmoji] **Loading...**}{color:YELLOW}}"
};yes]]`
})
