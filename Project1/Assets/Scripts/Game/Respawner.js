#pragma strict
import System.Collections.Generic;

var enemyType1 : GameObject;
var enemyType2 : GameObject;
var enemyType3 : GameObject;
var enemyType4 : GameObject;
var frequency = 2.0f;
static var enemySpeed = 1.5f;
var respawning = 0.0f;
var enemyQueue : List.<String> = new List.<String>();


//function Start () {
//
//}

function Update () {
	if(PointManager.score < 4000) {
		frequency = 4.5f;
		enemySpeed = 1.0f;
	} else if (4000 <= PointManager.score && PointManager.score < 15000) {
		frequency = 3.5f;
		enemySpeed = 1.25f;
	} else if (15000 <= PointManager.score && PointManager.score < 30000) {
		frequency = 2.5f;
		enemySpeed = 1.5f;	
	} else if (30000 <= PointManager.score && PointManager.score < 50000) {
		frequency = 1.5f;
		enemySpeed = 2.0f;	
	} else if (50000 <= PointManager.score) {
		frequency = 0.7f;
		enemySpeed = 2.5f;	
	}
	
	//enqueue the enemy to enemeyQueue if it gets spawned
	if(respawning < 0.0f) {
		switch(Random.Range(1,5)) {
		case 1:
			Instantiate(enemyType1, transform.position, transform.rotation);
			enemyQueue.Add("enemyType1");
			
			break;
		case 2:
			Instantiate(enemyType2, transform.position, transform.rotation);
			enemyQueue.Add("enemyType2");
			break;
		case 3:
			Instantiate(enemyType3, transform.position, transform.rotation);
			enemyQueue.Add("enemyType3");
			break;
		case 4:
			Instantiate(enemyType4, transform.position, transform.rotation);
			enemyQueue.Add("enemyType4");
			break;
		}
		Debug.Log(enemyQueue);
		
		respawning = frequency;
	}
	respawning -= Time.deltaTime;
}