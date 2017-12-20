#pragma strict

function OnGUI(){

	GUI.color = Color.green;
	
	if(GUI.Button(Rect(Screen.width - 80, Screen.height - 50, 70, 30), "Go Back")){
		Application.LoadLevel("Title");
	}
}