function refreshdoors() {

	$.ajax({
		type: 'GET',
		url: 'https://accessin.okonetwork.org.uk/mobile/doors',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', localStorage.accesstoken);
		},
		success: function (data) {
			doors=JSON.parse(data)['doors'];
			console.log(doors);
			localStorage.doors(JSON.stringify(doors));
		},
		error: function (err) {
			console.log("Error fetching door list");
			console.log(err);
		}
	});
};


function manualunlock(doorid) {
	$.get( "http://192.168.0.41:3001/door/"+doorid+"/beaconunlock", function( data ) {
		navigator.vibrate([250,250, 250,250, 250]);
		return false;
	}).fail(function() {
		alert("Something went wrong. Failed to to unlock");
		navigator.vibrate([500,250, 1000,250, 500]);
	});
};
