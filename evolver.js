function $evolver () {
	var thisPtr = this;

  this.world_0 = [];
  this.world_1 = [];
  this.max_x = 0;
  this.max_y = 0;

	this.inlet1 = new this.inletClass("inlet1", this, "evolve on bang");
	this.inlet2 = new this.inletClass("inlet2", this, "world_0");
	this.inlet3 = new this.inletClass("inlet3", this, "world_1");
	this.inlet4 = new this.inletClass("inlet4", this, "max_x");
	this.inlet5 = new this.inletClass("inlet5", this, "max_y");

	this.outlet1 = new this.outletClass("outlet1", this, "world_0");
	this.outlet2 = new this.outletClass("outlet2", this, "world_1");
	this.outlet3 = new this.outletClass("outlet3", this, "changes");

	this.inlet1["bang"] = function () {
    thisPtr.evolve();
		thisPtr.outlet1.doOutlet(thisPtr.world_0);
		thisPtr.outlet2.doOutlet(thisPtr.world_1);
	}

	this.inlet2["anything"] = function (obj) {
    thisPtr.world_0 = obj;
	}

	this.inlet3["anything"] = function (obj) {
    thisPtr.world_1 = obj;
	}

	this.inlet4["anything"] = function (obj) {
    thisPtr.max_x = obj;
	}

	this.inlet5["anything"] = function (obj) {
    thisPtr.max_y = obj;
	}

  this.evolve = function () {
    world_0 = thisPtr.world_0;
    world_1 = thisPtr.world_1;
    max_x = thisPtr.max_x;
    max_y = thisPtr.max_y;
    var i;

    for (i = 0; i < world_1.length; i++) {
      if (world_1[i] == 1) {
        world_0[i] = 1;
        thisPtr.outlet3.doOutlet([1, i]);
      } else if (world_1[i] == -1) {
        world_0[i] = 0;        
        thisPtr.outlet3.doOutlet([0, i]);
      }
    }

    thisPtr.clear(world_1);

    for (i = 0; i < world_0.length; i++) {
      neighbors = thisPtr.neighbors(i);
      if ((neighbors == 3) && (world_0[i] == 0)) {
        world_1[i] = 1;
      } else if (((neighbors < 2) || (neighbors >3))&&(world_0[i] == 1)) {
        world_1[i] = -1;
      }
    }
  }

  this.clear = function (world) {
    for (var i = 0; i < world.length; i++) {
      world[i] = 0;
    }
  }

  this.neighbors = function (i) {
    world_0 = thisPtr.world_0;
    max_x = thisPtr.max_x;
    max_y = thisPtr.max_y;
    x = i%max_x;
    y = parseInt(i/max_x);

    return world_0[((x+1)%max_x) + (((y+1)%max_y)*max_x)] +
    world_0[(x%max_x) + (((y+1)%max_y)*max_x)] +
    world_0[((x+(max_x-1))%max_x) + (((y+1)%max_y)*max_x)] +
    world_0[((x+(max_x-1))%max_x) + ((y%max_y)*max_x)] +
    world_0[((x+(max_x-1))%max_x) + (((y+(max_y-1))%max_y)*max_x)] +
    world_0[(x%max_x) + (((y+(max_y-1))%max_y)*max_x)] +
    world_0[((x+1)%max_x) + (((y+(max_y-1))%max_y)*max_x)] +
    world_0[((x+1)%max_x) + ((y%max_y)*max_x)];
  }

  this.loadEdit = function () {
    clear(thisPtr.world_0);
    for (var i = 0; i < world_edit.length; i++) {
      world_1[i] = world_edit[i];
    }
  }

	return this;
}

//meta data module- required. the module name should take the form "$"+ classname/filename +"MetaData"
var $evolverMetaData = {
	textName:"evolver", //the name as it will appear to the user- can be different from the filename/classname
	htmlName:"evolver", //same as above, but valid for an xhtml document with appropriate entity substitutions. 
	objectCategory:"Sample", //where to file, need not be an existing category
	objectSummary:"", //one sentence description for help
	objectArguments:"" //also for help- object argument list if any, otherwise empty.
}