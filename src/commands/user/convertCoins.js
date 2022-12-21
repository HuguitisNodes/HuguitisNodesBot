module.exports = [{
name: "convertCoins",
code: `
$addButton[1;Get 100 credits;success;Get100Credits_$authorID;no]
$addButton[1;Get 50 credits;success;Get50Credits_$authorID;no]
$addButton[1;Get 30 credits;success;Get30Credits_$authorID;no]
$addButton[1;Get 10 credits;success;Get10Credits_$authorID;no]

$color[1;YELLOW]
$description[1;
> **__Convert your coins to credits for the hosting.__**
> **__If you are a server booster you will get x2 coins!__**
> **You have __$getGlobalUserVar[Coins]__ coins, chat on this server to get more!**

**- 10 credits | __Price:__ 500 coins.**
**- 30 credits | __Price:__ 1500 coins.**
**- 50 credits | __Price:__ 2500 coins.**
**- 100 credits | __Price:__ 5000 coins.**]

$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **You are not registered on the dashboard or you have not linked your discord account to this one!**}};{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:GREEN}{description:
> ***__500 coins successfully converted to 10 credits!__ Check your account.*** $getVar[SuccessEmoji]
    
> **__Convert your coins to credits for the hosting.__**
> **__If you are a server booster you will get x2 coins!__**
> **You have __$getGlobalUserVar[Coins]__ coins, chat on this server to get more!**

**- 10 credits | __Price:__ 500 coins.**
**- 30 credits | __Price:__ 1500 coins.**
**- 50 credits | __Price:__ 2500 coins.**
**- 100 credits | __Price:__ 5000 coins.**
}};
{actionRow:{button:Get 10 credits:success:Get10Credits_$authorID:no}{button:Get 30 credits:success:Get30Credits_$authorID:no}{button:Get 50 credits:success:Get50Credits_$authorID:no}{button:Get 100 credits:success:Get100Credits_$authorID:no}}]
    
$setGlobalUserVar[Coins;$sub[$getGlobalUserVar[Coins];500]]

$onlyIf[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=error;]
    
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID/increment;PATCH;{"credits": "10",  "server_limit": "0"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
    
$onlyIf[$getGlobalUserVar[Coins]>=500;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have enough coins for this!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Get10Credits;]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:GREEN}{description:
> ***__1500 coins successfully converted to 30 credits!__ Check your account.*** $getVar[SuccessEmoji]
    
> **__Convert your coins to credits for the hosting.__**
> **__If you are a server booster you will get x2 coins!__**
> **You have __$getGlobalUserVar[Coins]__ coins, chat on this server to get more!**

**- 10 credits | __Price:__ 500 coins.**
**- 30 credits | __Price:__ 1500 coins.**
**- 50 credits | __Price:__ 2500 coins.**
**- 100 credits | __Price:__ 5000 coins.**
}};
{actionRow:{button:Get 10 credits:success:Get10Credits_$authorID:no}{button:Get 30 credits:success:Get30Credits_$authorID:no}{button:Get 50 credits:success:Get50Credits_$authorID:no}{button:Get 100 credits:success:Get100Credits_$authorID:no}}]
    
$setGlobalUserVar[Coins;$sub[$getGlobalUserVar[Coins];1500]]

$onlyIf[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=error;]
    
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID/increment;PATCH;{"credits": "30",  "server_limit": "0"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
    
$onlyIf[$getGlobalUserVar[Coins]>=1500;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have enough coins for this!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Get30Credits;]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:GREEN}{description:
> ***__2500 coins successfully converted to 50 credits!__ Check your account.*** $getVar[SuccessEmoji]
    
> **__Convert your coins to credits for the hosting.__**
> **__If you are a server booster you will get x2 coins!__**
> **You have __$getGlobalUserVar[Coins]__ coins, chat on this server to get more!**

**- 10 credits | __Price:__ 500 coins.**
**- 30 credits | __Price:__ 1500 coins.**
**- 50 credits | __Price:__ 2500 coins.**
**- 100 credits | __Price:__ 5000 coins.**
}};
{actionRow:{button:Get 10 credits:success:Get10Credits_$authorID:no}{button:Get 30 credits:success:Get30Credits_$authorID:no}{button:Get 50 credits:success:Get50Credits_$authorID:no}{button:Get 100 credits:success:Get100Credits_$authorID:no}}]
 
$setGlobalUserVar[Coins;$sub[$getGlobalUserVar[Coins];2500]]

$onlyIf[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=error;]
    
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID/increment;PATCH;{"credits": "50",  "server_limit": "0"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
    
$onlyIf[$getGlobalUserVar[Coins]>=2500;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have enough coins for this!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Get50Credits;]
    
$suppressErrors
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{color:GREEN}{description:
> ***__5000 coins successfully converted to 100 credits!__ Check your account.*** $getVar[SuccessEmoji]
    
> **__Convert your coins to credits for the hosting.__**
> **__If you are a server booster you will get x2 coins!__**
> **You have __$getGlobalUserVar[Coins]__ coins, chat on this server to get more!**

**- 10 credits | __Price:__ 500 coins.**
**- 30 credits | __Price:__ 1500 coins.**
**- 50 credits | __Price:__ 2500 coins.**
**- 100 credits | __Price:__ 5000 coins.**
}};
{actionRow:{button:Get 10 credits:success:Get10Credits_$authorID:no}{button:Get 30 credits:success:Get30Credits_$authorID:no}{button:Get 50 credits:success:Get50Credits_$authorID:no}{button:Get 100 credits:success:Get100Credits_$authorID:no}}]
    
$setGlobalUserVar[Coins;$sub[$getGlobalUserVar[Coins];5000]]

$onlyIf[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]!=error;]
    
$let[Remove;$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID/increment;PATCH;{"credits": "100",  "server_limit": "0"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]
    
$onlyIf[$getGlobalUserVar[Coins]>=5000;{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You don't have enough coins for this!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]

$onlyif[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
            
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Get100Credits;]
    
$suppressErrors
`
}]