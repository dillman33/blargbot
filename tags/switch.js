var e = module.exports = {};
var bu;

var bot;
e.init = (Tbot, blargutil) => {
    bot = Tbot;
    bu = blargutil;

    e.category = bu.TagType.COMPLEX;
};

e.requireCtx = require;

e.isTag = true;
e.name = 'switch';
e.args = '&lt;arg&gt; &lt;case1&gt; &lt;then1&gt; [case2] [then2].. &lt;else&gt;';
e.usage = '{switch;arg;case1;then1[;case2;then2..];else}';
e.desc = 'Finds the <code>case</code> that matches <code>arg</code> and returns the following <code>then</code>.'
        +'If there is no matching <code>case</code>, <code>else</code> is returned.';
e.exampleIn = '{switch;{args;0};yes;Correct!;no;Incorrect!;That is not yes or no}';
e.exampleOut = 'Correct!';

e.execute = (params) => {
    for (let i = 1; i < params.args.length; i++) {
        params.args[i] = bu.processTagInner(params, i);
    }
    let args = params.args;
    var replaceString = '';
    var replaceContent = false;
    var elseDo = '';
    var cases = {};
    args.shift();
    var arg = args[0];
    args.shift();
    if (args.length % 2 != 1) return {
        replaceString: '`Invalid arguments!`',
        replaceContent: replaceContent
    };
    for (let i = 0; i < args.length; i++) {
        if (i != args.length - 1) {
            cases[args[i]] = args[i+1];
            i++;
        } else {
            elseDo = args[i];
        }
    }
    replaceString = cases[arg] || elseDo;
    return {
        replaceString: replaceString,
        replaceContent: replaceContent
    };
};