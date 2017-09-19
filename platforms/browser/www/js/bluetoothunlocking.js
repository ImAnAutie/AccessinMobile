	var doors=JSON.parse(localStorage.doors);
	var beaconinrange={};

		// Dictionary of beacons.
		var beacons = {};

		// Timer that displays list of beacons.
		var timer = null;

		var lowestdistance=1000;

		function onDeviceReady()
		{
			// Start tracking beacons!
			setTimeout(startScan, 500);

			// Timer that refreshes the display.
			timer = setInterval(updateBeaconList, 500);

			// Start watching for shake gestures and call "onShake" with a shake sensitivity of 50
			shake.startWatch(onShake, 50, onShakeError);
		}

		function onBackButtonDown()
		{
			evothings.eddystone.stopScan();
			navigator.app.exitApp();
		}

		function startScan()
		{
			lowestdistance=1000;
			evothings.eddystone.startScan(
				function(beacon)
				{
					// Update beacon data.
					beacon.timeStamp = Date.now();
					beacons[beacon.address] = beacon;
					console.log(beacon);
				},
				function(error)
				{
					alert("An error occured with bluetooth");
					console.log(error);
				});
		}

		// Map the RSSI value to a value between 1 and 100.
		function mapBeaconRSSI(rssi)
		{
			if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
			if (rssi < -100) return 100; // Max RSSI
			return 100 + rssi;
		}

		function getSortedBeaconList(beacons)
		{
			var beaconList = [];
			for (var key in beacons)
			{
				beaconList.push(beacons[key]);
			}
			beaconList.sort(function(beacon1, beacon2)
			{
				return mapBeaconRSSI(beacon1.rssi) < mapBeaconRSSI(beacon2.rssi);
			});
			return beaconList;
		}

		function updateBeaconList()
		{
			removeOldBeacons();
			checkbeacons();
		}

		function removeOldBeacons()
		{
			var timeNow = Date.now();
			for (var key in beacons)
			{
				// Only show beacons updated during the last 15 seconds.
				var beacon = beacons[key];
				if (beacon.timeStamp + 15000 < timeNow)
				{
					if (uint8ArrayToString(beacon.nid).replace(/ /g,'')==beaconinrange.nid && uint8ArrayToString(beacon.bid).replace(/ /g,'')==beaconinrange.bid) {
						$('#button_unlocknearest').attr("disabled", true);
						beaconinrange={};
						lowestdistance=1000;
					};
						delete beacons[key];
				}
			}
		}

		function checkbeacons()
		{
			var sortedList = getSortedBeaconList(beacons);
			for (var i = 0; i < sortedList.length; ++i)
			{
				var beacon = sortedList[i];
				console.log(beacon);
				checkdistance(beacon);
			}
		}

		function checkdistance(beacon)
		{
			var distance = evothings.eddystone.calculateAccuracy(beacon.txPower, beacon.rssi);

			//eddystone namespace check(first few chars of sha1 of accessin.okonetwork.org.uk)
			if (uint8ArrayToString(beacon.nid).replace(/ /g,'')=="9e0263868e55a69d01ab") {
				if (distance<1.5) {
					if (distance<lowestdistance) {
						$.each(doors, function( index, door) {
							if (uint8ArrayToString(beacon.nid).replace(/ /g,'')==door.nid && uint8ArrayToString(beacon.bid).replace(/ /g,'')==door.bid) {
								$('#button_unlocknearest').attr("disabled", false);
								lowestdistance=distance;
								beaconinrange.nid=uint8ArrayToString(beacon.nid).replace(/ /g,'');
								beaconinrange.bid=uint8ArrayToString(beacon.bid).replace(/ /g,'');
							} else {
								alert("Inside namespace. Not matching any door");
							};
						});	
					};
				};
			} else {
				alert("Outside namespace");
			};

			return distance ?
				'Distance: ' + distance + '<br/>' :  '';
		}

		function uint8ArrayToString(uint8Array)
		{
			function format(x)
			{
				var hex = x.toString(16);
				return hex.length < 2 ? '0' + hex : hex;
			}

			var result = '';
			for (var i = 0; i < uint8Array.length; ++i)
			{
				result += format(uint8Array[i]) + ' ';
			}
			return result;
		}


		// This calls onDeviceReady when Cordova has loaded everything.
		document.addEventListener('deviceready', onDeviceReady, false);

		// Add back button listener (for Android).
		document.addEventListener('backbutton', onBackButtonDown, false);

		function beaconunlock() {
			if (typeof beaconinrange.bid == 'undefined') {
				return false;
			};

			$.each(doors, function( index, door) {
				if (beaconinrange.nid==door.nid && beaconinrange.bid==door.bid) {
					$.get( "http://192.168.0.41:3001/door/"+door.id+"/beaconunlock", function( data ) {
						navigator.vibrate([250,250, 250,250, 250]);
						return false;
					}).fail(function() {
						alert("Something went wrong. Failed to to unlock");
						navigator.vibrate([500,250, 1000,250, 500]);
					});
				};
			});
		};

		var onShake = function () {
			beaconunlock();
		};

		var onShakeError = function (err) {
			console.log(err);
			alert("Shake detection error");
		};

		// Stop watching for shake gestures
		//shake.stopWatch();
