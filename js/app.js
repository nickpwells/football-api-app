$(document).ready(function(){

	var stats = {};//stats object which will be populated by JSON data
	var i = 1;//used to count each week of stats

	$.ajax('https://profootballapi.com/players', 
		{type: 'POST', 
		data: {"api_key":"RVmnd4sEiJY7PeA0MvQ5UquZW1poBGa3",
		"stats_type":"offense",
		'year':'2014',
		"player_name":"P.Manning"},
		success: function(data, status) {
			var obj = JSON.parse(data);
			$.each(obj, function(key, week){
				$.each(week, function(key, player_id){
					var passingObj = this.passing;
					var rushingObj = this.rushing;
					var receivingObj = this.receiving;

					var week = "Week " + i;
					stats[week] = {};

					//checks if player has referenced stats for the current week.  if yes, will populate stats object with appropriate stats
					if (player_id.hasOwnProperty('passing')) {stats[week]["passing"] = [passingObj.attempts, passingObj.completions, passingObj.yards, passingObj.touchdowns, passingObj.interceptions];}
					if (player_id.hasOwnProperty('rushing')) {stats[week]["rushing"] = [rushingObj.attempts, rushingObj.yards, rushingObj.touchdowns, rushingObj.long];}
					if (player_id.hasOwnProperty('receiving')) {stats[week]["receiving"] = [receivingObj.receptions, receivingObj.yards, receivingObj.touchdowns, receivingObj.long];}
					i += 1;
				});
			});
		}
    	}
    );
	console.log(stats);
});
