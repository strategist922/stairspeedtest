var page = require('webpage').create(),
    system = require('system'),
    address, output;

if (system.args.length < 3 || system.args.length > 4) {
    console.log('Usage: render_alt.js URL filename [type]');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
	if(system.args.length == 4) {type = system.args[3];} else {type = "speed";}
	page.viewportSize = {width:1,height:1};
	page.open(address, function (status) {
		if (status !== 'success') {
		console.log('Unable to load the address!');
		phantom.exit(1);
		} else {
			window.setTimeout(function () {
				page.evaluate(function (t) {runsort(t);},type);
				table=page.evaluate(function () {return document.getElementById("table");});
				page.clipRect = {width:table.clientWidth,height:table.clientHeight,top:table.clientTop,left:table.clientLeft};
				page.render(output);
				phantom.exit();
			}, 200);
		}
    });
}
