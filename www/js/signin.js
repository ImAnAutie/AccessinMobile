$(document).on( "pagecontainershow", function( event, ui ) {
        pageid=ui.toPage[0].id;
        console.log(ui);
        allowedpages=['page_signin'];
        if (!localStorage.signedin) {
                if (!allowedpages.includes(pageid)) {
                        console.log("Not on allowed page presignin");
                        $.mobile.navigate('signin.html');
                        localStorage.sightings=JSON.stringify([]);
                        return false;
                };
        } else {
                $('.operator_name').html("Operator:"+JSON.parse(localStorage.operator)['id']);
                if (pageid=="page_index") {
                        console.log("Signed in, Redirecting to app page");
                        $.mobile.navigate('app.html');
                        return false;
                };
//                if (pageid=="page_newsighting") {
//                        getlocation();
//                };
        };

});



function signin() {
	$.mobile.loading( "show", {
          text: "Signing in",
          textVisible: true,
          theme: "a"
        });

	organisation=$('signin_organisation').val();
	email=$('signin_email').val();
	password=$('signin_password').val();

	if (!organisation) {
		$.mobile.loading( "hide" );
		alert("Organisation cannot be empty. If you do not know it please contact your administrator.");
		return false;
	};

	if (!email) {
		$.mobile.loading( "hide" );
		alert("Please enter your email address");
		return false;
	};

	if (!password) {
		$.mobile.loading( "hide" );
		alert("Please enter your password");
		return false;
	};

	$.post( "https://accessin.okonetwork.org.uk/mobileapi/signin", function(data) {
		$.mobile.loading( "hide" );

		data=JSON.parse(data);
		//status is only true if successful
		if (data.status) {
			//store jwt creds
		} else {
			switch (data.reason) {
				case "INVALID_ORGANISATION":
					alert("Sorry, the organisation your provided is invalid. Please enter your organisation again. If it still is invalid please contact your administrator.");
					break;
				case "ACCOUNT_BLOCKED":
					alert("Your account has been blocked. Please contact your administrator.");
					break;
				case "ACCOUNT_NOT_ENABLED":
					alert("Your account has not been enabled yet. Please contact your administrator.");
					break;
				case "INVALID_CREDENTIALS":
					alert("Sorry, either your email or password is incorrect. Please check them then try again. Then check your organisation is correct before contacting your administrator.");
					break;
				default:
					alert("Sorry, could not sign in. Please contact your administrator");
			};
		};
	}).fail(function(err) {
		console.log(err);
		$.mobile.loading( "hide" );
		alert("Sorry an error occured communicating with the server, please try again.");
	});
};
