module.exports = ({
name:"ban",
code: `
$color[1;Green]

$title[1;$getVar[SuccessEmoji] User banned successfully.]

$addField[1;About:;
Reason:
> $if[$messageSlice[1]==;A reason wasn't provided.;$messageSlice[1]]
Date:
> $day $month $year
]

$addField[1;User information:;
$userTag[$findUser[$message[1];no]] - $findUser[$message[1];no]]

$addField[1;Banned by:;
$userTag - $authorID]

$thumbnail[1;$userAvatar[$findUser[$message[1];no]]]

$ban[$guildID;$findUser[$message[1];no];;$if[$messageSlice[1]==;A reason wasn't provided.;$messageSlice[1]]]

$onlyIf[$findUser[$message[1];no]!=;$getVar[ErrorEmoji] **I couldn't find that user.**]

$onlyIf[$findUser[$message[1];no]!=$clientID;$getVar[ErrorEmoji] **I can't ban myself... I think...**]

$onlyIf[$findUser[$message[1];no]!=$ownerID;$getVar[ErrorEmoji] **I can't ban the owner of the server.**]

$onlyIf[$isBanned[$guildID;$findUser[$message[1];no]]!=true;$getVar[ErrorEmoji] **This user has already been banned on this server.**]

$argsCheck[>0;$getVar[ErrorEmoji] **Please specify the user you want to ban. 
> __Correct usage:__** $getServerVar[Prefix]ban <User> [Reason]]

$onlyForIDs[$joinSplitText[;];]
$textSplit[$getVar[StaffIDs];, ]
`
})