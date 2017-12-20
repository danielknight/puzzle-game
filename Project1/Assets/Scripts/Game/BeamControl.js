#pragma strict

var speed = 20;

//function Start () {
//
//}

function Update () {
	var moveAmt = speed * Time.deltaTime;
	transform.Translate(Vector3.right * moveAmt);
	
	if(transform.position.x > 7) {
		Destroy(gameObject);
	}

}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Enemy") {
		Destroy(gameObject);
	}
}