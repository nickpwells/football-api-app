$(document).ready(function(){

	$.ajax({
		type: 'POST',
		url: "https://profootballapi.com/players",
		api_key: 'RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3',
		stats_type: 'offense',
		player_name: "p.manning",
		year: "2014",
		dataType: "json"
	})
	.done(function(data){
		console.log(data);
	});

});
