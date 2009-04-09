function $globalcoll (length) {
	var thisPtr = this;

  this.length = length;

	this.inlet1 = new this.inletClass("inlet1", this, "name");

	this.inlet1["anything"] = function (collName) {
    var coll = [];
	  for(var i = 0; i < thisPtr.length; i++) {
      coll[i] = 0;
	  }
	  LilyApp.setSharedValue(collName,coll);
	}

	return this;
}

var $globalcollMetaData = {
	textName:"globalcoll",
	htmlName:"globalcoll",
	objectCategory:"Data",
	objectSummary:"Creates a global coll.",
	objectArguments:""
}