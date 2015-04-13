/** Author : Pavle Paunovic */




var Alarm = Backbone.View.extend({

    el : ".main",

    events : {
        "click .staph" : "clearAudio",
        "click .start" : "startAlarm",
        "click .mainPage" : "mainPage",
        "change .s0" : "inputValidation"
    },

    initialize : function(){

        // Inherit MainView
        this.render();
        this.p1 = document.querySelector(".clock");
        this.turnOnNotification = document.querySelector(".on");
        this.select1 = document.querySelector(".s0");
        this.header = document.querySelector(".alarmHeader");
        this.select2 = document.querySelector(".s1");
        this.audio = document.createElement("audio");
        this.staph = document.querySelector(".staph");
        this.start = document.querySelector(".start");
        this.goBack = document.querySelector(".mainPage");
        this.modelData = this.collection.models[1];
        this.createClock();
        this.appendClockToDom();
        this.appendValuesToSelect();
        this.start.setAttribute("disabled", "disabled");

    },

    template : _.template($("#alarmView").html()),

    render : function(){
        $(this.el).html(this.template());
    },

    inputValidation : function(){
        this.start.removeAttribute("disabled");
    },

    mainPage : function () {
        ruter.navigate("/", true);
    },

    createClock : function(){

        $(this.p1).html(moment().format("h:mm:ss a"));

    },

    clearAudio : function(){
        this.audio.pause();
        window.location.reload();
        localStorage.removeItem("Alarm");
    },

    startAlarm : function(){
      this.appendClockToDom();
      var alarm = "Alarm at: " + this.select1.value + ":" + this.select2.value;
        this.modelData.set({"Alarm" : alarm});
      ruter.navigate("/", true);
    },

    appendClockToDom : function(){
        var interval = setInterval(function(){
            this.createClock();
            if (this.configureAlarm() === true){
                clearInterval(interval);
                this.continueClock();
            }
        }.bind(this), 1000);

    },

    continueClock : function(){
        var interval = setInterval(function(){
            this.createClock();
        }.bind(this), 1000);

    },

    configureAlarm : function(){
        if (String(this.select1.value) === moment().format("h")){
            if (String(this.select2.value) === moment().format("mm")){
                this.audio.src = "audio/alarm1.mp3";
                this.audio.play();
                return true;
            }
        }

    },

    appendValuesToSelect : function(){

        for (var i = -1; i <= 12; i++){
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            this.select1.appendChild(opt);
            if (i === -1){
                opt.innerHTML = "Off";
            }
        }
        for (var j = 0; j <= 59; j++){
            if (j < 10){
                j = "0" + j;
            }
            var opt2 = document.createElement('option');
            opt2.value = j;
            opt2.innerHTML = j;
            this.select2.appendChild(opt2);
        }

    }
});

