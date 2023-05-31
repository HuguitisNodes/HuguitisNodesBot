module.exports = [{
name: "sendFeedback",
code: `
$setVar[FeedbackPanelMessageID;$sendMessage[{actionRow:
{button:Send Feedback:success:SendFeedback:no:⭐}
{button:Delete Feedback:danger:DeleteFeedback:no:🗑️}}
{newEmbed:{color:Green}{thumbnail:$guildIcon}{footer:©️ Huguitis Nodes 2023}
{description:> **__Huguitis Nodes Feedback#COLON#__**

Have you used Huguitis Nodes? Do you want to share something about your experience? Go ahead!
Here you can contribute and leave your opinions or comments towards us and towards the community.

__Offensive, unreasonable or not serious feedback will be deleted.__}};true]]

$deleteCommand

$onlyForIDs[$joinSplitText[;];]
$textSplit[$getVar[StaffIDs];, ]
` 
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Send Feedback;sendFeedbackForm;
    {actionRow:
      {textInput:Pricing Rating:1:pricingInput:1-5:yes::1:1}
    }
    {actionRow:
      {textInput:Performance Rating:1:performanceInput:1-5:yes::1:1}
    }
    {actionRow:
      {textInput:Uptime Rating:1:uptimeInput:1-5:yes::1:1}
    }
    {actionRow:
      {textInput:Support Rating:1:supportInput:1-5:yes::1:1}
    }
    {actionRow:
      {textInput:Comment:2:commentInput:I like this hosting a lot because...:yes::50:1500}
    }
]

$onlyIf[$checkContains[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;GET;;message;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}];No query results for model]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You are not registered in Huguitis Nodes or you have not linked your discord account with your Huguitis Nodes account!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$getGlobalUserVar[FeedbackSent]!=Yes;{newEmbed:{description:> $getVar[ErrorEmoji] **You have already sent a feedback!** ([Link](https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getGlobalUserVar[FeedbackMessageID]))

If you want to delete your current feedback and send a new one, do it from the buttons of [this](https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getVar[FeedbackPanelMessageID]) message.}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SendFeedback;]
`
}, {
type: "interaction",
name: "sendFeedbackForm",
prototype: 'modal',
code: `
$let[x;$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;PATCH;{"name": "$getObjectProperty[name]", "email": "$getObjectProperty[email]", "credits": "$sum[$getObjectProperty[credits];10]", "server_limit": "$getObjectProperty[server_limit]", "role": "$getObjectProperty[role]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]

$setGlobalUserVar[FeedbackSentCredits;Yes]

$onlyIf[$getGlobalUserVar[FeedbackSentCredits]!=Yes;]

$setGlobalUserVar[FeedbackSent;Yes]

$setGlobalUserVar[FeedbackMessageID;$channelSendMessage[$getVar[FeedbackChannelID];
{newEmbed:{color:Yellow}{footer::$guildIcon}{thumbnail:$authorAvatar}{timestamp}{description:
> ⭐ **__New Feedback#COLON#__**
__User#COLON#__ $userTag
__User ID#COLON#__ $authorID

**__Pricing Rating#COLON#__** $textInputValue[pricingInput]/5
**__Performance Rating#COLON#__** $textInputValue[performanceInput]/5
**__Uptime Rating#COLON#__** $textInputValue[uptimeInput]/5
**__Support Rating#COLON#__** $textInputValue[supportInput]/5
**__Comment#COLON#__**
\`\`\`
$nonEscape[$textInputValue[commentInput]]
\`\`\`}}
{actionRow:
{button:Leave Feedback:5:https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getVar[FeedbackPanelMessageID]}};true]]

$interactionReply[> $getVar[SuccessEmoji] Sent! Thank you so much for your feedback! 😀

$if[$getGlobalUserVar[FeedbackSentCredits]==No;I have added 10 free credits to your Huguitis Nodes account!
__Note:__ If you delete your feedback, credits are also subtracted from your account.;];;;;all;true]

$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$onlyIf[$checkCondition[$textInputValue[pricingInput]>=6]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$checkCondition[$textInputValue[performanceInput]>=6]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$checkCondition[$textInputValue[uptimeInput]>=6]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$checkCondition[$textInputValue[supportInput]>=6]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkCondition[$textInputValue[pricingInput]<=0]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$checkCondition[$textInputValue[performanceInput]<=0]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$checkCondition[$textInputValue[uptimeInput]<=0]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$checkCondition[$textInputValue[supportInput]<=0]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$isNumber[$textInputValue[pricingInput]]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$isNumber[$textInputValue[performanceInput]]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$isNumber[$textInputValue[uptimeInput]]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
$onlyIf[$isNumber[$textInputValue[supportInput]]!=false;{newEmbed:{description:$getVar[ErrorEmoji] **You need to put a number between 1 and 5 in the rating boxes!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$checkContains[$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;GET;;message;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}];No query results for model]!=true;{newEmbed:{description:$getVar[ErrorEmoji] **You are not registered in Huguitis Nodes or you have not linked your discord account with your Huguitis Nodes account!**}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$getGlobalUserVar[FeedbackSent]!=Yes;{newEmbed:{description:> $getVar[ErrorEmoji] **You have already sent a feedback!** ([Link](https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getGlobalUserVar[FeedbackMessageID]))

If you want to delete your current feedback and send a new one, do it from the buttons of [this](https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getVar[FeedbackPanelMessageID]) message.}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]
`
}, {
type: "interaction",
prototype: "button",
code: `
$let[x;$httpRequest[$getVar[ControlPanelURL]/api/users/$authorID;PATCH;{"name": "$getObjectProperty[name]", "email": "$getObjectProperty[email]", "credits": "$sub[$getObjectProperty[credits];10]", "server_limit": "$getObjectProperty[server_limit]", "role": "$getObjectProperty[role]"};;$default;{"authorization": "Bearer $getVar[ControlPanelApiKey]"}]]

$setGlobalUserVar[FeedbackSentCredits;No]

$onlyIf[$getGlobalUserVar[FeedbackSentCredits]!=No;]

$interactionReply[;{newEmbed:{color:Green}{description:> $getVar[SuccessEmoji] **__Feedback deleted successfully!__**

If you want to send it again, go to [this](https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getVar[FeedbackPanelMessageID]) message.}};;;all;true]

$setGlobalUserVar[FeedbackSent;No]

$deleteMessage[$getGlobalUserVar[FeedbackMessageID];$getVar[FeedbackChannelID]]

$createObject[$jsonRequest[$getVar[ControlPanelURL]/api/users/$authorID;;error;{"authorization": "Bearer $getVar[ControlPanelApiKey]", "Accept": "application/json"}]]

$onlyIf[$getGlobalUserVar[FeedbackSent]!=No;{newEmbed:{description:> $getVar[ErrorEmoji] **You have never sent a feedback!**

If you want to do it, go to [this](https#COLON#//discord.com/channels/$guildID/$getVar[FeedbackChannelID]/$getVar[FeedbackPanelMessageID]) message.}{color:Red}}{options:{ephemeral: true}}{extraOptions:{interaction: true}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==DeleteFeedback;]
`
}]