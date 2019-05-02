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



      // get pokemon names
      var queryURL = "https://pokeapi.co/api/v2/pokedex/2/";
      var testvar;
      var pokelist = {};

      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function(response) {
          //console.log(response);
          testvar = response;
          //var array = [] = response.pokemon_entries;


          for (let i = 0; i < 150 + 1; i++) {
              //const element = array[i];

              pokelist[response.pokemon_entries[i].pokemon_species.name] = response.pokemon_entries[i].entry_number;
              var newopt = $("<option>");
              newopt.text(response.pokemon_entries[i].pokemon_species.name);
              newopt.attr({ "value": pokelist[response.pokemon_entries[i].pokemon_species.name], "data-pokeid": pokelist[i] });
              newopt.appendTo("#pokesel0");
          }
          $("#pokesel0").select2({
              theme: "material"
          });

          $(".select2-selection__arrow")
              .addClass("material-icons")
              .html("arrow_drop_down");

      });

      $(document).ready(function() {

          $("#pokesel0").change(pickedpoke);

          function pickedpoke() {
              if ($("#pokesel0").val() != 'Select your Pokémon:') {
                  console.log($("#pokesel0").val())
              } else {
                  //DoSomethingElse();
              }
          }
          // console.log(pokelist);

      });