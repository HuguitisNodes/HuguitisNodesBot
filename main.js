 const aoijs = require('aoi.js');
 const setting = require("./settings.js")
 const { Util } = require("aoi.js");
 const { setup } = require("aoi.parser");
 setup(Util);

 const bot = new aoijs.AoiClient({
   token: setting.Token,
   prefix: setting.Prefix,
   suppressAllErrors: false,
   aoiLogs: false,
   errorMessage: "",
   intents: ["MessageContent", "Guilds", "GuildMembers", "GuildMessages", "GuildBans", "GuildEmojisAndStickers", "GuildIntegrations", "GuildWebhooks", "GuildInvites", "GuildVoiceStates", "GuildPresences", "GuildMessageReactions", "GuildMessageTyping", "DirectMessages", "DirectMessageReactions", "DirectMessageTyping"],
   events: ["onMessage", "onInteractionCreate", "onJoin", "onLeave", "onMessageUpdate", "onGuildJoin", "onGuildLeave"],
   respondOnEdit:{
        commands: false,
        alwaysExecute: false,
        nonPrefixed: false
  },    
database: {
  type : "aoi.db",
  db : require("aoi.db"),
  tables: ["HuguitisNodes"],
  path: "./Database/",
  extraOptions: {
       dbType: "KeyValue",
       dbOptions: {
            storeOption: {
              maxDataPerFile: 10000,
            },
            cacheOption: {
              cacheReference: "DISK",
              limit: 10000,
            },
            methodOption: {
              getTime: 100,
            },
       }
  }
}
});

const loader = new aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./src/")
bot.variables(require("./variables.js"));



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

// Custom Functions:
const Interpreter = require("./node_modules/aoi.js/src/interpreter.js");
const {CheckCondition} = require("./node_modules/aoi.js/src/utils/helpers/checkCondition.js");
const {mustEscape} = require("./node_modules/aoi.js/src/utils/helpers/mustEscape.js");

bot.functionManager.createFunction({
 name: "$if",
 type: "djs",
 code: async (d) => {
    const data = d.util.aoiFunc(d);
    if (data.err) return d.error(data.err);

    const [condition, trueawait, falseawait = ""] = data.inside.splits;

    data.result = eval(CheckCondition.solve(mustEscape(condition)))
        ? trueawait.addBrackets()
        : falseawait.addBrackets();

    if (data.result.includes("{execute:")) {
        const cmd = d.client.cmd.awaited.find(
            (x) =>
                x.name.toLowerCase() ===
                data.result
                    .addBrackets()
                    .split("{execute:")[1]
                    .split("}")[0]
                    .toLowerCase(),
        );
        if (!cmd)
            return d.aoiError.fnError(
                d,
                "custom",
                {},
                `Invalid Awaited Command: '${data.result.addBrackets().split("{execute:")[1].split("}")[0]}' Provided`,
            );
        await Interpreter(
            d.client,
            d.message,
            d.args,
            cmd,
            d.client.db,
            false,
            undefined,
            d.data,
        );
        data.result = data.result
            .addBrackets()
            .replace(
                `{execute:${
                    data.result.addBrackets().split("{execute:")[1].split("}")[0]
                }}`,
                "",
            )
    } else data.result = data.result.addBrackets();

    return {
        code: d.util.setCode(data),
    }
}
})

bot.functionManager.createFunction({
name: "$getLocaleVar",
type: "djs",
code: async d => {
const data = d.util.aoiFunc(d)
let [varname,varid, value,userId=d.author?.id || "dm", table=d.client.db.tables[0]] = data.inside.splits

varname = varname.addBrackets()

data.result = (await d.client.db.get(table,varname, varid))?.value || value

return {
code: d.util.setCode(data)
}
}
})

bot.functionManager.createFunction({
name: "$setLocaleVar",
type: "djs",
code: async d => {
const data = d.util.aoiFunc(d)
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

bot.functionManager.createFunction({
 name: "$httpStatus",
 type: "djs",
 code: async d => {
 const data = d.util.aoiFunc(d)
 const [url] = data.inside.splits
 var request = require('axios');
await request.get(url).then((response) => {
 data.result = response.status
 }).catch(function(error) {
 if(error.response) {
 data.result = error.response.status
 }
 else {
 data.result = error
 }
 })
return {
 code: d.util.setCode(data)
 }
 }
 })
