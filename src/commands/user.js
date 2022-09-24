module.exports = ({
name: "user",
aliases: "profile",
code: `
$editMessage[$get[id];{newEmbed:{description:> **__$userTag[$findUser[$message]]'s Huguitis Nodes profile:__**

**• __General Info:__**
**- Preferred Language:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[SpanishRole]]==true;Español :flag_es:;$if[$hasRoles[$guildID;$findUser[$message];$getVar[EnglishRole]]==true;English :flag_us:;None.]]
**- Times Joined:** $getGlobalUserVar[TimesJoined;$findUser[$message]]
**- Messages Sent:** $getGlobalUserVar[MessagesSent;$findUser[$message]] | **Top:** #$getLeaderboardInfo[MessagesSent;$findUser[$message];globaluser;top]
**- Times Mentioned Huguitis:** $getGlobalUserVar[HuguitisPinged;$findUser[$message]] | **Top:** #$getLeaderboardInfo[HuguitisPinged;$findUser[$message];globaluser;top]
**- Coins:** $getGlobalUserVar[Coins;$findUser[$message]]

**• __Pings:__**
**- Ping - News:** $if[$hasRoles[$guildID;$findUser[$message];927996040232194149]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Ping - Incidents:** $if[$hasRoles[$guildID;$findUser[$message];980820717614534688]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Ping - Changelogs:** $if[$hasRoles[$guildID;$findUser[$message];987092328361656360]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]

**• __Achievements:__**
**- Cool Guy:** $if[$hasRoles[$guildID;$findUser[$message];1003989862438928564]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Early User:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[EarlyUserRole]]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Very Early User:** $if[$hasRoles[$guildID;$findUser[$message];$getVar[VeryEarlyUserRole]]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]

**- Mentioning Huguitis 15 Times:** $if[$hasRoles[$guildID;$findUser[$message];988076666695864360]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Mentioning Huguitis 30 Times:** $if[$hasRoles[$guildID;$findUser[$message];988078279212802139]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Mentioning Huguitis 50 Times:** $if[$hasRoles[$guildID;$findUser[$message];988078426407706744]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- Mentioning Huguitis 100 Times:** $if[$hasRoles[$guildID;$findUser[$message];988078539804901466]==true;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]

**- 10 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=10;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 50 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=50;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 100 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=100;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 300 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=300;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 500 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=500;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 1000 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=1000;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 3000 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=3000;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
**- 10000 Messages Sent:** $if[$getGlobalUserVar[MessagesSent;$findUser[$message]]>=10000;Yes <a:success:978743201672347728>;No <a:error:978743233779748894>]
}{color:GREEN}{thumbnail:$userAvatar[$findUser[$message]]}}]

$let[id;$sendMessage[{
"embeds" : "{newEmbed:{description:$getVar[LoadingEmoji] **Loading...**}{color:YELLOW}}"
};yes]]`
})