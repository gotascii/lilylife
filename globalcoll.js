function $globalcoll (collName) {
	var thisPtr = this;
	LilyApp.setSharedValue(collName,[]);
	return this;
}

var $globalcollMetaData = {
	textName:"globalcoll",
	htmlName:"globalcoll",
	objectCategory:"Data",
	objectSummary:"Creates a global coll.",
	objectArguments:"coll name"
}