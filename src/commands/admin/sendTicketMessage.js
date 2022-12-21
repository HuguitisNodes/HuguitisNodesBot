module.exports = [{
name: "sendTicketMessage",
code: `
$addButton[1;Create Ticket;success;CreateTicket;no;🎫]

$color[1;GREEN]

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
      {textInput:With what do you need help?:2:reasonInput:yes:Hello, I need help with...:10:1000}
    }
    {actionRow:
      {textInput:Priority:1:priorityInput:yes:Low/Medium/High:3:6}
    }
    {actionRow:
      {textInput:Language:1:languageInput:yes:Español/English:7:7}
    }
    {actionRow:
      {textInput:Account Email (If applicable):1:emailInput:no:mail@huguitisnodes.host:1:64}
    }
    {actionRow:
      {textInput:Server ID (If applicable):1:serveridInput:no:2a3e440e:8:50}
    }
]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CreateTicket;]
`
}, {
type: "interaction",
name: "createTicketForm",
prototype: 'modal',
code: `
$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $userTag[$getChannelVar[TicketOwner;$get[ID]]] - $get[ID].txt;> Ticket Channel ID: $get[ID]
> Ticket Owner: $userTag ($authorID)
> Ticket Creation Date: $formatDate[$dateStamp] | $hour:$minute:$second
;utf8]

$interactionReply[;{newEmbed:{color:GREEN}{description:
$getVar[SuccessEmoji] **__Ticket created successfully!__** (<#$get[ID]>)
}};{actionRow:{button:Go To Ticket:5:https#COLON#//discord.com/channels/$guildID/$get[ID]}};;;yes]

$channelSendMessage[$get[ID];{"content": "<@$authorID>, <@&1012656509303390268>, <@&926896553912852480>, <@&928767532461084682>, <@&1015763299150872607>, <@&935235904585490482>, <@&928770757188792350>", "embeds" : "{newEmbed:{color:GREEN}{description:> 🎫 **__Ticket Info:__**}{field:User Tag:\`\`\`$userTag\`\`\`:yes}{field:User ID:\`\`\`$authorID\`\`\`:yes}{field:Priority:\`\`\`$toLocaleUppercase[$textInputValue[priorityInput]]\`\`\`:yes}{field:Language:\`\`\`$textInputValue[languageInput]\`\`\`:yes}{field:Email:\`\`\`$if[$textInputValue[emailInput]==;Not Applicable.;$textInputValue[emailInput]]\`\`\`:yes}{field:Server ID:\`\`\`$if[$textInputValue[serveridInput]==;Not Applicable.;$textInputValue[serveridInput]]\`\`\`:yes}{field:Reason:$nonEscape[$textInputValue[reasonInput]]:no}}","components": "{actionRow:{button:Close:danger:CloseTicket_$get[ID]_$authorID:no:🔒}{button:Claim:success:ClaimTicket_$authorID:no:🙋}{button:User Panel Info:primary:UserPanelInfo_$authorID:no:📜}}"}]

$modifyChannelPerms[$authorID;$get[ID];+viewchannel;+readmessagehistory;+sendmessage;+embedlinks;+attachfiles]

$setChannelVar[TicketChannel;Yes;$get[ID]]
$setChannelVar[TicketOpened;Yes;$get[ID]]
$setChannelVar[TicketOwner;$authorID;$get[ID]]

$let[ID;$createChannel[$guildID;$toLowercase[$textInputValue[priorityInput]]-$username;text;yes;941001976211193896]]

$onlyIf[$checkContains[$toLowercase[$textInputValue[languageInput]];español;english]!=false;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a valid language (Español or English)**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyIf[$checkContains[$toLowercase[$textInputValue[priorityInput]];low;medium;high]!=false;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a valid priority (Low, Medium or High)**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$deleteChannel[$channelID]

$wait[10s]

$channelSendMessage[$getVar[PublicLogsChannel];{attachment:transcript.txt:./Database/Tickets/$formatDate[$dateStamp] | $userTag[$getChannelVar[TicketOwner]] - $channelID.txt}**$userTag[$getChannelVar[TicketOwner]] ($getChannelVar[TicketOwner]) - Ticket Transcript:**]

$sendDM[{"embeds" : "{newEmbed:{color:YELLOW}{description:**__Please calificate us!__\\nCalificating us will help us to improve our support system.**}}", "components": "{actionRow:{button::success:1Star_$getChannelVar[TicketOwner]:no:<:starno:1054159201859026986>}{button::success:2Star_$getChannelVar[TicketOwner]:no:<:starno:1054159201859026986>}{button::success:3Star_$getChannelVar[TicketOwner]:no:<:starno:1054159201859026986>}{button::success:4Star_$getChannelVar[TicketOwner]:no:<:starno:1054159201859026986>}{button::success:5Star_$getChannelVar[TicketOwner]:no:<:starno:1054159201859026986>}}"};$getChannelVar[TicketOwner]]

$sendDM[**Huguitis Nodes Ticket Transcript:**{attachment:transcript.txt:./Database/Tickets/$formatDate[$dateStamp] | $userTag[$getChannelVar[TicketOwner]] - $channelID.txt};$getChannelVar[TicketOwner]]

$modifyChannelPerms[$getChannelVar[TicketOwner];$channelID;-viewchannel;-readmessagehistory;-sendmessage;-embedlinks;-attachfiles]

$interactionReply[;{newEmbed:{color:RED}{description:**Ticket closed by <@$authorID>**
Deleting the channel in 10 seconds...}}]

$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $userTag[$getChannelVar[TicketOwner]] - $channelID.txt;> Ticket Closed by: $userTag ($authorID)
;utf8]

$editChannel[$channelID;{"name":"$channelName-closed"}]

$setChannelVar[TicketOpened;No;$advancedTextSplit[$interactionData[customId];_;2]]

$onlyIf[$getChannelVar[TicketOpened;$advancedTextSplit[$interactionData[customId];_;2]]!=No;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **This ticket is already closed!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==CloseTicket;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$appendFile[./Database/Tickets/$formatDate[$dateStamp] | $userTag[$getChannelVar[TicketOwner]] - $channelID.txt;> Ticket Claimed by: $userTag ($authorID)
;utf8]

$interactionReply[;{newEmbed:{color:GREEN}{description:**Ticket claimed by <@$authorID>!**
$username will help you today :)}}]

$setChannelVar[TicketClaimed;Yes]

$onlyIf[$getChannelVar[TicketOpened]!=No;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **This ticket is closed!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$getChannelVar[TicketClaimed]!=Yes;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **This ticket is already claimed!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]!=$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==ClaimTicket;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionReply[;{newEmbed:{color:$if[$getObjectProperty[suspended]==1;RED;GREEN]}{description:> 📜 **__User Panel Info:__**}{field:ID:\`\`\`$getObjectProperty[id]\`\`\`:yes}{field:Pterodactyl ID:\`\`\`$getObjectProperty[pterodactyl_id]\`\`\`:yes}{field:Name:\`\`\`$getObjectProperty[name]\`\`\`:yes}{field:Role:\`\`\`$getObjectProperty[role]\`\`\`:yes}{field:Credits:\`\`\`$getObjectProperty[credits]\`\`\`:yes}{field:Server Limit:\`\`\`$getObjectProperty[server_limit]\`\`\`:yes}{field:Email:\`\`\`$getObjectProperty[email] (Disposable: $jsonRequest[https://ipqualityscore.com/api/json/email/$getVar[IPQualityScoreApiKey]/$getObjectProperty[email];disposable;error])\`\`\`:yes}{field:IP:\`\`\`$getObjectProperty[ip] (Proxy: $jsonRequest[https://ipqualityscore.com/api/json/ip/$getVar[IPQualityScoreApiKey]/$getObjectProperty[ip];vpn;error])\`\`\`:yes}{field:Discord Verified At:\`\`\`$getObjectProperty[discord_verified_at]\`\`\`:yes}{field:Suspended:\`\`\`$if[$getObjectProperty[suspended]==0;No;Yes]\`\`\`:yes}{field:Referral Code:\`\`\`$getObjectProperty[referral_code]\`\`\`:yes}};;;;yes]

$let[a;$createObject[$httpRequest[$getVar[ControlPanelURL]/api/users/$getChannelVar[TicketOwner];GET;;;;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]]

$onlyIf[$httpRequest[$getVar[ControlPanelURL]/api/users/$getChannelVar[TicketOwner];GET;;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=error;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **That user is not registered on the dashboard or they have not linked their discord account to this one!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]!=$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==UserPanelInfo;]

$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user $userTag ($authorID) calificated us with <:staryes:1054159249258844241> (1) star!]

$interactionUpdate[;{newEmbed:{color:GREEN}{description:**__Thanks for calificate us!__
We will keep on mind your rating and try to improve our support system.**}};{actionRow:{button::success:1Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:2Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}{button::success:3Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}{button::success:4Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}{button::success:5Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==1Star;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user $userTag ($authorID) calificated us with <:staryes:1054159249258844241> <:staryes:1054159249258844241> (2) stars!]

$interactionUpdate[;{newEmbed:{color:GREEN}{description:**__Thanks for calificate us!__
We will keep on mind your rating and try to improve our support system.**}};{actionRow:{button::success:1Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:2Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:3Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}{button::success:4Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}{button::success:5Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==2Star;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user $userTag ($authorID) calificated us with <:staryes:1054159249258844241> <:staryes:1054159249258844241> <:staryes:1054159249258844241> (3) stars!]

$interactionUpdate[;{newEmbed:{color:GREEN}{description:**__Thanks for calificate us!__
We will keep on mind your rating and try to improve our support system.**}};{actionRow:{button::success:1Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:2Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:3Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:4Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}{button::success:5Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==3Star;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user $userTag ($authorID) calificated us with <:staryes:1054159249258844241> <:staryes:1054159249258844241> <:staryes:1054159249258844241> <:staryes:1054159249258844241> (4) stars!]

$interactionUpdate[;{newEmbed:{color:GREEN}{description:**__Thanks for calificate us!__
We will keep on mind your rating and try to improve our support system.**}};{actionRow:{button::success:1Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:2Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:3Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:4Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:5Star_$getChannelVar[TicketOwner]:yes:<:starno:1054159201859026986>}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==4Star;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$channelSendMessage[$getVar[PublicLogsChannel];The user $userTag ($authorID) calificated us with <:staryes:1054159249258844241> <:staryes:1054159249258844241> <:staryes:1054159249258844241> <:staryes:1054159249258844241> <:staryes:1054159249258844241> (5) stars!]

$interactionUpdate[;{newEmbed:{color:GREEN}{description:**__Thanks for calificate us!__
We will keep on mind your rating and try to improve our support system.**}};{actionRow:{button::success:1Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:2Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:3Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:4Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}{button::success:5Star_$getChannelVar[TicketOwner]:yes:<:staryes:1054159249258844241>}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==5Star;]
`
}]