#pragma strict

//function Start () {
//
//}

//function Update () {
//
//}

function OnGUI() {
	// Add green coloring to UI buttons
	GUI.color = Color.green;
	
	// Add UI button to screen
	if(GUI.Button(new Rect((Screen.width/2-30)-50, (Screen.height/2-30)+50, 200, 60), "GAME START!!")) {
		Application.LoadLevel("StarshipCrisis");
	}
	if(GUI.Button(new Rect((Screen.width/2-30)-50, (Screen.height/2-30)+150, 200, 60), "CREDITS")) {
		Application.LoadLevel("Credits");
	}
}