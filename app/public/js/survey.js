$(document).ready(function(){
	//Function to validate inputs fields
	function validate(){
		var valid = true;
		$('.form-control').each(function(){
			if($(this).val().trim() == ""){
				$(this).after('<p class="text-danger">This field can\'t be empty.</p>');
				$(this).focus();
				return valid = false;
			}
		});
		return valid;
	}

	//Submit on click
	$('#submit').click(function(e){
		$(".text-danger").remove(); //Remove all error messages if any

		//Validate the form
		if(validate()){
			//if the form is valid
			//create an object with the inputs values
			var data = {
				name : $('#name').val().trim(),
				photo : $('#photo').val().trim(),
				scores : []
			};

			//loop through all selects elements to get the value and push it to the array scores
			$('select').each(function(){
				data.scores.push($(this).val());
			});

			//get hostname of the URL
			var currentURL = window.location.origin;

			//post request
			$.post(currentURL + "/api/friends", data, function(res){
				if(res){ //show the modal with name and photo
					$('#friend-name').text(res.name);
					$('#friend-photo').attr('src', res.photo);
					$('#modalBox').modal();
				}
	    	});

			//reset the form and send the cursor to the input with id = name
	    	$('form')[0].reset();
	    	$('#name').focus();
		}
	});
});