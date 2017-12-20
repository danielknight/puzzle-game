using UnityEngine;
using System.Collections;
using NUnit.Framework;
using System;


[TestFixture]
public class UnitTest1{
	[Test]
	public void TestStarshipExists ()
	{
		GameObject go = GameObject.Find ("Starship");
		Assert.NotNull (go);
	}

	/*[Test]
	public void TestDimensionsOnSpawn(){
		GameObject go = GameObject.Find ("Board");
		int board = go.GetComponent (typeof(Board));

		var width = board.SendMessage ("getHeight");
		//var height = board.SendMessage ("getHeight");
		Assert.Equals(5, width);
		//Assert.Equals (height, 5);

	}*/

	[Test]
	public void TestBoardExists() {
		GameObject board = GameObject.Find ("Board");
		Assert.NotNull (board);
	}

	[Test]
	public void TestResetAmmo() {
		//GameObject board = GameObject.Find ("Board");

		Board boardScript = GameObject.Find ("Board").GetComponent<Board>();
		boardScript.resetAmmo();

		Assert.AreEqual(0, boardScript.redAmmo);
		Assert.AreEqual(0, boardScript.blueAmmo);
		Assert.AreEqual(0, boardScript.greenAmmo);
		Assert.AreEqual(0, boardScript.whiteAmmo);
	}

	[Test]
	public void TestRedAmmo() {
		Board boardScript = GameObject.Find ("Board").GetComponent<Board>();
		boardScript.resetAmmo();

		boardScript.redAmmo = 3;
		boardScript.spawner.enemyQueue.Clear ();
		boardScript.spawner.enemyQueue.Add("enemyType1");
		boardScript.shoot ();
		Assert.AreEqual(0, boardScript.redAmmo);
	}

	[Test]
	public void TestBoardWidth() {
		Board boardScript = GameObject.Find ("Board").GetComponent<Board>();
		Assert.AreEqual (5, boardScript.getWidth ());
	}

	[Test]
	public void TestRepurpose() {
		Board boardScript = GameObject.Find ("Board").GetComponent<Board>();

		// Reset ammo
		boardScript.resetAmmo();
		boardScript.curType = "White";

		// Match 3 whites
		// @todo Make the Vector2 nested inside another Vector2
		/*Vector2 matchData = new Vector2();
		matchData [0] = new Vector2 (0,1);
		matchData [1] = new Vector2(0, 3);
		//Vector2 matchData. = new Vector2 (0, 4);*/

		// Check that ammo is now 1
		Assert.AreEqual (1, boardScript.whiteAmmo);
	}
}
