module.exports = [{
name: "sendTicketMessage",
code: `
$addButton[1;Create Ticket;success;CreateTicket;false;🎫]

$color[1;Green]

$description[1;🎫 **__Create a ticket:__**
You are about creating a support ticket.
- Please check <#1033443330631147572> and try using <#926824812171632701> before nothing.
- We are not obligated to help you with not working code issues.
- Please have patience, we are not active 24 hours a day.

> **To create a ticket react with 🎫**]

$deletecommand

$onlyForIDs[$joinSplitText[;];]
$textSplit[$getVar[StaffIDs];, ]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Create Ticket;createTicketForm;
    {actionRow:
      {textInput:With what do you need help?:2:reasonInput:Hello, I need help with...:yes::10:1000}
    }
    {actionRow:
      {textInput:Priority:1:priorityInput:Low/Medium/High:yes::3:15}
    }
    {actionRow:
      {textInput:Language:1:languageInput:Español/English:yes::7:15}
    }
    {actionRow:
      {textInput:Account Email (Optional):1:emailInput:mail@huguitisnodes.host:no::1:64}
    }
    {actionRow:
      {textInput:Server ID (Optional):1:serveridInput:2a3e440e:no::8:50}
    }
]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CreateTicket;]
`
}, {
type: "interaction",
name: "createTicketForm",
prototype: 'modal',
code: `
$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $getChannelVar[TicketOwner;$get[ID]] - $get[ID].txt;> Ticket Channel ID: $get[ID]
> Ticket Owner: $userTag ($authorID)
> Ticket Creation Date: $formatDate[$dateStamp] | $hour:$minute:$second
;utf8]

$channelSendMessage[$get[ID];<@$authorID>, <@&1012656509303390268>, <@&926896553912852480>, <@&928767532461084682>, <@&1015763299150872607>, <@&935235904585490482>, <@&928770757188792350>{newEmbed:{color:Green}{description:> 🎫 **__Ticket Info:__**}{field:User Tag:\`\`\`$userTag\`\`\`:yes}{field:User ID:\`\`\`$authorID\`\`\`:yes}{field:Priority:\`\`\`$toLocaleUppercase[$textInputValue[priorityInput]]\`\`\`:yes}{field:Language:\`\`\`$textInputValue[languageInput]\`\`\`:yes}{field:Email:\`\`\`$if[$nonEscape[$filterMessage[$textInputValue[emailInput];"]]==;Not Applicable.;$nonEscape[$filterMessage[$textInputValue[emailInput];"]]]\`\`\`:yes}{field:Server ID:\`\`\`$if[$nonEscape[$filterMessage[$textInputValue[serveridInput];"]]==;Not Applicable.;$nonEscape[$filterMessage[$textInputValue[serveridInput];"]]]\`\`\`:yes}{field:Reason:$nonEscape[$filterMessage[$textInputValue[reasonInput];"]]:no}}{actionRow:{button:Close:danger:CloseTicket_$get[ID]_$authorID:false:🔒}{button:Claim:success:ClaimTicket_$authorID:false:🙋}{button:User Panel Info:primary:UserPanelInfo_$authorID:false:📜}}]

$modifyChannelPerms[$get[ID];$authorID;+viewchannel;+readmessagehistory;+sendmessages;+embedlinks;+attachfiles]

$setChannelVar[TicketChannel;Yes;$get[ID]]
$setChannelVar[TicketOpened;Yes;$get[ID]]
$setChannelVar[TicketOwner;$authorID;$get[ID]]

$interactionFollowUp[;{newEmbed:{color:Green}{description:
$getVar[SuccessEmoji] **__Ticket created successfully!__** (<#$get[ID]>)
}};{actionRow:{button:Go To Ticket:5:https#COLON#//discord.com/channels/$guildID/$get[ID]}};;true]

$let[ID;$createChannel[$guildID;$toLowercase[$textInputValue[priorityInput]]-$username;text;true;941001976211193896]]

$interactionDefer[true]

$onlyIf[$checkContains[$toLowercase[$textInputValue[languageInput]];español;english]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a valid language (Español or English)**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkContains[$toLowercase[$textInputValue[languageInput]];/]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a valid language (Español or English)**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkContains[$toLowercase[$textInputValue[priorityInput]];low;medium;high]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a valid priority (Low, Medium or High)**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkContains[$toLowercase[$textInputValue[priorityInput]];/]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a valid priority (Low, Medium or High)**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$deleteChannel[$channelID]

$wait[10s]

$channelSendMessage[$getVar[LogsChannelID];
{newEmbed:{color:Yellow}{thumbnail:$userAvatar[$getChannelVar[TicketOwner]]}{description:**$userTag[$getChannelVar[TicketOwner]] ($getChannelVar[TicketOwner])

Ticket Transcript.**}}{attachment:transcript.txt:./Database/Tickets/$formatDate[$dateStamp] | $getChannelVar[TicketOwner] - $channelID.txt}]

$sendDM[{newEmbed:{color:Yellow}{description:**__Please calificate us!__ <#$getVar[FeedbackChannelID]>
Calificating us will help us to improve our support system.**}};$getChannelVar[TicketOwner]]

$sendDM[{newEmbed:{color:Yellow}{description:**Huguitis Nodes Ticket Transcript.**}}{attachment:transcript.txt:./Database/Tickets/$formatDate[$dateStamp] | $getChannelVar[TicketOwner] - $channelID.txt};$getChannelVar[TicketOwner]]

$modifyChannelPerms[$channelID;$getChannelVar[TicketOwner];-viewchannel;-readmessagehistory;-sendmessages;-embedlinks;-attachfiles]

$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $getChannelVar[TicketOwner] - $channelID.txt;> Ticket Closed by: $userTag ($authorID)
;utf8]

$editChannel[$channelID;{"name":"$channelName-closed"}]

$setChannelVar[TicketOpened;No;$advancedTextSplit[$interactionData[customId];_;2]]

$interactionFollowUp[;{newEmbed:{color:Red}{description:**Ticket closed by <@$authorID>**
Deleting the channel in 10 seconds...}}]

$interactionDefer[true]

$onlyIf[$getChannelVar[TicketOpened;$advancedTextSplit[$interactionData[customId];_;2]]!=No;{newEmbed:{description:$getVar[ErrorEmoji] **This ticket is already closed!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CloseTicket;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $getChannelVar[TicketOwner] - $channelID.txt;> Ticket Claimed by: $userTag ($authorID)
;utf8]

$setChannelVar[TicketClaimed;Yes]

$interactionReply[;{newEmbed:{color:Green}{description:**Ticket claimed by <@$authorID>!**
$username will help you today :)}};;;all]

$onlyIf[$getChannelVar[TicketOpened]!=No;{newEmbed:{description:$getVar[ErrorEmoji] **This ticket is closed!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyif[$getChannelVar[TicketClaimed]!=Yes;{newEmbed:{description:$getVar[ErrorEmoji] **This ticket is already claimed!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]!=$interactionData[author.id];{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ClaimTicket;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionReply[;{newEmbed:{color:$if[$getObjectProperty[suspended]==1;Red;Green]}{description:> 📜 **__User Panel Info:__**}{field:ID:\`\`\`$getObjectProperty[id]\`\`\`:yes}{field:Pterodactyl ID:\`\`\`$getObjectProperty[pterodactyl_id]\`\`\`:yes}{field:Name:\`\`\`$getObjectProperty[name]\`\`\`:yes}{field:Role:\`\`\`$getObjectProperty[role]\`\`\`:yes}{field:Credits:\`\`\`$getObjectProperty[credits]\`\`\`:yes}{field:Server Limit:\`\`\`$getObjectProperty[server_limit]\`\`\`:yes}{field:Email:\`\`\`$getObjectProperty[email] (Disposable: $jsonRequest[https://ipqualityscore.com/api/json/email/$getVar[IPQualityScoreApiKey]/$getObjectProperty[email];disposable;error])\`\`\`:yes}{field:IP:\`\`\`$getObjectProperty[ip] (Proxy: $jsonRequest[https://ipqualityscore.com/api/json/ip/$getVar[IPQualityScoreApiKey]/$getObjectProperty[ip];vpn;error])\`\`\`:yes}{field:Discord Verified At:\`\`\`$getObjectProperty[discord_verified_at]\`\`\`:yes}{field:Suspended:\`\`\`$if[$getObjectProperty[suspended]==0;No;Yes]\`\`\`:yes}{field:Referral Code:\`\`\`$getObjectProperty[referral_code]\`\`\`:yes}};;;all;true]

$let[a;$createObject[$httpRequest[$getVar[ControlPanelURL]/api/users/$getChannelVar[TicketOwner];GET;;;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]

$onlyIf[$httpRequest[$getVar[ControlPanelURL]/api/users/$getChannelVar[TicketOwner];GET;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=error;{newEmbed:{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]!=$interactionData[author.id];{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==UserPanelInfo;]

$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$channelSendMessage[$getVar[LogsChannelID];{newEmbed:{color:Green}{thumbnail:$authorAvatar}{description:> <:staryes:1054159249258844241> **__New calification:__**

- **User:** $userTag
- **ID:** $authorID

__$advancedTextSplit[$interactionData[customId];_;3] $if[$advancedTextSplit[$interactionData[customId];_;1]==1;star;stars]!__}}]

$interactionUpdate[;{newEmbed:{color:Green}{description:> <:staryes:1054159249258844241> **__Thanks for calificate us!__**

**We will keep on mind your rating and try to improve our support system.
If you need more help, please create another ticket.**}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Calificate;]
`
}]