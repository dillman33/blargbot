var e = module.exports = {};

e.init = () => {
    e.category = bu.CommandType.CAT;
};

e.requireCtx = require;

e.isCommand = true;
e.hidden = false;
e.usage = '';
e.info = '';

e.execute = async function(msg, words) {
    if (msg.author.id == bu.CAT_ID) {
        if (words.length >= 3) {
            let suggestion;
            if (words[1].toLowerCase() == 'latest' || words[1].toLowerCase() == 'l') {
                suggestion = (await r.table('suggestion').orderBy({ index: r.desc('id') }).limit(1).run())[0];
         } else {
                let i = parseInt(words[1]);
                if (isNaN(i)) {
                    bu.send(msg, 'You suck');
                    return;
                }
                suggestion = await r.table('suggestion').get(i).run();
                if (!suggestion) {
                    bu.send(msg, 'Invalid ID');
                    return;
                }
                
            }
            logger.debug(suggestion);
            let message = `**Hi, ${bot.users.get(suggestion.author).mention}!** You recently made this suggestion:

${suggestion.message}

**${msg.author.username}#${msg.author.discriminator}** has responded to your feedback with this:

${words.slice(2).join(' ')}

If you have any further questions or concerns, please join my support guild so that they can talk to you directly. You can get a link by doing \`b!invite\`. Thanks for your time!`;
            try {
            await bu.send(suggestion.channel, message);
            bu.send(msg, 'Response successfully sent.');
            } catch (err) {
                bu.send(msg, 'An error has occured.');
            }
        }
    }
};