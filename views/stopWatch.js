/**
 * Author: Pavle Paunovic
 */


var stopWatch = Backbone.View.extend({

    el : ".main",

    events : {
        "click .mainPage2" : "goBack",
        "click .startStopWatch" : "startStopWatch",
        "click .stopStopWatch" : "stopStopWatch",
        "click .restartStopWatch" : "restartStopWatch",
        "click .laps" : "laps",
        "click .headLineForLaps" : "clearLaps"
    },

    template : _.template($("#stopWatchView").html()),

    initialize : function(){
        this.render();
        this.Text = document.querySelector(".stopWatch");
        this.ul = document.querySelector(".lap");
        this.lapsAttr = document.querySelector(".laps");
        this.headLine = document.querySelector(".headLineForLaps");
        this.dummyZero = 0;
        this.time = 0;
        this.running = 0;
        this.createStopWatch();
        this.lapsAttr.setAttribute("disabled", "disabled");
    },

    render : function(){
        $(this.el).html(this.template());

    },

    createStopWatch : function(){
        this.Text.innerHTML = "00:00:00";
        if (!localStorage.getItem("lap1")){
            this.headLine.removeAttribute("disabled");
        }
        else
        {
            for (var i = 0; i < localStorage.length; i++){
                if (localStorage.key(i).indexOf("lap") != -1){
                    $(this.ul).append("<li>" + "" + localStorage.getItem(localStorage.key(i)) + "</li>");
                }
            }
        }

    },

    startStopWatch : function () {
        if (this.running === 0){
            this.headLine.removeAttribute("disabled");
            this.running = 1;
            this.increment();
            this.lapsAttr.removeAttribute("disabled");
        }

    },

    stopStopWatch : function () {
        this.running = 0
    },

    restartStopWatch : function(){
        this.time = 0;
        localStorage.removeItem("stopWatch");
    },

    laps : function(){
        var liLength = $(".lap").children().length + 1;
        $(this.ul).append("<li>" + "" + this.Text.innerHTML +"</li>");
        localStorage.setItem("Laps", liLength);
        localStorage.setItem("lap" + liLength, this.Text.innerHTML);
        if(liLength >= 5){
            $(".laps").attr("disabled", "disabled");
        }
    },

    clearLaps : function () {
        localStorage.removeItem("Laps");
        $(this.ul).children().remove();
        $(this.ul).children().empty();
        Object.keys(localStorage)
            .forEach(function(key){
                if (/^lap/.test(key)) {
                    localStorage.removeItem(key);
            }
        }.bind(this));
    },

    increment : function(){
        if (this.running === 1){
            setTimeout(function(){
                this.time++;
                var mins = Math.floor(this.time/10/60);
                var secs = Math.floor(this.time/10 % 60);
                var tenths = this.time % 10;

                if (mins < 10){
                    mins = "0" + mins;
                }

                if (secs < 10){
                    secs = "0" + secs;
                }

                this.Text.innerHTML = mins + ":" + secs + ":" + tenths;
                this.increment();

            }.bind(this), 100);
        }
    },

    goBack : function(){
        ruter.navigate("/", true);

    }

});