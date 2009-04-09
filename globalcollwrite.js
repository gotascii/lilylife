function $globalcollwrite (name) {
	var thisPtr = this;

  this.coll = LilyApp.getSharedValue(name);
 
	this.inlet1 = new this.inletClass("inlet1", this, "set name or index value pair");

	this.inlet1["anything"] = function (arg) {
	  var args = (typeof(arg) == "string") ? LilyUtils.splitArgs(arg) : arg;
    if (args[0] == "set") {
      thisPtr.coll = LilyApp.getSharedValue(args[1]);
    } else {
      var idx = parseInt(args[0]);
      thisPtr.coll[idx] = args[1];
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