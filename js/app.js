var myApp = {}

myApp.init = () => {
	myApp.addDisplayPatientListener();
}

$(function() {
	myApp.init();
});

myApp.addDisplayPatientListener = () => {
	$(".patient-data__button").on("click", function() {
		$.when(myApp.getPatientData())
		.then(function() {
			console.log(response);
		})
	});
}

myApp.getPatientData = () => {
	return $.ajax ({
		url: "ajax/patient.json",
		dataType: "json",
		type: "GET"
	});
}

