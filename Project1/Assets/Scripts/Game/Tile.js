#pragma strict

var tileMats : String[] = [ "Blue", "Red", "Green", "White" ];
var color : String;
var sphere : GameObject;
var type : String;

function createGem(){
	color = tileMats[Random.Range(0, tileMats.Length)];
	type = color;
	var m : Material =  Resources.Load("Materials/" + color) as Material;
	sphere.renderer.material = m;
}

function Start () {
	createGem();
}

function changeType(oldType) {
	color = tileMats[Random.Range(0, tileMats.Length)];
	while(color == oldType ){
		color = tileMats[Random.Range(0, tileMats.Length)];
	}
	type = color;
	var m : Material =  Resources.Load("Materials/" + color) as Material;
	sphere.renderer.material = m;
	//Debug.Log("tile changed");
}

function Update () {
	
}