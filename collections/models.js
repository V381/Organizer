



var headerMixin = new cssMixin(),
    alarmdata = new alarmData(),
    stopwatchData = new stopWatchData(),
    notesData = new notesData();

var modelColl = Backbone.Collection.extend();

var coll = new modelColl();
coll.add(headerMixin);
coll.add(alarmdata);
coll.add(stopwatchData);
coll.add(notesData);