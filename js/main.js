// We have some customer records in a text file (customers.json) -- one customer per line, JSON-encoded.
// We want to invite any customer within 100km of our Dublin office for some food and drinks on us.
// Write a program that will read the full list of customers and output the names
// and user ids of matching customers (within 100km), sorted by User ID (ascending).
// You can use the first formula from this Wikipedia article to calculate distance.
// Don't forget, you'll need to convert degrees to radians.
// The GPS coordinates for our Dublin office are 53.3381985, -6.2592576.
// You can find the Customer list here.

var storeDataArray = customerlist.slice();
var currentLatitude = 53.3381985;
var currentLongitude = -6.2592576;
var distanceLimit = 100000;

function showLoadingDialog(value) {
    if (value === true) {
        $.mobile.loading('show', { text: 'Loading ...', textVisible: true, theme: 'a', html: '' });
    } else {
        $.mobile.loading('hide');
    }
}


$('document').ready(function() {

    $("#auther_label").click(function() {
        window.open("//studiobinghuan.blogspot.com?view=flipcard", "_blank");
    });

    $.mobile.loading('show', { text: 'Loading ...', textVisible: true, theme: 'a', html: '' })

    showLoadingDialog(true);

    for (var i = 0; i < storeDataArray.length; i++) {
        storeDataArray[i].distance = calculateDistance(currentLatitude, currentLongitude, storeDataArray[i].latitude, storeDataArray[i].longitude);
        //console.log("get distane: ", storeDataArray[i].distance);
    }
    storeDataArray.sort(sortID);

    listValidCustomers();
});


function listValidCustomers() {
    console.log("+++ listValidCustomers +++");
    var itemTempalte = "";
    $('#storeList').html("");
    for (var i = 0; i < storeDataArray.length; i++) {

        if (storeDataArray[i].distance <= distanceLimit) {

            var distanceString = (storeDataArray[i].distance > 1000) ? ((storeDataArray[i].distance / 1000.0).toFixed(1) + ' km') : (storeDataArray[i].distance + ' m');

            itemTempalte +=
                "<li class='ui-li ui-li-static ui-btn-up-c'" +
                "<div class='ui-btn-inner ui-li'><div class='ui-btn-text'>" +
                "<p class='ui-li-aside ui-li-desc'><strong>" + distanceString + "</strong></p>" +
                "<h2 class='ui-li-heading'>user_id: " + storeDataArray[i].user_id +
                "<p>name: " + storeDataArray[i].name + "</p>" + "</h2>" +
                "</li>";

        }

    }

    $('#storeList').append(itemTempalte);
    showLoadingDialog(false);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d * 1000, 10);
}



function getDistance(lat1, lon1, lat2, lon2) {

    returnDistance = 0;

    var R = 6378.137; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var d = R * c;

    if (d > 1) {
        returnDistance = Math.round(d * 1000); // meter
    } else if (d <= 1) {
        returnDistance = Math.round(d * 1000); // meter
    } else {
        returnDistance = d;
    }

    console.log(lat1 + "," + lon1 + "," + lat2 + "," + lon2 + " :" + returnDistance);
    if (returnDistance < 0) {
        returnDistance = -(returnDistance);
    }
    return returnDistance;
}

function sortID(a, b) {
    return a["user_id"] - b["user_id"];
}
