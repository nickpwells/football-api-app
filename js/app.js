$(document).ready(function(){

	$.ajax({
  		type: 'POST',
  		url: 'https://profootballapi.com/players',
  		data: {"api_key": "RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3",
  				"stats_type": "offense"},
  		dataType: 'jsonp',
	})
	.done(function(data){
		console.log(data);
	});
});