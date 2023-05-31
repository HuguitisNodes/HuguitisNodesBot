module.exports = ({
name: "help",
aliases: "commands",
code: `
$color[1;Green]
$description[1;
**__User Commands:__**
> - $getVar[Prefix]user
> - $getVar[Prefix]help

**__Admin Commands:__**
> - $getVar[Prefix]sendTicketMessage
> - $getVar[Prefix]sendAutoRoles
> - $getVar[Prefix]ban

**__Owner Commands:__**
> - $getVar[Prefix]eval

**__Credits:__**
- [Bot Repository](https://github.com/HuguitisNodes/HuguitisNodesBot)
- [Support Server]($getVar[OfficialServerInvite])
- [Website](https://huguitisnodes.host)
]`
})