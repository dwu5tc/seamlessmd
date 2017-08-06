var myApp = {}

myApp.init = () => {
	myApp.addDisplayPatientListener();
}

$(function() {
	myApp.init();
});

myApp.parsePatientData = (resp) => {
	var patient = {};
	patient.name =  resp.name.given.reduce((a, b) => a + " " + b);
	patient.name += " " + resp.name.family;
	patient.organization = resp.managingOrganization.display;
	patient.gender = resp.gender;
	patient.conditions = resp.conditions;
	return patient;
}

myApp.displayPatientData = (patient) => {
	$(".patient-data").html(`
		<p><span>Name of patient:</span> ${patient.name}</p>
		<p><span>Organization name</span>: ${patient.organization}</p>
		<p><span>Gender:</span> ${patient.gender}</p>
		<p><span>Number of conditions they have:</span> ${patient.conditions.length}</p>
		<p><span>List of all conditions: </span><p>
		<ul class="patient__conditions"></ul>
		<button class="patient-data__reset"><span>Back</span></button>
		`);
	patient.conditions.forEach((condition) => {
		$(".patient__conditions").append(`
			<li>${condition}</li>
			`);
	})
}

myApp.getPatientData = () => {
	return $.ajax ({
		url: "http://deanwu.me/seamlessmd/json/patient.json",
		dataType: "json",
		type: "GET"
	});
}

myApp.addDisplayPatientListener = () => {
	$(".patient").on("click", ".patient-data__get", () => {
		$.when(myApp.getPatientData())
		.then(function(resp) {
			myApp.displayPatientData(myApp.parsePatientData(resp));
		});
	});
	$(".patient").on("click", ".patient-data__reset", () => {
		$(".patient").html(`
			<div class="patient-data">
				<button class="patient-data__get"><span>Get Patient Data</span></button>
			</div>
		`);
	});
}
