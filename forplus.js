function $forplus (max) {
	var thisPtr = this;

  this.max = max;

	this.inlet1 = new this.inletClass("inlet1", this, "bang starts counter");
	this.inlet2 = new this.inletClass("inlet2", this, "count");

	this.outlet1 = new this.outletClass("outlet1", this, "count");
	this.outlet2 = new this.outletClass("outlet2", this, "bang when done");

	this.inlet1["bang"] = function () {
	  for(var i = 0; i < thisPtr.max; i++) {
		  thisPtr.outlet1.doOutlet(i);
	  }
		thisPtr.outlet2.doOutlet("bang");
	}

	this.inlet2["anything"] = function (max) {
	  thisPtr.max = parseInt(max);
  }

	return this;
}

var $forplusMetaData = {
	textName:"forplus",
	htmlName:"forplus",
	objectCategory:"Data",
	objectSummary:"Counts up to a value and bangs when done.",
	objectArguments:"counter range"
}