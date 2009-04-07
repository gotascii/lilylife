function $globalcoll () {
	var thisPtr = this;

	this.inlet1 = new this.inletClass("inlet1", this, "name");

	this.inlet1["anything"] = function (collName) {
	  LilyApp.setSharedValue(collName,[]);
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