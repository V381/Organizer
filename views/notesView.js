/**
 * Author: Pavle Paunovic
 */



var notesView = Backbone.View.extend({

    el : ".main",

    initialize : function(){
        this.render();
        this.hm = 0;
        this.notesData = document.querySelector(".notesData");
        this.inputData = document.querySelector(".data");
        this.notesNum = 0;
        this.niz = [];
        this.storageToArray = Object.keys(localStorage).pop();
        this.loadDataFromStorage();
        this.firefox();
        this.keyMap();
    },

    template : _.template($("#notes").html()),

    events : {
        "submit form" : "preventDefault",
        "click .addInputData" : "addDataWithButton",
        "click .save" : "saveAndExit",
        "click .removeAll" : "removeAllNotes",
        "click li span" : "removeSingle"
    },

    render : function(){
        $(this.el).html(this.template());
    },

    preventDefault : function(e){
        e.preventDefault();
    },

    keyMap : function(){
        $('input[type=text]').on('keydown', function(e) {
            if (e.which == 13) {
                this.addDataWithButton();
            }
        }.bind(this));
    },

    addDataWithButton : function(){
        var wtf = Math.floor(Math.random() * 1000);
        localStorage.setItem("origin=true", true);
        if (this.inputData.value === "") return;
        localStorage.setItem("note" + wtf, this.inputData.value);
        $(this.notesData).append(("<li data='note" + wtf + "' class='index'>") + this.inputData.value + "<span>x</span>" + "</li>");
        if (this.inputData.value != ""){
            this.inputData.value = "";
        }
        this.collection.models[3].set({numberOfNotes : $(this.notesData).children().length});

    },

    removeAllNotes : function(){
        this.niz = [];
        localStorage.removeItem("niz");
        $(this.notesData).children().empty();
        $(this.notesData).children().remove();
        this.omg = 0;
        this.notesNum = 0;
        Object.keys(localStorage)
            .forEach(function(key){
                if (/^note/.test(key)) {
                    localStorage.removeItem(key);
                }
            }.bind(this));
    },

    removeSingle : function(e){
        this.notesNum--;
        var notesLength = $(this.notesData).children("li").length;
        var key = $(e.target).closest("li").attr("data");
        localStorage.removeItem(key);
        $(e.target).closest("li").remove();
        this.collection.models[3].set({numberOfNotes : notesLength});
    },

    loadDataFromStorage : function(){
        var storageToArr = Object.keys(localStorage);
        var niz = [];
        for (var j = 0; j < storageToArr.length; j++){
            niz.push(storageToArr[j].slice(4));
        }
        niz.sort(); // Firefox does not sort automatically, Chrome does!!!!!!!!!!
        niz.pop();
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            if (!localStorage.getItem("origin=true")){}
            else
            { // Lot of headache to track bug, last element in firefox niz[i] is undefined
              // Last element in Chrome niz[i] is NOT UNDEFINED.
                for (var i = 0; i < localStorage.length; i++){
                    if (localStorage.key(i).indexOf("note") != -1){
                        $("ul").append(("<li data='" + localStorage.key(i) + "' class='index'>")
                        + localStorage.getItem(localStorage.key(i))
                        + "<span>x</span>" +
                        "</li>");
                    }
                }
            }
        }
        (function(){
            if (navigator.userAgent.indexOf("Chrome") != -1){
                if (!localStorage.getItem("origin=true")){}
                else
                {
                    for (var i = 0; i < localStorage.length; i++){
                        if (localStorage.key(i).indexOf("note") != -1){
                            $("ul").append(("<li data='note" + niz[i] + "' class='index'>")
                            + localStorage.getItem(localStorage.key(i))
                            + "<span>x</span>" +
                            "</li>");
                        }
                    }
                }
            }
        })();

    },

    firefox : function(){
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            $(".notesText input").css({
                padding: "24px"
        })

      ;}

    },


    saveAndExit : function () {
        ruter.navigate("/", true);
    }



});

