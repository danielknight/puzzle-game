#pragma strict

//function Start () {
//
//}

//function Update () {
//
//}

function OnGUI() {
	GUI.Button(new Rect(Screen.width/2-150, Screen.height/2-45, 300, 90), "GAME OVER");
	if(GUI.Button(new Rect(Screen.width/2+200, Screen.height/2+150, 180, 50), "TO TITLE")) {
		Application.LoadLevel("TITLE");
	}
}