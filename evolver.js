function $evolver () {
	var thisPtr = this;

	this.inlet1 = new this.inletClass("inlet1", this, "evolve on bang");
  this.inlet2 = new this.inletClass("inlet2", this, "world names");

	this.outlet1 = new this.outletClass("outlet1", this, "changes");
	this.outlet2 = new this.outletClass("outlet2", this, "bang on done");

	this.inlet1["bang"] = function () {
    thisPtr.evolve();
    thisPtr.outlet2.doOutlet("bang");
	}

	this.inlet2["anything"] = function (arg) {
    if (arg == "reset") {
      thisPtr.reset();
    } else {
      var world_names = LilyUtils.splitArgs(arg);
      thisPtr.world_0 = LilyApp.getSharedValue(world_names[0]);
      thisPtr.world_1 = LilyApp.getSharedValue(world_names[1]);
      thisPtr.world_edit = LilyApp.getSharedValue(world_names[2]);
      thisPtr.max_x = LilyApp.getSharedValue("max_x");
      thisPtr.max_y = LilyApp.getSharedValue("max_y");
    }
	}

  this.evolve = function () {
    var world_0 = thisPtr.world_0;
    var world_1 = thisPtr.world_1;
    var max_x = thisPtr.max_x;
    var max_y = thisPtr.max_y;
    var i;

    for (i = 0; i < world_1.length; i++) {
      if (world_1[i] == 1) {
        world_0[i] = 1;
        thisPtr.outlet1.doOutlet([1, i]);
      } else if (world_1[i] == -1) {
        world_0[i] = 0;
        thisPtr.outlet1.doOutlet([0, i]);
      }
    }

    thisPtr.clear(world_1);

    for (i = 0; i < world_0.length; i++) {
      var neighbors = thisPtr.neighbors(i);
      if ((neighbors == 3) && (world_0[i] == 0)) {
        world_1[i] = 1;
      } else if (((neighbors < 2) || (neighbors > 3)) && (world_0[i] == 1)) {
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
    var world_0 = thisPtr.world_0;
    var max_x = thisPtr.max_x;
    var max_y = thisPtr.max_y;
    var x = i%max_x;
    var y = parseInt(i/max_x);

    var num = world_0[((x+1)%max_x) + (((y+1)%max_y)*max_x)] +
    world_0[(x%max_x) + (((y+1)%max_y)*max_x)] +
    world_0[((x+(max_x-1))%max_x) + (((y+1)%max_y)*max_x)] +
    world_0[((x+(max_x-1))%max_x) + ((y%max_y)*max_x)] +
    world_0[((x+(max_x-1))%max_x) + (((y+(max_y-1))%max_y)*max_x)] +
    world_0[(x%max_x) + (((y+(max_y-1))%max_y)*max_x)] +
    world_0[((x+1)%max_x) + (((y+(max_y-1))%max_y)*max_x)] +
    world_0[((x+1)%max_x) + ((y%max_y)*max_x)];

    return num;
  }

  this.reset = function () {
    thisPtr.clear(thisPtr.world_0);
    for (var i = 0; i < thisPtr.world_edit.length; i++) {
      thisPtr.world_1[i] = thisPtr.world_edit[i];
    }
  }

	return this;
}

var $evolverMetaData = {
	textName:"evolver",
	htmlName:"evolver",
	objectCategory:"Sample",
	objectSummary:"",
	objectArguments:""
}