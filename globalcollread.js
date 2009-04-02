function $globalcollread (name) {
	var thisPtr = this;

  this.collName = name;

	this.inlet1 = new this.inletClass("inlet1", this, "set name or index");

	this.outlet1 = new this.outletClass("outlet1", this, "value at index");

	this.inlet1["anything"] = function (arg) {
    var args = LilyUtils.splitArgs(arg);
	  if (args[0] == "set") {
      thisPtr.collName = args[1];
	  } else {
	    var idx = parseInt(args[0]);
      var val = LilyApp.getSharedValue(thisPtr.collName)[idx];
		  thisPtr.outlet1.doOutlet(val);
	  }
	}

	return this;
}

var $globalcollreadMetaData = {
	textName:"globalcollread",
	htmlName:"globalcollread",
	objectCategory:"Data",
	objectSummary:"Reads from a global coll.",
	objectArguments:"coll name"
}