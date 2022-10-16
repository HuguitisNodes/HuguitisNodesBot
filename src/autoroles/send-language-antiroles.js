module.exports = [{
name: "send-language-antiroles",
code: `
$apiMessage[$channelID;;{newEmbed:{color:YELLOW}{author:Preferred language for support/server#COLON#:$serverIcon}{description:
:flag_es: **Spanish.**
:flag_gb: **English.**
}};{actionRow:{button:Spanish:success:Spanish:no: :flag_es:}{button:English:success:English:no: :flag_gb:}}]

$deleteCommand

$onlyForIDs[$getVar[OwnerID];]
` 
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have given you the role "Spanish"**}};;;;yes]

$giveRoles[$guildID;$authorID;$getVar[SpanishRole]]
$wait[1s]
$takeRoles[$guildID;$authorID;$getVar[EnglishRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[SpanishRole]]!=true;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You already have this role, you can only choose one of the both.**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==Spanish;]
`
}, {
type: "interaction",
prototype: "button",
code:`
$interactionReply[;{newEmbed:{color:GREEN}{description: $getVar[SuccessEmoji] **Done! I have given you the role "English"**}};;;;yes]

$giveRoles[$guildID;$authorID;$getVar[EnglishRole]]
$wait[1s]
$takeRoles[$guildID;$authorID;$getVar[SpanishRole]]

$onlyIf[$hasRoles[$guildID;$authorID;$getVar[EnglishRole]]!=true;{
"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You already have this role, you can only choose one of the both.**}{color:RED}}",
"ephemeral" : true,
"options" : { "interaction" : true }
}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==English;]
`
}]
