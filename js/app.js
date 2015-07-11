$(document).ready(function(){

	var stats = {};//stats object which will be populated by JSON data
	var i = 1;//used to count each week of stats

	//AJAX inputs
	var player_name;
	var season_type;
	var year;

	//takes user input and reformats player name per API requirements
	function formatPlayerName(player_name) {
		var space = player_name.indexOf(' ');
		var first_letter = player_name.slice(0,1).toUpperCase();
		var last_name = player_name.slice(space+1);
		last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1);
		return first_letter + '.' + last_name;
	}

	$(".button[type=submit]").click(function(e){
		e.preventDefault();
		player_name = formatPlayerName($('.player').val());
		season_type = $(".season-type").val();
		year = $(".year").val();
		getPlayerStats();
	});

	function getPlayerStats() {
		$.ajax('https://profootballapi.com/players', 
			{type: 'POST', 
			data: {"api_key":"RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3",
			"stats_type":"offense",
			'year': year,
			"player_name": player_name},
			success: function(data, status) {
				var obj = JSON.parse(data);
				console.log(obj);
				$.each(obj, function(key, week){
					$.each(week, function(key, player_id){
						var passingObj = this.passing;
						var rushingObj = this.rushing;
						var receivingObj = this.receiving;

						var week = "Week " + i;
						stats[week] = {};

						//checks if player has referenced stats for the current week.  if yes, will populate stats object with appropriate stats
						if (player_id.hasOwnProperty('passing')) {
							stats[week]["passing"] = [passingObj.attempts, passingObj.completions, passingObj.yards, passingObj.touchdowns, passingObj.interceptions];
						}
						else {
							stats[week]["passing"] = [0,0,0,0,0];
						}

						if (player_id.hasOwnProperty('rushing')) {
							stats[week]["rushing"] = [rushingObj.attempts, rushingObj.yards, rushingObj.touchdowns, rushingObj.long];
						}
						else {
							stats[week]["rushing"] = [0,0,0,0];
						}

						if (player_id.hasOwnProperty('receiving')) {
							stats[week]["receiving"] = [receivingObj.receptions, receivingObj.yards, receivingObj.touchdowns, receivingObj.long];
						}
						else {
							stats[week]["receiving"] = [0,0,0,0];
						}

						$('.stats-table').append('<tr class="stats"></tr>');//create new row in stats table
						$('.stats-table tr:last-child').append('<td>'+ i + '</td>');//adds week number to first column in table

						$.each(stats[week], function(key, value){
							$.each(value, function(index, value){
							$('.stats-table tr:last-child').append('<td>'+value+'</td>');
							});
						});

						i += 1;

					});
				});
			}
	    	}
	    );
	}

	$(".button").click(function(e){
		e.preventDefault();
		$(".player-form *").toggle();
		$(".stats-table *, #reset").toggle();
	});
});
