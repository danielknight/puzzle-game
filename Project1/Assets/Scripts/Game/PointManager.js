#pragma strict

static var score = 0;
static var life = 3;
static var killed = false;
static var hit = false;
static var battery = 0;
var combo = 0;
var counter = 0.0f;
var comboEffect : GameObject;
var lifeChargedEffect : GameObject;
var effectPosition : GameObject;


function Start () {
	score = 0;
	life = 3;
	killed = false;
	hit = false;
	battery = 0;
	combo = 0;
	counter = 0.0f;

}

function Update () {
	if(counter < 0.0f)
		combo = 0;
	
	if(hit) {
		score += 100;	
		hit = false;
	}
	
	if(killed) {
		combo++;
		if(combo > 1) {
			Instantiate(comboEffect, effectPosition.transform.position, effectPosition.transform.rotation);
		}
		counter = 2.5f;
		score += 100 + 50 * combo;
		killed = false;
	}
	
	counter -= Time.deltaTime;
	
	
	if(battery == 3){
		life++;
		Instantiate(lifeChargedEffect, effectPosition.transform.position, effectPosition.transform.rotation);
		battery = 0;
	}
}

function OnGUI() {
	GUI.Label(new Rect(10,10,200,20), "SCORE : " + PointManager.score.ToString());
	GUI.Label(new Rect(10,30,200,20), "LIVES : " + PointManager.life.ToString());
}