function $globalcollread (name) {
	var thisPtr = this;

  this.coll = LilyApp.getSharedValue(name);

	this.inlet1 = new this.inletClass("inlet1", this, "set name or index");

	this.outlet1 = new this.outletClass("outlet1", this, "value at index");

	this.inlet1["anything"] = function (arg) {
    if (typeof(arg) == "number") {
		  thisPtr.outlet1.doOutlet(thisPtr.coll[arg]);
    } else {
      var args = LilyUtils.splitArgs(arg);
      thisPtr.coll = LilyApp.getSharedValue(args[1]);
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