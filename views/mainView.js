/** Author : Pavle Paunovic */

// Namespace


var mainView = Backbone.View.extend({

    el : ".main",

    template : _.template($("#mainLayout").html()),

    initialize : function(){
        this.listenTo(this.collection.models[1], "change", this.render);
    },

    events : {
        "click .nav" : "test",
        "click .alarm" : "alarm",
        "click .notes" : "notes",
        "click .stopwatch" : "stopWatch",
        "click .timer" : "timer"
    },

    render : function () {
        $(this.el).html(this.template());
        this.alarmCheck();
        this.stopWatchCheck();
        this.notesCheck();
    },


    alarmCheck : function(){
        var alarm = $(".alarm");
        if (!this.collection.models[1].attributes.hasOwnProperty("Alarm")){
        }
        else
        {
            $(alarm).append("<p>" + this.collection.models[1].attributes.Alarm + "</p>");
        }

    },

    notesCheck : function(){
        var notesElement = $(".notes p");
        var serializeLocalStorage = Object.keys(localStorage);
        serializeLocalStorage.pop();
        var numOfNotes = _.filter(serializeLocalStorage, function(note){return note.charAt(0) == "n"}).length;
        $(notesElement).html("Notes: " + numOfNotes);
        if (numOfNotes === 0){
            $(notesElement).html("")
        }
        // Chrome sort classes and attributes, firefox does not...,
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            var firefoxLocalStorage = Object.keys(localStorage);
            firefoxLocalStorage.shift();
            var numberOfFirefoxNotes = _.filter(firefoxLocalStorage, function(note){return note.charAt(0) == "n"}).length;
            $(notesElement).html("Notes: " + numberOfFirefoxNotes);
        }
    },

    stopWatchCheck : function(){
        !localStorage.getItem("Laps") ? console.log("hm") : $(".stopwatch p").html("<p>" + "Laps: " + localStorage.getItem("Laps") + "</p>");
    },

    alarm : function(){
        ruter.navigate("alarm", true);
    },

    notes : function(){
        ruter.navigate("notes", true);
    },

    stopWatch : function(){
        ruter.navigate("stopWatch", true);
    }


});

// Encapsulate
(function(){
    function loadData() {
        if (!localStorage.getItem("Laps")) {
        }
        else
        {
           $(".stopwatch p").html("<p>" + "Laps: " + localStorage.getItem("Laps") + "</p>");
        }

    }

    function loadNotes(){
        if(!localStorage.getItem("notesLength")){
        }
        else
        {
            $(".notes p").html("<p>" + "Notes: " + Number(localStorage.getItem("notesLength")) + "</p>");
        }

    }

    window.onload = loadData;
    window.onload = loadNotes;
})();


