/* Points Handeler
 * @todo: Need to add a listener call
 */

#pragma strict
import UnityEngine.UI;

// Total points counter
private var totalPoints:int;

// Reference to the text
private var displayText:UI.Text;

function Start () {
	displayText = GetComponent.<Text>();
	displayText.text = "Score: 0";
}

// Updates the scores
function Update () {
	displayText.text = "Score: "+totalPoints;	
}

// Call this function with a listener
function calculatePoints(matchData : Vector2[]) {
	var total:int = matchData[1][1]-matchData[0][1]+1;
	totalPoints += total;
}