var pingint;

function ping(session) {
	session.call('accessincommand.ping.mobile', [localStorage.accesstoken])
};

console.log("Runnning on AutobahnJS ", autobahn.version);

var wsuri;
wsuri="ws://192.168.0.10:3003/ws";

// the WAMP connection to the Router
//
var connection = new autobahn.Connection({
	url: wsuri,
	realm: "realm1",
	authmethods: ["ticket"],
	//should be Mobile ID
        authid: "mobile1",
        onchallenge: onchallenge
});

function onchallenge (session, method, extra) {
	console.log("onchallenge", method, extra);
	if (method === "ticket") {
		return localStorage.accesstoken;
	} else {
		throw "don't know how to authenticate using '" + method + "'";
	}
}


connection.onopen = function (session, details) {
	console.log("Connected: ", details);

	pingint=setInterval(function(){
		ping(session);
	}, 30000);
	ping(session);
};

connection.onclose = function (reason, details) {
	console.log("Connection lost: " + reason);
	clearInterval(pingint);
	connection.open();
};

connection.open();

