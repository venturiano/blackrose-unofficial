window.onload = function() {
    loaddata();
}

function loaddata() {
    loaddata_mock();
    show_grid_mock();
    grid_zoom();
}

function loaddata_mock() {
    var players_trackers= [
        {"player_name":"Asdrubale","character_name":"Nero","player_id":101,"player_no":1,"color":"red","damage":[102,102,103,102],"points":5},
        {"player_name":"Bernardina","character_name":"Tessa","player_id":102,"player_no":2,"color":"green","damage":[],"points":42},
        {"player_name":"Cristoforo","character_name":"Jaf'ar","player_id":103,"player_no":3,"color":"yellow","damage":[104,102,104,101,101,101,104,102,104,104,102,101],"points":0},
        {"player_name":"Didi","character_name":"Rebecca","player_id":104,"player_no":4,"color":"blue","damage":[101,102,103,103,103,103,102],"points":5},
    ];
    var players_trackers_by_id = {};
    for (player of players_trackers) {
        players_trackers_by_id[player["player_id"]]=player;
    }
    for (player of players_trackers) {
        $("#player-color-"+player["player_no"]).css("background-color",player["color"]);
        $("#player-name-"+player["player_no"]).append(player["player_name"]);
        $("#character-name-"+player["player_no"]).append(player["character_name"]);
        $("#points-"+player["player_no"]).append(player["points"]);
        for (dmg of player["damage"]) {
            $("#damage-"+player["player_no"]).append("<div><i class='fa fa-solid fa-square' style='color:"+players_trackers_by_id[dmg]["color"]+";'> </i></div>");
        }
    }
}

function show_grid_mock() {
    $("#hex-section").empty();
    var data_spacing = parseInt($("#hex-section").attr("data-spacing"));
    console.log('data-spacing');
    console.log($("#hex-section").attr("data-spacing"));
    var hexgrid = new ROT.Display({width:16, height:6, spacing:data_spacing, layout:"hex"});
    $("#hex-section").append(hexgrid.getContainer());
    for (var y = 0; y < 6; y++) {
        for (var x = y%2; x < 16; x += 2) {
            hexgrid.draw(x, y, "("+x+","+y+")", "#000", "#fff");
        }
    }
}

function grid_zoom() {
    console.log('hello');
    $(window).bind('mousewheel DOMMouseScroll', function(event){
        var data_spacing = parseInt($("#hex-section").attr("data-spacing"))
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            if (data_spacing<11) {
                console.log('Up');
                $("#hex-section").attr("data-spacing",data_spacing+1);
                show_grid_mock();
            }
        }
        else {
            if (data_spacing>3) {
                console.log('Down');
                $("#hex-section").attr("data-spacing",data_spacing-1);
                show_grid_mock();
            }
        }
    
    });
}

