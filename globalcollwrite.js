function $globalcollwrite (name) {
	var thisPtr = this;

  this.collName = name;
  this.coll = LilyApp.getSharedValue(name);
 
	this.inlet1 = new this.inletClass("inlet1", this, "set name or index value pair");

	this.inlet1["anything"] = function (arg) {
	  var args = (typeof(arg) == "string") ? LilyUtils.splitArgs(arg) : arg;
    if (args[0] == "set") {
      var name = args[1];
      thisPtr.collName = name;
      this.coll = LilyApp.getSharedValue(name);
    } else {
      var idx = parseInt(args[0]);
      var val = args[1];      
      thisPtr.coll[idx] = val;
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