$(document).ready(function(){

	$.ajax({
		url: 'https://profootballapi.com/players',
  		type: 'POST',
  		data: {"api_key": "RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3",
  				"stats_type": "offense"},
  		dataType: 'jsonp',
	})
	.done(function(data){
		console.log(data);
	});
});