#pragma strict

var speed = Respawner.enemySpeed;
var explosion : GameObject;
var spark : GameObject;
var energy = 3;
var spawnManager : Respawner;
var go : GameObject;
go = GameObject.Find("EnemyRespawner");
spawnManager = go.GetComponent(typeof(Respawner));

//function Start () {
//
//}

function Update () {
	speed = Respawner.enemySpeed;
	
	var moveAmt = speed * Time.deltaTime;
	transform.Translate(Vector3.left * moveAmt, Space.World);
	transform.Rotate(0,0,30*Time.deltaTime);
	
}

function OnTriggerEnter(other : Collider) {
	energy -= 1;
	if(other.gameObject.tag == "Beam4" || energy == 0) {
		Instantiate(explosion, transform.position, transform.rotation);
		Destroy(gameObject);
		PointManager.battery++;
		PointManager.killed = true;
		spawnManager.enemyQueue.RemoveAt(0);
		//Debug.Log(spawnManager.enemyQueue[0]);
	} else if (other.gameObject.tag == "Starship") {
		Instantiate(explosion, transform.position, transform.rotation);
		Destroy(gameObject);
		spawnManager.enemyQueue.RemoveAt(0);
		Debug.Log(spawnManager.enemyQueue[0]);
	} else {
		PointManager.hit = true;
		Instantiate(spark, transform.position, transform.rotation);
	}
}