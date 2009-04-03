function $i (val) {
	var thisPtr = this;

  this.val = val;

	this.inlet1 = new this.inletClass("inlet1", this, "number sets value, bang outputs");

	this.outlet1 = new this.outletClass("outlet1", this, "value");

	this.inlet1["num"] = function (val) {
	  thisPtr.val = val;
	}

	this.inlet1["bang"] = function () {
		thisPtr.outlet1.doOutlet(thisPtr.val);
	}

	return this;
}

var $iMetaData = {
	textName:"i",
	htmlName:"i",
	objectCategory:"Data",
	objectSummary:"Store an integer.",
	objectArguments:"initial value"
}