var tg = global.telegraph;

require('./telegraph.js');
module.exports = telegraph;

if (tg)
	global.telegraph = tg;
else
	delete global.telegraph;