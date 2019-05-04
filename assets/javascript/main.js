// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMfsZJnIvX4wHBJPzVeaYiyWBdLzn4eZY",
    authDomain: "poketourney-65c90.firebaseapp.com",
    databaseURL: "https://poketourney-65c90.firebaseio.com",
    projectId: "poketourney-65c90",
    storageBucket: "poketourney-65c90.appspot.com",
    messagingSenderId: "241434009638"
};
firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

/* Custom data objects passed as teams */
var customData = {
    teams: [
        [{ name: "Team 1", pokeid: '1' }, null],
        [{ name: "Team 3", pokeid: '132' }, { name: "Team 4", pokeid: '15' }],
        [{ name: "Team 5", pokeid: '134' }, { name: "Team 6", pokeid: '155' }],
        [{ name: "Team 7", pokeid: '23' }, null],
        //extra 8
        [{ name: "Team 8", pokeid: '1' }, null],
        [{ name: "Team 9", pokeid: '1' }, { name: "Team 10", pokeid: '151' }],
        [{ name: "Team 11", pokeid: '14' }, { name: "Team 12", pokeid: '15' }],
        [{ name: "Team 13", pokeid: '2' }, null]
    ],
    results: [
        [
            [
                [3, 5],
                [2, 4],
                [6, 3],
                [2, 3],
                [1, 5],
                [5, 3],
                [7, 2],
                [1, 2]
            ],
            [
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8]
            ],
            [
                [9, 1],
                [8, 2]
            ],
            [
                [1, 3]
            ],
        ]
    ]
}

/* Edit function is called when team label is clicked */
function edit_fn(container, data, doneCb) {
    var input = $('<div>')
}

/* Render function is called for each team label when data is changed, data
 * contains the data object given in init and belonging to this slot.
 *
 * 'state' is one of the following strings:
 * - empty-bye: No data or score and there won't team advancing to this place
 * - empty-tbd: No data or score yet. A team will advance here later
 * - entry-no-score: Data available, but no score given yet
 * - entry-default-win: Data available, score will never be given as opponent is BYE
 * - entry-complete: Data and score available
 */
function render_fn(container, data, score, state) {
    switch (state) {
        case "empty-bye":
            container.append("No Player")
            return;
        case "empty-tbd":
            container.append("Upcoming")
            return;

        case "entry-no-score":
        case "entry-default-win":
        case "entry-complete":
            container.append('<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + data.pokeid + '.png" height="16px" class="zerofit" /> ').append(data.name)
            return;

    }
}

$(function() {
    $('div#matches .demo').bracket({
        save: function() {},
        /* without save() labels are disabled */
        teamHeight: 800,
        scoreHeight: 800,
        matchMargin: 10,
        roundMargin: 50,
        init: customData,
        decorator: {
            edit: edit_fn,
            render: render_fn
        }
    })
})

// get pokemon names and pokeid
var queryURL = "https://pokeapi.co/api/v2/pokedex/2/";
var testvar;
var pokelist = {};

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    for (let i = 0; i < 150 + 1; i++) {

        pokelist[response.pokemon_entries[i].pokemon_species.name] = response.pokemon_entries[i].entry_number;
        var newopt = $("<option>");
        newopt.text(response.pokemon_entries[i].pokemon_species.name);
        newopt.attr({ "value": pokelist[response.pokemon_entries[i].pokemon_species.name], "data-pokeid": pokelist[response.pokemon_entries[i].pokemon_species.name] });
        newopt.appendTo("#pokesel0");
        //console.log(pokelist[response.pokemon_entries[i].pokemon_species.name]);

        var statlist = {} = $('<li class="mdl-list__item poke-list">');
        statlist.attr({"data-pokeid": pokelist[response.pokemon_entries[i].pokemon_species.name], "data-name": response.pokemon_entries[i].pokemon_species.name});
        statlist.span = $('<span class="mdl-list__item-primary-content">');
        statlist.span.html("<i> " + response.pokemon_entries[i].entry_number + ". </i>" + response.pokemon_entries[i].pokemon_species.name);
        statlist.append(statlist.span);
        $("#stat-list").append(statlist);

    }
    $("#pokesel0").select2({
        theme: "material"
    });

    $(".select2-selection__arrow")
        .addClass("material-icons")
        .html("arrow_drop_down");

});

var querystats = "https://nanofuxion.github.io/pokemon-stats-api/api/data/";
$.ajax({
    url: querystats,
    method: "GET"
}).then(function(response) {
    testvar = response;
});


$(document).ready(function() {

    ////select a pokemon to enter the tourney////
    $("#pokesel0").change(pickedpoke);

    function pickedpoke() {
        if ($(this).val() != 'Select your Pokémon:') {
            console.log($(this).val());
        } else {
            //prompt to select a pokemon
        }
    }


    //
    $("#joinbtn").on("click", function(event) {
        event.preventDefault();

        database.ref().push({
            customData: customData,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
    
  

    });


    var querystats = "https://nanofuxion.github.io/pokemon-stats-api/api/data/";
    $.ajax({
        url: querystats,
        method: "GET"
    }).then(function(response0) {
        testvar = response0;


    ////view pokemon stats////
    $('li.poke-list, li.mdl-list__item').click(statfunc);

    function statfunc() {
        var current = $(this);
        var spriteStr = ("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + current.attr("data-pokeid") + ".png");
        $('.poke-sprite').attr({"src": spriteStr});
        $("aside h4").html(current.attr("data-name"));
        var tempholder;
        tempholder = $(".stat-text");
        tempholder.html(testvar[current.attr("data-pokeid") - 1]["base-stats"]["defense"]);
        tempholder = $(".stat-text:first");
        tempholder.html(testvar[current.attr("data-pokeid") - 1]["base-stats"]["attack"]);
        tempholder = $(".stat-text:last");
        tempholder.html(testvar[current.attr("data-pokeid") - 1]["base-stats"]["stamina"]);
    }
    //set to pikachu by default
   //$("#tab3").click($("#stat-list li:nth-child(25)").trigger("click"));

});

});