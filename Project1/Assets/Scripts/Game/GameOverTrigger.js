#pragma strict

static var speed = 0.0f;
var counter : float = 2;
var moveAmt : float;

function Start () {
	speed = 0;
}

function Update () {

	moveAmt = speed * Time.deltaTime;
	transform.Translate(Vector3.right * moveAmt);
	
	if(transform.position.x > counter) {
		Application.LoadLevel("GameOver");
	}
}