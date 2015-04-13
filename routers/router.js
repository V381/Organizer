/**
 * Author: Pavle Paunovic
 */


var router = Backbone.Router.extend({
    routes : {
        "" : "index",
        "alarm" : "alarm",
        "notes" : "notes",
        "stopWatch" : "stopWatch"
    },

    index : function () {
        var mainview = new mainView({collection : coll});
        mainview.render();
    },

    alarm : function(){
        var alarm = new Alarm({collection : coll});
    },

    notes : function () {
        var notes = new notesView({collection : coll});
    },

    stopWatch : function(){
        var stopwatch = new stopWatch({collection : coll});
    }


});

var ruter = new router;
Backbone.history.start();