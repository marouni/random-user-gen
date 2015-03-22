// Button on click User generator

var button = document.getElementById("exeButton");
var userRequest = new XMLHttpRequest();
var mailinatorAddress = '@mailinator.com'
var mailinatorURL = 'https://www.mailinator.com/inbox.jsp?to='
var personSex = 'male'

userRequest.onreadystatechange = function () {
	if (userRequest.readyState === 4) {
		if (userRequest.status === 200) {
			displayUser(userRequest.responseText);	
		}
		else {
			alert('Error Contacting the Random user API');
		}
	}
};

button.onclick = generateUser;

function generateUser() {
        var personSex = determineSex();
	userRequest.open('GET', 'http://api.randomuser.me/?format=json&gender=' + personSex, true);
	userRequest.send(null);
}

function determineSex() {

        if(document.getElementById('gender_male').checked) {
            return 'male'
        }
        else {
            return 'female'
        }
}

function displayUser(responseText) {
	
	var userResponse = JSON.parse(responseText);
	var user = userResponse['results'][0]['user']
	
	document.getElementById("firstName").innerHTML = "First Name : " + "<b>"+ user['name']['first'] +"</b>";
	document.getElementById("lastName").innerHTML = "Last Name : " + "<b>"+ user['name']['last'] +"</b>";
	document.getElementById("phone").innerHTML = "Phone : " + "<b>"+ user['phone'] +"</b>";
	document.getElementById("address").innerHTML = "Address : " + "<b>"+ user['location']['street'] +"</b>";
	document.getElementById("city").innerHTML = "City : " + "<b>"+ user['location']['city'] +"</b>";
	document.getElementById("state").innerHTML = "State : " + "<b>"+ user['location']['state'] +"</b>";
	document.getElementById("zip").innerHTML = "Zip : " + "<b>"+ user['location']['zip'] +"</b>";
	document.getElementById("username").innerHTML = "Username : " + "<b>"+ user['username'] +"</b>";
	document.getElementById("email").innerHTML = "Email : " + "<b>"+ user['username'] + mailinatorAddress +"</b>";
	document.getElementById("emailUrl").setAttribute("href", mailinatorURL+user['username']);
	document.getElementById("emailUrl").setAttribute("target", "_blank");
	document.getElementById("emailUrl").innerHTML = "Email URL"
	document.getElementById("password").innerHTML = "Password : " + "<b>"+ user['salt'] +"</b>";
	document.getElementById("userImage").setAttribute("src", user['picture']['medium']);
}
