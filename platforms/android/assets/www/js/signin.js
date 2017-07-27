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

