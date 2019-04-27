/* Custom data objects passed as teams */
var customData = {
    teams: [
        [{ name: "Team 1", flag: 'fi' }, null],
        [{ name: "Team 3", flag: 'se' }, { name: "Team 4", flag: 'us' }]
    ],
    results: []
}

/* Edit function is called when team label is clicked */
function edit_fn(container, data, doneCb) {
    var input = $('<input type="text">')
    input.val(data ? data.pokemon + ':' + data.name : '')
    container.html(input)
    input.focus()
    input.blur(function() {
        var inputValue = input.val()
        if (inputValue.length === 0) {
            doneCb(null); // Drop the team and replace with BYE
        } else {
            var flagAndName = inputValue.split(':') // Expects correct input
            doneCb({ flag: flagAndName[0], name: flagAndName[1] })
        }
    })
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
            container.append('<img src="https://misnina.github.io/reddit-pokemon-trade-search/regular/helioptile.png" height="16px" class="zerofit" /> ').append(data.name)
            return;
    }
}

$(function() {
    $('div#matches .demo').bracket({
        save: function() {},
        /* without save() labels are disabled */
        teamHeight: 600,
        scoreHeight: 600,
        matchMargin: 10,
        roundMargin: 50,
        init: customData,
        decorator: {
            edit: edit_fn,
            render: render_fn
        }
    })
})