module.exports = ({
    name: "purge",
    $if: 'v4',
    code: `
       $if[$message[2]==]
       $author[1;$username[$clientid] | Purged;$useravatar[$clientid]]
       $description[1;Successfully purged $abbreviate[$message[1]] $replaceText[$replaceText[$checkCondition[$message[1]>1];true;messages];false;message] in <#$channelID>.]
       $deleteIn[8s]
       $clear[$message[1]]
       $onlyPerms[managemessages;{newEmbed:{author:$username[$clientid] | Error:$useravatar[$clientid]}{description:You don't have the require permission.Permissions missing: \`MANAGE_MESSAGES\`}{color:RED}}]
       $onlyBotPerms[managemessages;{newEmbed:{author:$username[$clientid] | Error:$useravatar[$clientid]}{description:I don't have enough perms to execute this command. Permissions missing: \`MANAGE_MESSAGES\`.}{color:RED}}]
       $onlyif[$isnumber[$message[1]]==true;{newEmbed:{author:$username[$clientid] | Error:$useravatar[$clientid]}{description:Please give a valid amount.}{color:RED}}]
       $endif`
    })