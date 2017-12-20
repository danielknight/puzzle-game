#pragma strict

var beam_1 : GameObject;
var beam_2 : GameObject;
var beam_3 : GameObject;
var beam_4 : GameObject;
var explosion : GameObject;
var animator : Animator;

//function Start () {
//
//}

function Update () {
	if(Input.GetKeyDown(KeyCode.Space)) {
		Instantiate(beam_1, transform.position, transform.rotation);
		animator.SetTrigger("Fire");
	}
}

function OnTriggerEnter(other : Collider) {
	if(other.gameObject.tag == "Enemy") {
		if(PointManager.life == 0) {
			GameOverTrigger.speed = 1;
			Instantiate(explosion, transform.position, transform.rotation);
			Destroy(gameObject);
		} else
			PointManager.life--;
	}
}

function shootRed(){		
	Instantiate(beam_1, transform.position, beam_1.transform.rotation);
	animator.SetTrigger("Fire");
}
function shootBlue(){		
	Instantiate(beam_2, transform.position, beam_1.transform.rotation);
	animator.SetTrigger("Fire");
}
function shootGreen(){		
	Instantiate(beam_3, transform.position, beam_1.transform.rotation);
	animator.SetTrigger("Fire");
}
function shootWhite(){		
	Instantiate(beam_4, transform.position, beam_1.transform.rotation);
	animator.SetTrigger("Fire");
}

/*function OnGUI() {
	if(GUI.Button(new Rect(Screen.width/2-150, Screen.height/2+220, 100, 30), "RED")) {
		Instantiate(beam_1, transform.position, beam_1.transform.rotation);
		animator.SetTrigger("Fire");
	}
	
	if(GUI.Button(new Rect(Screen.width/2-50, Screen.height/2+220, 100, 30), "BLUE")) {
		Instantiate(beam_2, transform.position, beam_1.transform.rotation);
		animator.SetTrigger("Fire");
	}
	
	if(GUI.Button(new Rect(Screen.width/2+50, Screen.height/2+220, 100, 30), "GREEN")) {
		Instantiate(beam_3, transform.position, beam_1.transform.rotation);
		animator.SetTrigger("Fire");
	}
	
	if(GUI.Button(new Rect(Screen.width/2+150, Screen.height/2+220, 100, 30), "WHITE")) {
		Instantiate(beam_4, transform.position, beam_1.transform.rotation);
		animator.SetTrigger("Fire");
	}
}*/
