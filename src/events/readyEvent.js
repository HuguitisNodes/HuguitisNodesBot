module.exports = ({
type: "ready",
code: `
$log[
  ╭─━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╮
   Client: $userTag[$clientID]
   Client ID: $clientID
   Owner: $userTag[$clientOwnerIDs]
   Commands: $commandsCount
   Servers: $guildCount
  ╰─━━━━━━━━━━━━━━━━━━━━━━━━━━━━─╯
]
`
})