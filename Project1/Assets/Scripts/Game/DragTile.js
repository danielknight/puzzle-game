#pragma strict

var normalCollisionCount = 1;
var moveLimit = .5;
var collisionMoveFactor = .01;
var addHeightWhenClicked = 0.0;
var freezeRotationOnDrag = true;
var cam : Camera;
private var myRigidbody : Rigidbody;
private var myTransform : Transform;
private var canMove = false;
private var directionalFlag;
private var zPos : float;
private var gravitySetting : boolean;
private var freezeRotationSetting : boolean;
private var sqrMoveLimit : float;
private var collisionCount = 0;
private var camTransform : Transform;
private var correction : Vector3 = Vector3(0,0,0);
private var topBound : float = 1.500;
private var bottomBound : float = -3.500;
private var leftBound : float = -2.500;
private var rightBound : float = 2.500;
private var meanMove : Vector3 = Vector3(0,0,0);
private var numUpdates : int = 0;
private var lastPosition : Vector3 = Vector3(0,0,0);
myRigidbody = rigidbody;
  
function Start () {
	myRigidbody = rigidbody;
	myTransform = transform;
	if (!cam) {
		cam = Camera.main;
	}
	if (!cam) {
		Debug.LogError("Can't find camera tagged MainCamera");
		return;
	}
	camTransform = cam.transform;
	sqrMoveLimit = moveLimit * moveLimit;	// Since we're using sqrMagnitude, which is faster than magnitude
}
 
function OnMouseDown () {
	canMove = true;
	//myTransform.Translate(Vector3.up*addHeightWhenClicked);
	gravitySetting = myRigidbody.useGravity;
	freezeRotationSetting = myRigidbody.freezeRotation;
	myRigidbody.useGravity = false;
	myRigidbody.freezeRotation = freezeRotationOnDrag;
	zPos = myTransform.position.z;
	//get row/col-space the tile is inside of
}


function snap(){
	var temp : Vector3[] = new Vector3[2];
	var move : Vector3;
	var xIndicator = 1;
	var yIndicator = 1;
	if( myRigidbody.transform.position.x < 0) { xIndicator = -1;}
	if( myRigidbody.transform.position.y < 0) { yIndicator = -1;}
	var xError = Mathf.Abs(myRigidbody.transform.position.x%1.0); 

	var yError = Mathf.Abs(myRigidbody.transform.position.y%1.0);
	if(xError == 0 && yError == 0) return;
	//Debug.Log("x error: " + xError + "y error:"+ yError);
	if(xError > 0.5){
		//calc movedata for broadcast and send it out
		move = Vector3(1 - xError,0,0);
		move = move*xIndicator;
		temp[0] = move;
		temp[1] = myRigidbody.transform.position;
		moveSelf(temp);
		
	}
	if( xError <= 0.5) {
		move = Vector3(-xError, 0, 0);
		move = move*xIndicator;
		temp[0] = move;
		temp[1] = myRigidbody.transform.position;
		moveSelf(temp);
	}
	if(yError > 0.5) {
		move = Vector3(0,1 - yError,0);
		move = move*yIndicator;
		temp[0] = move;
		temp[1] = myRigidbody.transform.position;
		moveSelf(temp);
		
	}
	if(yError <= 0.5) {
		move = Vector3(0,-yError,0);
		move = move*yIndicator;
		temp[0] = move;
		temp[1] = myRigidbody.transform.position;
		moveSelf(temp);
		
	}

}
  
 
function OnMouseUp () {
	canMove = false;
	directionalFlag = null;
	myRigidbody.useGravity = gravitySetting;
	myRigidbody.freezeRotation = freezeRotationSetting;
	myRigidbody.transform.parent.BroadcastMessage("snap");
	SendMessageUpwards("updateBoard");
	SendMessageUpwards("shoot");
	if (!myRigidbody.useGravity) {
		myTransform.position.z = zPos-addHeightWhenClicked;
	}
	correction = Vector3(0,0,0);
}


function moveSelf(moveData : Vector3[]){ //moveVector : Vector3, positionXY[] : int[] ){
	if(Mathf.Abs(moveData[1].y - rigidbody.transform.position.y) <.25 && Mathf.Abs(moveData[0].x) > 0) { //same row && moving rowsapce
		//Debug.Log(moveData[0]);
		rigidbody.MovePosition(rigidbody.position + moveData[0]);
		if(rigidbody.position.x <= leftBound){
			rigidbody.position.x = rightBound + (rigidbody.position.x -leftBound);	
			correction.x += rightBound - leftBound;
		} else if(rigidbody.position.x >= rightBound){
			rigidbody.position.x = rigidbody.position.x + leftBound -rightBound;
			correction.x += leftBound - rightBound;
		}
	}
	else if( Mathf.Abs(moveData[1].x - rigidbody.transform.position.x) < .25 && Mathf.Abs(moveData[0].y) > 0) { //same col and moving colspace 
		//Debug.Log(moveData[0]);
		rigidbody.MovePosition(rigidbody.position + moveData[0]);
		if(rigidbody.position.y >= topBound ){
			//send tile to other side of row or col, set a correction for the move calc
			rigidbody.position.y =  bottomBound + rigidbody.position.y-topBound;	
			correction.y += bottomBound - topBound;
		} else if(rigidbody.position.y <= bottomBound) {
			rigidbody.position.y = topBound + (rigidbody.position.y - bottomBound);
			correction.y += topBound-bottomBound;
		}
			
	}
	//rigidbody.MovePosition(rigidbody.position + moveVector);
}
 
function OnCollisionEnter () {
	collisionCount++;
}
 
function OnCollisionExit () {
	collisionCount--;
}
 
function FixedUpdate () { //handles calc of moveVector 
	if (!canMove) return;
 	else if(directionalFlag != null) {
 		//move in the direction prev'ly set at the current magnitude
 		myRigidbody.velocity = Vector3.zero;
		myRigidbody.angularVelocity = Vector3.zero;
		myTransform.position.z = zPos;
		var mousePos = Input.mousePosition;
		var move = cam.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y, camTransform.position.z - myTransform.position.z)) - rigidbody.transform.position + correction; 
		move = (directionalFlag == "yDirection") ? Vector3(0,move.y,0) : Vector3(move.x,0,0); 
		//Debug.Log("Move vector is " + move +" and correction was " +correction);	
		if (collisionCount > normalCollisionCount) {
			//move = move.normalized*collisionMoveFactor;
		}
		else if (move.sqrMagnitude > sqrMoveLimit) {
			//move = move.normalized*moveLimit;
		}
		var temp : Vector3[] = new Vector3[2];
		temp[0] = move;
		temp[1] = myRigidbody.transform.position;
	 	myRigidbody.transform.parent.BroadcastMessage("moveSelf", temp );
	    //myRigidbody.MovePosition(myRigidbody.position + move);
	    //Debug.Log(move);
		}
	else { //no direction set by flag, calc for the first time over the mean of 3 fixed updates
		if(numUpdates == 0){
			lastPosition = Input.mousePosition;
			correction = Vector3(0,0,0);
		}
		myRigidbody.velocity = Vector3.zero;
		myRigidbody.angularVelocity = Vector3.zero;
		myTransform.position.z = zPos;
		mousePos = Input.mousePosition;
		move = Vector3(mousePos.x, mousePos.y, 0) - Vector3(lastPosition.x, lastPosition.y, 0);
		//move = cam.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y, camTransform.position.z - myTransform.position.z)) - rigidbody.transform.position;
		//move = (Mathf.Abs(move.x) >= Mathf.Abs(move.y)) ? Vector3(move.x, 0, 0): Vector3(0,move.y,0);
		meanMove += move;
		numUpdates++;
		if(numUpdates >= 5) {
			meanMove = (Mathf.Abs(meanMove.x) >= Mathf.Abs(meanMove.y)) ? Vector3(meanMove.x, 0, 0): Vector3(0, meanMove.y, 0);
			directionalFlag = (meanMove.x == 0) ? "yDirection" : "xDirection";
			meanMove = Vector3(0,0,0);
			numUpdates = 0;
		}
		//move.z = 0.0;
	}
	
}
 
@script RequireComponent(Rigidbody)