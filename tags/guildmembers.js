var e = module.exports = {};

e.init = () => {
    e.category = bu.TagType.SIMPLE;
};

e.requireCtx = require;

e.isTag = true;
e.name = `guildmembers`;
e.args = ``;
e.usage = `{guildmembers}`;
e.desc = `Returns the number of members on the current guild`;
e.exampleIn = `This guild has {guildmembers} members.`;
e.exampleOut = `This guild has 123 members.`;


e.execute = async function(params) {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = await bu.processTagInner(params, i);
    }
    let msg = params.msg;
    var replaceString = msg.channel.guild.memberCount;
    var replaceContent = false;


    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};