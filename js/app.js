$(document).ready(function(){

	var stats = {
	}
	var i = 1;

	//populates stats objects by iterating through JSON data in each week
	function createStatsObject (attempts, completions, yards, touchdowns, interceptions) {
		var week = "Week " + i;
		stats[week] = [attempts, completions, yards, touchdowns, interceptions];
		i+=1;
	}

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
					createStatsObject(passingObj.attempts, passingObj.completions, passingObj.yards, passingObj.touchdowns, passingObj.interceptions);
				});
			});
		}
    });

    console.log(stats);
});
