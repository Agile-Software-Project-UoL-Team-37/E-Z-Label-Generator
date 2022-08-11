//do not use
//do not delete

//global variables that will store the toolbox colour palette
//amnd the helper functions
// var toolbox = null;
// var colourP = null;
// var helpers = null;

//spray can object literal
// sprayCan = {
//     name: "sprayCanTool",
//     icon: "assets/sprayCan.jpg",
//     points: 13,
//     spread: 10,
//     draw: function(){
//         //if the mouse is pressed paint on the canvas
//         //spread describes how far to spread the paint from the mouse pointer
//         //points holds how many pixels of paint for each mouse press.
//         if(mouseIsPressed){
//             for(var i = 0; i < this.points; i++){
//                 point(random(mouseX-this.spread, mouseX + this.spread), 
//                     random(mouseY-this.spread, mouseY+this.spread));
//             }
//         }
//     }
// };

function preload()
{
	
}

function setup() {

	//do not use
	//do not delete
	
	// var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	// c.parent("content");

	

	// //create helper functions and the colour palette
	// helpers = new HelperFunctions();
	// colourP = new ColourPalette();

	// //create a toolbox for storing the tools
	// toolbox = new Toolbox();

	// //add the tools to the toolbox.
	// toolbox.addTool(new FreehandTool());
	// toolbox.addTool(new LineToTool());
	// toolbox.addTool(sprayCan);
	// toolbox.addTool(new mirrorDrawTool());
	// background(255);

}

function draw() {

	//do not use
	//do not delete

}



/////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////
////////////////////			GLOBALS			/////////////////////////////
/////////////////////////					/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
var namesPanelContainer;
var GLOBAL_ROW_HEIGHT = 50;
var GLOBAL_COLUMN_DIVISION = 22;
var GLOBAL_COLUMN_WIDTH;// = namesPanelContainer.size().width / GLOBAL_COLUMN_DIVISION;
var GLOBAL_NAMES_LIST = [];


var trashcanAR;
var trashcanMain;
var trashcanHighlightMain;


/////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////
////////////////////		PREVIEW PANEL		/////////////////////////////
/////////////////////////					/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//all names canvas should be prefrixed with names
var namesP5 = function (names)
{
	var newRowButton;
	
	//var trashcanActiveMain = null;
	names.preload = function()
	{
		loadImage("assets/Trashcan Icon/trashcan4.png", trashcantemp =>
		{
			trashcanMain = trashcantemp;
			trashcanAR = trashcantemp.width/trashcantemp.height;
			console.log(trashcanAR);
			//trashcanActiveMain = trashcanMain;
		});

		loadImage("assets/Trashcan Icon/trashcan2.png", trashcanHtemp =>
		{
			trashcanHighlightMain = trashcanHtemp;
		});
	}
	
	names.setup = function()
	{
		
		
		namesPanelContainer = select('#names-panel-container');
		var namesPanelCanvas = names.createCanvas(namesPanelContainer.size().width, namesPanelContainer.size().height);
		namesPanelCanvas.mousePressed(names.checkIfMouseClicked)
		namesPanelCanvas.mouseOver(names.checkIfMouseHovered)
		GLOBAL_COLUMN_WIDTH = namesPanelContainer.size().width / GLOBAL_COLUMN_DIVISION;
		namesPanelCanvas.parent('names-panel-container');
		
		newRowButton = createButton("ADD ROW");
		newRowButton.parent(namesPanelContainer);
		newRowButton.position(0, (GLOBAL_NAMES_LIST.length+1)* GLOBAL_ROW_HEIGHT);
		newRowButton.size(namesPanelContainer.size().width, GLOBAL_ROW_HEIGHT);
		newRowButton.mouseClicked(names.initNewRow);

		

		
		
		//---------------------------------- // TEST DATA //-----------------------------------------------------------
		names.initNewRow();
		GLOBAL_NAMES_LIST[0].rowData.setData(10, false, "Didier", "subtext1", "#0000ff", "assets/100x100p/27.png");
		GLOBAL_NAMES_LIST[0].refreshPageData();

		names.initNewRow();
		GLOBAL_NAMES_LIST[1].rowData.setData(5, true, "JD", "subtext2 bing bong", "#f00fff", "assets/100x100p/26.png");
		GLOBAL_NAMES_LIST[1].refreshPageData();

		names.initNewRow();
		GLOBAL_NAMES_LIST[2].rowData.setData(1, true, "BRIAN", "SUBTEXT TESTING", "#ff0000", "assets/100x100p/21.png");
		GLOBAL_NAMES_LIST[2].refreshPageData();
		
		names.refreshArrayIndices();
		//---------------------------------- // TEST DATA //-----------------------------------------------------------
	}

	
	names.checkIfMouseClicked = function()
	{
		for (const name in GLOBAL_NAMES_LIST)
		{
			GLOBAL_NAMES_LIST[name].mousePressed(names);
		}
	}

	names.checkIfMouseHovered = function()
	{
		for (const name in GLOBAL_NAMES_LIST)
		{
			GLOBAL_NAMES_LIST[name].mouseOver(names);
		}
	}
	
	//Updates Canvas size if rows become more than the height of the canvas
	names.updateCanvasSize = function()
	{
		if((GLOBAL_NAMES_LIST.length+2) * GLOBAL_ROW_HEIGHT > namesPanelContainer.size().height)
		{
			names.resizeCanvas(namesPanelContainer.size().width, (GLOBAL_NAMES_LIST.length+2) * GLOBAL_ROW_HEIGHT);
		}
	}
	
	//Initialises new default row
	names.initNewRow = function()
	{
		//specific handle for when list is empty
		if(GLOBAL_NAMES_LIST.length == 0)
		{
			var temp = new RowFormatting(names);
			temp.setup();
			temp.setPosition(0);
			temp.setPadding(0,0);
			temp.setGlobalRowSize(namesPanelContainer.size().width, GLOBAL_ROW_HEIGHT);
			temp.refreshPageData();
			//temp.setTrashcanImages(trashcanMain,trashcanHighlightMain);
			GLOBAL_NAMES_LIST[GLOBAL_NAMES_LIST.length] = temp;
			
		}
		else
		{
			var temp = new RowFormatting(names);
			temp.setup();
			temp.setPosition(GLOBAL_NAMES_LIST.length);
			temp.setPadding(0,0);
			temp.setGlobalRowSize(namesPanelContainer.size().width, GLOBAL_ROW_HEIGHT);
			//temp.setTrashcanImages(trashcanMain,trashcanHighlightMain);
			GLOBAL_NAMES_LIST[GLOBAL_NAMES_LIST.length] = temp;

			//fullNamesList[fullNamesList.length-1].rowData.setData(2, false, "Didier", "subtext1", "#ffff00", "assets/100x100p/27.png");
			GLOBAL_NAMES_LIST[GLOBAL_NAMES_LIST.length-1].refreshPageData();
			
		}

		newRowButton.position(0, (GLOBAL_NAMES_LIST.length+1)* GLOBAL_ROW_HEIGHT);
		names.updateCanvasSize();
		
	}
	
	//Resets IDs when an item is deleted
	names.refreshArrayIndices = function()
	{
		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			GLOBAL_NAMES_LIST[i].setID(i);
			GLOBAL_NAMES_LIST[i].setPosition(i);
			GLOBAL_NAMES_LIST[i].saveData();
			GLOBAL_NAMES_LIST[i].refreshPageData();
			
		}
	}
	

	names.draw = function()
	{
		
		names.background(255,255,255,150);
		
		//Header
		names.fill(0,0,0);
		names.rect(0,0, namesPanelContainer.size().width ,GLOBAL_ROW_HEIGHT);

		//Checks for delete flags and draws each row
		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			if(GLOBAL_NAMES_LIST[i].deleteFlag)
			{
				GLOBAL_NAMES_LIST[i].deleteAllHTML();
				GLOBAL_NAMES_LIST.splice(i,1);
				names.refreshArrayIndices();
				continue;
			}
			
			GLOBAL_NAMES_LIST[i].draw();
		}

		//updates "add row" button position (required if new rows are added/removed)
		newRowButton.position(0, (GLOBAL_NAMES_LIST.length+1)* GLOBAL_ROW_HEIGHT);

	}
	
};

new p5(namesP5);






/////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////
////////////////////		PREVIEW PANEL		/////////////////////////////
/////////////////////////					/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//all preview canvas should be prefrixed with names
var previewP5 = function (preview)
{
	preview.setup = function()
	{
		

		previewPanelContainer = select('#preview-panel-container');
		var previewPanelCanvas = preview.createCanvas(namesPanelContainer.size().width, 800);
		previewPanelCanvas.parent('preview-panel-container');


		
	}

	preview.draw = function()
	{
		//test code
		preview.background(255,255,255,150);
		preview.fill(255,0,0);
		preview.rect(0,0, 50,50);
		preview.ellipse(preview.width/2 + 10, preview.height/2 + 20, 30);

		
	}
};

new p5(previewP5);


/////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////
////////////////////		TEMPLATES PANEL		/////////////////////////////
/////////////////////////					/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//all templates canvas should be prefrixed with names
var templatesCanvas = function (templates)
{	
	
	var checkbox;
	var button;

	templates.preload = function(){
		templates.img = templates.loadImage("assets/100x100p/1.png");
	}
	templates.setup = function()
	{
		templatesPanelContainer = select('#templates-panel-container');


		// var rect = templatesPanelContainer.getBoundingClientRect();
		// console.log(rect.top, rect.right, rect.bottom, rect.left);

		var templatesPanelCanvas = templates.createCanvas(templatesPanelContainer.size().width, 200);
		templatesPanelCanvas.parent('templates-panel-container');
		templates.noLoop();
		templates.x = 0;
		// templates.rectMode(CENTER);;
		// button.position(templates.position().x, templates.position().y);
	}

	templates.draw = function()
	{
		//test code
		templates.hight = templates.height;
		templates.width = templates.width;
		templates.background(255,255,255,150);
		templates.push();
		templates.fill(203,210,222);
		templates.rect(templates.width/2, 30, templates.width, 55, 15);
		templates.pop();

		templates.push();
		templates.fill(255);
		templates.rect(0, 30, templates.width/2, 40, 10);
		templates.pop();

		templates.push();
		templates.fill(0);
		templates.text("something",20,35);
		templates.pop();

		templates.image(templates.img, 0, 0,30,30);
		textSize(32);
		button = createButton('click me');
		button.parent(templatesPanelContainer);
		button.position(0,0);

		
		// p5 element ==> Dom element	

		console.log(templates);
		checkbox = createCheckbox('', false);
		checkbox.parent(templatesPanelContainer);

		checkbox.position(0,50);
		

	}
};

var templateP5 =  new p5(templatesCanvas);

var temp = document.getElementById("templates-panel-container");;

console.log(document);
