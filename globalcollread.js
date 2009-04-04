function $globalcollread (name) {
	var thisPtr = this;

  this.collName = name;
  this.coll = LilyApp.getSharedValue(name);

	this.inlet1 = new this.inletClass("inlet1", this, "set name or index");

	this.outlet1 = new this.outletClass("outlet1", this, "value at index");

	this.inlet1["anything"] = function (arg) {
    if (typeof(arg) == "number") {
		  thisPtr.outlet1.doOutlet(thisPtr.coll[arg]);
    } else {
      var args = LilyUtils.splitArgs(arg);
      var name = args[1];
      thisPtr.collName = name;
      thisPtr.coll = LilyApp.getSharedValue(name);
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