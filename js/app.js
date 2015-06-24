$(document).ready(function(){

	/*$.ajax({
		type: 'POST',
		url: "https://profootballapi.com/players",
		api_key: 'RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3',
		stats_type: 'offense',
		player_name: "p.manning",
		year: "2014",
		month: "11",
		dataType: "json"
	})
	.done(function(data){
		console.log(data);
	});*/

	$.ajax('https://profootballapi.com/players', 
		{type: 'POST', 
		data: {"api_key":"RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3","stats_type":"offense",'year':'2014','player_name':'P.Manning'}, 
		success: function(data, status) {
        	console.log(JSON.parse(data));
        	console.log(status);
    	}
	});

	function addPlayer() {
		$(".player-form:last-child").clone()
									.find("input:text").val("").end()
									.appendTo(".main-content-container");
	}

	$(".main-content-container").on("click",".add-player",function(e){
		e.preventDefault();
		addPlayer();
	});
});
