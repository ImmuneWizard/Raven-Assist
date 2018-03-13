function setup() {
	var config = {
		apiKey: "AIzaSyA5NNUsRsqpCA-1ygRa00FtH4mbckLASdY",
		authDomain: "raven-assist.firebaseapp.com",
		databaseURL: "https://raven-assist.firebaseio.com",
		projectId: "raven-assist",
		storageBucket: "raven-assist.appspot.com",
		messagingSenderId: "224358827755"
	};
	firebase.initializeApp(config);

	database = firebase.database();

	var ref = database.ref("victim");
	ref.on('value', gotData, errData);

}

function gotData(data)
{
	var victimes = data.val();
	var keys = Object.keys(victimes);

	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var coord = victimes[k];
		var arr = coord.split("|");
		var lat = arr[0];
		var long = arr[1];

		var node = document.createElement('DIV');
		node.setAttribute("class", "victim");
		node.setAttribute("onclick", "mapPlot("+lat+","+long+")");
		txt = "latitude: "+lat+" longitude: "+long;
		var textNode = document.createTextNode(txt);
		node.appendChild(textNode);
		document.getElementById("victimList").appendChild(node);
	}
}

function errData(data)
{
	console.log("Error!");
	console.log(err);
}

function mapPlot(x,y)
{
	var obj = {
		lat: x,
		lng: y
	}
	var uluru = obj;
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 20,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}
