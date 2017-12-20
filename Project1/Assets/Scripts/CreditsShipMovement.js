// From Script Reference in Unity Documentation. Why reinvent the wheel?
	
	// The target marker.
	var target: Transform;
	
	// Speed in units per sec.
	var speed: float;
	
	
	function Update () {
		// The step size is equal to speed times frame time.
		var step = speed * Time.deltaTime;
		
		// Move our position a step closer to the target.
		transform.position = Vector3.MoveTowards(transform.position, target.position, step);
	}