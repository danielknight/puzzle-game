#pragma strict


import System.Collections.Generic;

var tiles : Tile[,] = new Tile[5,5];
var gridWidth : int;
var gridHeight : int;
var tilePrefab : Tile;
var tileTypes : Tile[];
var start : int = 0;
var endIndex : int = 0;
var curType : String;
var nextType : String;
var matchData : Vector2[] = new Vector2[2];
var whiteAmmo : int = 0;
var redAmmo : int = 0;
var blueAmmo : int = 0;
var greenAmmo : int = 0;
public var shipControl : StarshipControl;
public var spawner : Respawner;
var explosion: GameObject;



function Start () {
	var i : int;
	var j : int = 0;
	for(var y=0; y<gridHeight; y++) {
		i = 0;
		for(var x=0; x<gridWidth; x++) {
			var t : Tile = Instantiate(tilePrefab, Vector3(x-2,y-3,0), Quaternion.identity);
			t.transform.parent = gameObject.transform;
			tiles[i++,j] = t;
		}
		j++;
	}
	//gameObject.transform.position = new Vector3(0, 1.01f, 0);
}

function getWidth() { return gridWidth;}

function getHeight(){return gridHeight;}

function isMatch(board : Tile[,]) {
	//loop thru rowspaces
	for( var i = 0; i < gridHeight; i++) {
		if(threeRowTilesMatch(tiles, i)){
			return true;
		}
	}
	//loop thru col space
	for( i = 0 ; i <gridWidth; i++) {
		if(threeColTilesMatch(tiles, i)){
			return true;
		}
	}
	return false;
}


function threeRowTilesMatch(board : Tile[,], row : int){//assumes checking left to right, increasing
	start = 0;
	endIndex = 0;
	curType = board[0,row].type;
	for( var i = 0; i<gridWidth-1; i++) {
		if((endIndex - start) < 2 ) {
			if(board[i+1,row].type != curType) {
				curType = board[i+1,row].type;
				start = i + 1;
				endIndex = start;
			} 
			else endIndex++;
		}
		else{
			if(board[i+1,row].type != curType) {
				// return start idx, end idx and true (catches 3 and 4 match cases)
				matchData[0] = Vector2(start,row);
				matchData[1] = Vector2(endIndex, row);
				return matchData;
			}
			else endIndex++;
		}
	}
	if(endIndex - start >= 2){
		//return start idx, end idx and true  (catches all 5 match case)
		matchData[0] = Vector2(start,row);
		matchData[1] = Vector2(endIndex, row);
		return matchData;
	}
	return null;
}

function threeColTilesMatch( board : Tile[,], col : int) { 
	//checks at the bottom of each row, upwards, looking for matches along the way; 
    //board is a two dimensional tile array, column is the current x-location we are searching upwards
	start = 0;
	endIndex = 0;
	curType = board[col,0].type;
	for(var i = 0; i < gridHeight-1; i++) {
		if((endIndex -start) < 2) {
			nextType = board[col, i+1].type;
			if(board[col,i+1].type != curType) {
				curType = board[col, i+1].type;
				start = i+1;
				endIndex = start;
			}
			else endIndex++;
		}
		else {
			if(board[col, i+1].type != curType) {
				matchData[0] = Vector2(col, start);
				matchData[1] = Vector2(col, endIndex);
				return matchData;
			}
			else endIndex++;
		}
	}
	if(endIndex-start >=2) {
		matchData[0] = Vector2(col, start);
		matchData[1] = Vector2(col, endIndex);
		return matchData;
	}	
	return null;
}

function updatePoints(matchData : Vector2[]){
	//needs implementation
}

function castTransition(matchData : Vector2[]){
	//needs implementation
}


function repurpose(matchData : Vector2[]){
	var x0 : float = matchData[0].x;
	var x1 : float = matchData[1].x;
	var y0 : float = matchData[0].y;
	var y1 : float = matchData[1].y;
	var prevType = curType;
	if(x0 == x1){ //then we have a column match
		for(  ; y0 <= y1; y0++){
			tiles[x0,y0].changeType(prevType);
			prevType = tiles[x0,y0].type;
			Instantiate(explosion, tiles[x0,y0].transform.position, tiles[x0,y0].transform.rotation);
		} 
	} else { //we have a row match
		for( ; x0<=x1; x0++ ) {
			tiles[x0,y0].changeType(prevType);
			prevType = tiles[x0,y0].type;
			Instantiate(explosion, tiles[x0,y0].transform.position, tiles[x0,y0].transform.rotation);
		}
	}
}

function updateBoard() {
	var i : int = 0;
	var j : int = 0;
	var updateCounter= 1;
	for(var y=0; y<gridHeight; y++) { //check board positons (units of 1)
		for(var x=0; x<gridWidth; x++) {
			var tile : Tile = Physics.OverlapSphere(Vector3(x-2,y-3,0), .5)[0].gameObject.GetComponent(typeof(tilePrefab)) as Tile; //[0].attachedRigidbody.mass;
			//Debug.Log(Physics.OverlapSphere(Vector3(x,y,0), .5).length);
			//Debug.Log(tile.type + 'is color of ['+x+" , " + y+ "]");
			tiles[i,j] = tile;  
			//Debug.Log(tiles[0,y].type +"is the type of [0," + y +"]");
			//Debug.Log("Tile["+x+","+ y+ "] color:" +tiles[i,j].color);
			if(i<gridWidth-1) i++;
			else i = 0;
		}
		if(j<gridHeight-1) j++;
		else j = 0;
	}
	if( isMatch(tiles) ) {
		updateCounter++;
		//Debug.Log("A Match exists from " + matchData[0] + " to " + matchData[1]);
		//typeOfMatch = tiles[matchData[0].x,matchData[0].y].type;
		Debug.Log(curType +" should equal " + tiles[matchData[0].x, matchData[0].y].type);
		if(curType == "Red") redAmmo++;
		if(curType == "White") whiteAmmo++;
		if(curType == "Green") greenAmmo++;
		if(curType == "Blue") blueAmmo++;
		castTransition(matchData);
		repurpose(matchData);
		//shipControl.shoot();	
		updateBoard();
	}
	Debug.Log(updateCounter);	
}

function shoot(){
	if(spawner.enemyQueue.Count != 0){
		if(spawner.enemyQueue[0] === "enemyType1" && redAmmo > 0 ){ 
			shipControl.shootRed();
			resetAmmo();			
			return;
		}
		if(spawner.enemyQueue[0] === "enemyType2" && blueAmmo > 0){ 
			shipControl.shootBlue();
			resetAmmo();
			return;
		}
		if(spawner.enemyQueue[0] === "enemyType3" && greenAmmo > 0){ 
			shipControl.shootGreen();
			resetAmmo();
			return;
		}
		if(spawner.enemyQueue[0] === "enemyType4" && whiteAmmo > 0){ 
			shipControl.shootWhite();
			resetAmmo();
			return;
		}
	}
	else return;
}

function resetAmmo(){
	redAmmo = 0;
	blueAmmo = 0;
	greenAmmo = 0;
	whiteAmmo = 0;
}

function getCurType(){return curType;}

function logAmmo(){ Debug.Log("white: " + whiteAmmo + "\nred: " + redAmmo + "\nblue: " + blueAmmo + "\ngreen: " + greenAmmo);}


function Update () {
	
}
