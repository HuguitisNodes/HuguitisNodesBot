module.exports = ({
    name: "info",
    aliases: "information",
    code: `
    $color[1;BLUE]
    $description[1;
    **__Official Server Invite: __**
    > **$getVar[OfficialServerInvite]**

    **__Bot Config: __**
    > **Owner Id: $getVar[OwnerID]**
    > **Prefix: $getVar[Prefix]**
    > **Success Emoji: $getVar[SuccessEmoji]**
    > **Error Emoji: $getVar[ErrorEmoji]**
    > **Loading Emoji: $getVar[LoadingEmoji]**
    **__Bot Credits:__**
    - [Bot Repository](https://github.com/HuguitisNodes/HuguitisNodesBot)
    - [Support Server](https://discord.gg/CVbPZRt9yG)
    - [Website](https://huguitisnodes.host)
    ]`
    })
