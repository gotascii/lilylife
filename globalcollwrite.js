function $globalcollwrite (name) {
	var thisPtr = this;

  this.collName = name;

	this.inlet1 = new this.inletClass("inlet1", this, "set name or index value pair");

	this.inlet1["anything"] = function (arg) {
    var args = LilyUtils.splitArgs(arg);
	  if (args[0] == "set") {
      thisPtr.collName = args[1];
	  } else {
      var idx = parseInt(args[0]);
      var val = args[1];
      var coll = LilyApp.getSharedValue(thisPtr.collName);
      coll[idx] = val;
	  }
	}

	return this;
}

var $globalcollwriteMetaData = {
	textName:"globalcollwrite",
	htmlName:"globalcollwrite",
	objectCategory:"Data",
	objectSummary:"Writes to a global coll.",
	objectArguments:"coll name"
}