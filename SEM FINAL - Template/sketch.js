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



	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	// if (toolbox.selectedTool.hasOwnProperty("draw")) {
	// 	toolbox.selectedTool.draw();
	// } else {
	// 	alert("it doesn't look like your tool has a draw method!");
	// }

	
}

let listOfNames = [];

//all names canvas should be prefrixed with names
var namesP5 = function (names)
{

	names.setup = function()
	{
		listOfNames[listOfNames.length] = new NameData();
		listOfNames[listOfNames.length] = new NameData();

		//test data
		listOfNames[0].populateData(2, false, "ALX", "subtext1", color(0,0,0), "1.png");
		listOfNames[1].populateData(4, true, "JD", "subtext2", color(225,255,255), "test.2jpg");

		// console.log(listOfNames);

		namesPanelContainer = select('#names-panel-container');
		var namesPanelCanvas = names.createCanvas(namesPanelContainer.size().width, 400);
		namesPanelCanvas.parent('names-panel-container');

		//test code
		customUI = new CustomUI();
		customUI.w = namesPanelContainer.size().width;
		customUI.h = 50;
		customUI.x = 0;
		customUI.y = 0;
		customUI.color = listOfNames[0].color;
		//------------
	}

	names.draw = function()
	{
		//test code
		names.background(255,255,255,150);
		names.fill(0,0,0);
		names.rect(0,0, 50,50);
		names.ellipse(names.width/2, names.height/2, 30);

		// names.customUI.draw();

	}
	
};

new p5(namesP5);




//
//all preview canvas should be prefrixed with preview
var previewP5 = function (preview)
{
	preview.setup = function()
	{
		previewPanelContainer = select('#preview-panel-container');
		var previewPanelCanvas = preview.createCanvas(namesPanelContainer.size().width, 800);
    previewPanelCanvas.parent('preview-panel-container');
    
    myImage1 = loadImage('assets/100x100p/1.png');
	}

	preview.draw = function()
	{
		//test code
		preview.background(255,255,255,150);
		preview.fill(255,255,0);
		preview.rect(0,0,100,50);
		// preview.ellipse(preview.width/2, preview.height/2, 30);

    
    //
    preview.image(myImage1, 5, 5, 30, 30);
    preview.fill(0, 100, 255);
    preview.text(listOfNames[0].name, 40, 20);
    preview.fill(0, 100, 255);
    preview.text(listOfNames[0].subtext, 40, 40);

    preview.stroke(240, 240, 240);
    preview.strokeWeight(1);
    preview.line(0, 50, 200, 50);
    preview.line(100, 0, 100, 200);
	}
};

new p5(previewP5);



//all templates canvas should be prefrixed with names
var templatesCanvas = function (templates)
{	
	
	var checkbox;
	var button;

	templates.preload = function(){
		templates.img = templates.loadImage("/assets/100x100p/1.png");
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
