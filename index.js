const aoijs = require('aoi.js');
 const setting = require("./settings.js")
 const bot = new aoijs.Bot({
   token: setting.Token,
   prefix: setting.Prefix,
   suppressAllErrors: false,
   errorMessage: "",
   intents: "all",
   respondOnEdit:{
        commands: false,
        alwaysExecute: false,
        nonPrefixed: false
  },    
   database:{
        db: require("dbdjs.db"),
        type: "dbdjs.db",
        path:"./Database/",
        tables:["HuguitisNodes"],
    }
 });

const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./src/")

bot.onMessage()
bot.onMessageUpdate()
bot.onInteractionCreate()
bot.onJoin()
bot.onGuildJoin()
bot.onGuildLeave()

loader.setColors({
    walking:["blink","dim","fgWhite"],
    failedWalking:{
        name:["bright","fgYellow","underline"],
        text:["bright","fgRed"]
    },
    typeError:{
        command:["bright","fgYellow"],
        type:["fgYellow"],
        text:["bright","fgRed"]
    },
    failLoad:{
        command:["bright","fgMagenta"],
        type:["fgRed"],
        text:["bright","fgRed"],
        },
    loaded:{
           command:["bright","fgCyan"],
           type:["bright","fgBlue"],
           text:["bright","fgGreen"]
           },
})

bot.variables({
SuccessEmoji: setting.SuccessEmoji,
ErrorEmoji: setting.ErrorEmoji,
LoadingEmoji: setting.LoadingEmoji,

Prefix: setting.Prefix,
OwnerID: setting.OwnerID,
StaffIDs: setting.StaffIDs,
SpanishRole: setting.SpanishRole,
EnglishRole: setting.EnglishRole,
NewsPingRole: setting.NewsPingRole,
ChangelogsPingRole: setting.ChangelogsPingRole,
IncidentPingRole: setting.IncidentPingRole,
MemberRole: setting.MemberRole,
EarlyUserRole: setting.EarlyUserRole,
VeryEarlyUserRole: setting.VeryEarlyUserRole,
CoolGuyRole: setting.CoolGuyRole,

GetStartedChannel: setting.GetStartedChannel,
AutoRolesChannel: setting.AutoRolesChannel,
JoinLogsChannel: setting.JoinLogsChannel,
MemberCountChannel: setting.MemberCountChannel,
BotCountChannel: setting.BotCountChannel,
PublicLogsChannel: setting.PublicLogsChannel,

TimesJoined: "0",
IncidentHistory: "",
HuguitisPinged: "0",
MessagesSent: "0",
Coins: "0",
AFK: "No",
AFKReason: "None."
})

bot.functionManager.createCustomFunction({
name: "$setLocaleVar",
type: "djs",
code: async d => {
const data = d.util.openFunc(d)
const [varname,varid, value, userId=d.author?.id || "dm", table=d.client.db.tables[0]] = data.inside.splits
try{
d.client.db.set(table, varname.addBrackets(), varid, value)
} catch(e) {
d.aoiError.fnError(d, "custom", {}, `No se ha podido colocar el valor a la variable "${varname.addBrackets()}", con la razón ${e}`);
}

return {
code: d.util.setCode(data)
}
}
}) 
bot.functionManager.createCustomFunction({
name: "$getLocaleVar",
type: "djs",
code: async d => {
const data = d.util.openFunc(d)
let [varname,varid, value,userId=d.author?.id || "dm", table=d.client.db.tables[0]] = data.inside.splits

varname = varname.addBrackets()

data.result = (await d.client.db.get(table,varname, varid))?.value || value

return {
code: d.util.setCode(data)
}
}
})  