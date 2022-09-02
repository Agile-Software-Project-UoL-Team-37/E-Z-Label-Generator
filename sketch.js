var tutorialZone;
var lastTutorialMessage = "";

function preload()
{
	//do not use
	//do not delete
}

function setup()
{
	//do not use
	//do not delete
	tutorialZone = select('#tutorial-message');
	select('#defaultCanvas0').style.display = 'none';
	GLOBAL_LOADING_TEXT = select('#loading');

}

function draw()
{
	if(TUTORIAL_MESSAGE != lastTutorialMessage)
	{
		tutorialZone.html(TUTORIAL_MESSAGE);
		lastTutorialMessage = TUTORIAL_MESSAGE;
	}
	
	//do not use
	//do not delete
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
////////////////////			GLOBALS			/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var namesPanelContainer;
var previewPanelContainer;
var templatesPanelContainer;
var GLOBAL_ROW_HEIGHT = 50;
var GLOBAL_COLUMN_DIVISION = 22.5;
var GLOBAL_COLUMN_WIDTH;// = namesPanelContainer.size().width / GLOBAL_COLUMN_DIVISION;
var GLOBAL_NAMES_LIST = [];
var GLOBAL_NAMES_HEADER;
var GLOBAL_DEFAULT_IMAGE;
var GLOBAL_REFRESH_FLAG = false;
var GLOBAL_TEMPLATES_LIST = [];
var headerOffsetMultiplier = 3;
var GLOBAL_DEFAULT_SUBTEXT = "";
var GLOBAL_DEFAULT_COLOR = "#3b43cc";
var GLOBAL_PAGE_WIDTH = 595; //page width - (CAREFUL WITH THIS VALUE - IT BREAKS STUFF FOR LITERALLY NO REASON)
var GLOBAL_PAGE_HEIGHT = 841;
var deleteImageMode = false;
var GLOBAL_TEMPLATE_FILL_DATA;
var GLOBAL_PREVIEW_PAGE_REFRESH_FLAG = true;
var GLOBAL_FLASH_REFRESH_BUTTON_FLAG = true;
var GLOBAL_LOADING_TEXT = false;

var TUTORIAL_MESSAGE = "";

var PDF;
var headerFont;

var trashcanAR;
var trashcanMain;
var trashcanHighlightMain;

var GLOBAL_LIST_OF_IMAGES = [];

function activateFlash()
{
	GLOBAL_FLASH_REFRESH_BUTTON_FLAG = true;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
////////////////////		NAMES PANEL			/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//all names canvas should be prefrixed with names
var namesP5 = function (names)
{
	var newRowButton;
	var newRowButton2;
	var numberOfRowsPerPage = 17;
	var isNamesListHidden = false;
	var currentRowIndexImageSelection;
	const IMAGE_COLUMN_AMOUNT = 5;
	var IMAGE_BLOCK_SIZE;
	var imageRows;
	var imageDrawCounter = 0;
	var namesPanelCanvasSizeUpdateFlag = false;
	var imageHeaderHeight;
	
	var addImageButton;
	var deleteImageButton;
	//var randomiseImagesButton;
	
	
	//var trashcanActiveMain = null;
	names.preload = function()
	{
		headerFont = loadFont('assets/fonts/Gobold Regular.otf');
		

		for (let i = 0; i < 53; i++)
		{
			if(GLOBAL_LIST_OF_IMAGES.length == 0)
			{
				GLOBAL_LIST_OF_IMAGES[0] = null;
				GLOBAL_LIST_OF_IMAGES[1] = null;
				i = 1;
				continue;
			}
			

			loadImage("assets/100x100p/" + i + ".png", imageTemp =>
			{
				var temp = new ImageFormatting(names);
				temp.setImage(imageTemp);
				temp.setPadding(5);

				GLOBAL_LIST_OF_IMAGES[GLOBAL_LIST_OF_IMAGES.length] = temp;
			});
			
		}
		
		loadImage("assets/Trashcan Icon/trashcan4.png", trashcantemp =>
		{
			trashcanMain = trashcantemp;
			trashcanAR = trashcantemp.width/trashcantemp.height;
			
			//trashcanActiveMain = trashcanMain;
		});

		loadImage("assets/Trashcan Icon/trashcan2.png", trashcanHtemp =>
		{
			trashcanHighlightMain = trashcanHtemp;
		});

		loadImage("assets/100x100p/noImage.png", imageTemp =>
		{
			var temp = new ImageFormatting(names);
			temp.setImage(imageTemp);
			temp.setPadding(5);

			GLOBAL_LIST_OF_IMAGES[0] = temp;
		});

		loadImage("assets/100x100p/randomImage.png", imageTemp =>
		{
			var temp = new ImageFormatting(names);
			temp.setImage(imageTemp);
			temp.setPadding(5);

			GLOBAL_LIST_OF_IMAGES[1] = temp;
		});
		
	}
	
	names.toggleDeleteImageMode = function()
	{
		if(!deleteImageMode)
		{
			deleteImageMode = true;
			deleteImageButton.addClass("delete-mode-on");
			deleteImageButton.removeClass("delete-mode-off");
			deleteImageButton.html("DELETE MODE (ON)");
		}
		else
		{
			deleteImageMode = false;
			deleteImageButton.addClass("delete-mode-off");
			deleteImageButton.removeClass("delete-mode-on");
			deleteImageButton.html("DELETE MODE (OFF)");
		}
	}
	
	names.onRandomiseClicked = function()
	{
		function shuffle(array) {
			let currentIndex = array.length,  randomIndex;

			// While there remain elements to shuffle.
			while (currentIndex != 0) {

				// Pick a remaining element.
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;

				// And swap it with the current element.
				[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
			}

			return array;
		}
		
		let noImagePictureTemp = GLOBAL_LIST_OF_IMAGES[0];
		let randomImagePictureTemp = GLOBAL_LIST_OF_IMAGES[1];
		GLOBAL_LIST_OF_IMAGES.splice(0,2);
		
		shuffle(GLOBAL_LIST_OF_IMAGES);

		GLOBAL_LIST_OF_IMAGES.splice(0,0, randomImagePictureTemp);
		GLOBAL_LIST_OF_IMAGES.splice(0,0, noImagePictureTemp);
		let imageCounter = 2;

		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			if(!GLOBAL_NAMES_LIST[i].getEnabled())
			{
				continue;
			}
			
			if(imageCounter == GLOBAL_LIST_OF_IMAGES.length)
			{
				imageCounter = 2;
			}
			
			GLOBAL_NAMES_LIST[i].setImage(GLOBAL_LIST_OF_IMAGES[imageCounter].image);
			GLOBAL_NAMES_LIST[i].imageDisabled = false;
			GLOBAL_NAMES_LIST[i].saveData();
			imageCounter++;
			
		}
		
		//GLOBAL_NAMES_HEADER.setImage(randomImagePicture);
		GLOBAL_NAMES_HEADER.setImage(GLOBAL_LIST_OF_IMAGES[1].image);
		GLOBAL_NAMES_HEADER.imageSelectFlag = false;
		//GLOBAL_DEFAULT_IMAGE = GLOBAL_LIST_OF_IMAGES[image].image;

		names.refreshArrayIndices();
		isNamesListHidden = false;
		names.showNamesList();
		names.updateCanvasSize();
	}
	
	names.setup = function()
	{
		names.textFont(headerFont);
		
		
		namesPanelContainer = select('#names-panel-container');
		var namesPanelCanvas = names.createCanvas(namesPanelContainer.size().width, namesPanelContainer.size().height);
		namesPanelCanvas.mousePressed(names.checkIfMouseClicked);
		namesPanelCanvas.mouseOver(names.checkIfMouseHovered);
		GLOBAL_COLUMN_WIDTH = namesPanelContainer.size().width / GLOBAL_COLUMN_DIVISION;
		GLOBAL_ROW_HEIGHT = namesPanelContainer.size().height / numberOfRowsPerPage;
		namesPanelCanvas.parent('names-panel-container');
		imageHeaderHeight = GLOBAL_ROW_HEIGHT;
		
		newRowButton = createButton("+ ADD ROW");
		newRowButton.parent(namesPanelContainer);
		newRowButton.position(GLOBAL_ROW_HEIGHT/6, GLOBAL_ROW_HEIGHT/6); 
		newRowButton.size(100, GLOBAL_ROW_HEIGHT/1.5);//fix
		newRowButton.mouseClicked(names.initNewRow);
		newRowButton.mouseOver(() => {TUTORIAL_MESSAGE = "<b>ADD ROW BUTTON:</b> Adds a new row at the bottom of the list of names.";})
		newRowButton.addClass("add-new-row-button");

		newRowButton2 = createButton("+ ADD ROW");
		newRowButton2.parent(namesPanelContainer);
		newRowButton2.position(0, (GLOBAL_NAMES_LIST.length+headerOffsetMultiplier)* GLOBAL_ROW_HEIGHT);
		newRowButton2.size(namesPanelContainer.size().width, GLOBAL_ROW_HEIGHT);
		newRowButton2.mouseClicked(names.initNewRow);
		newRowButton2.mouseOver(() => {TUTORIAL_MESSAGE = "<b>ADD ROW BUTTON:</b> Adds a new row at the bottom of the list of names.";})
		newRowButton2.addClass("add-new-row-button");
		
		addImageButton = createFileInput(names.newImageHandler, true);
		addImageButton.parent(namesPanelContainer);
		addImageButton.position(GLOBAL_ROW_HEIGHT/4 + 150, GLOBAL_ROW_HEIGHT/4);
		addImageButton.size(98, GLOBAL_ROW_HEIGHT/2);//fix
		addImageButton.addClass("force-hide");
		addImageButton.mouseOver(() => {TUTORIAL_MESSAGE = "<b>ADD IMAGE BUTTON:</b> Upload one or multiple images from your computer.";})

		deleteImageButton = createButton("DELETE MODE (OFF)");
		deleteImageButton.parent(namesPanelContainer);
		deleteImageButton.position(namesPanelContainer.size().width - GLOBAL_ROW_HEIGHT/4 - 100, GLOBAL_ROW_HEIGHT/4);
		deleteImageButton.size(100, GLOBAL_ROW_HEIGHT/2); // fix
		deleteImageButton.addClass("force-hide");
		deleteImageButton.mouseClicked(names.toggleDeleteImageMode);
		deleteImageButton.addClass("button");
		deleteImageButton.addClass("delete-mode-off");
		deleteImageButton.mouseOver(() => {TUTORIAL_MESSAGE = "<b>DELETE-IMAGE MODE:</b> While toggled on (red); clicking an image will delete it from the list of images. Click to toggle on and off";})

		// randomiseImagesButton = createButton("RANDOMISE");
		// randomiseImagesButton.parent(namesPanelContainer);
		// randomiseImagesButton.position(namesPanelContainer.size().width - GLOBAL_ROW_HEIGHT/4 - 250, GLOBAL_ROW_HEIGHT/4);
		// randomiseImagesButton.size(100, GLOBAL_ROW_HEIGHT/2);//fix
		// randomiseImagesButton.addClass("force-hide");
		// randomiseImagesButton.mouseClicked(names.onRandomiseClicked);
		
		GLOBAL_NAMES_HEADER = new HeaderFormatting(names);
		GLOBAL_NAMES_HEADER.setup();
		namesPanelCanvas.mouseOver(names.checkIfMouseHoveredHeader);
		//GLOBAL_NAMES_HEADER.setPosition(0);
		GLOBAL_NAMES_HEADER.setPadding(0,0);
		GLOBAL_NAMES_HEADER.setGlobalRowSize(namesPanelContainer.size().width, GLOBAL_ROW_HEIGHT*headerOffsetMultiplier, headerOffsetMultiplier);
		GLOBAL_NAMES_HEADER.refreshPageData();
		
		
		
		
		//---------------------------------- // TEST DATA //-----------------------------------------------------------
		names.initNewRow();
		GLOBAL_NAMES_LIST[0].rowData.setData(1, true, "Didier", "- Belgium -", "#0000ff", "assets/100x100p/27.png");
		GLOBAL_NAMES_LIST[0].refreshPageData();

		names.initNewRow();
		GLOBAL_NAMES_LIST[1].rowData.setData(2, false, "JD", "- South Africa -", "#f00fff", "assets/100x100p/26.png");
		GLOBAL_NAMES_LIST[1].refreshPageData();

		names.initNewRow();
		GLOBAL_NAMES_LIST[2].rowData.setData(3, true, "Brian", "- China -", "#ff0000", "assets/100x100p/21.png");
		GLOBAL_NAMES_LIST[2].refreshPageData();
		
		// for(let i = 3; i <= 50; i++)
		// {
		// 	names.initNewRow();
		// 	GLOBAL_NAMES_LIST[i].rowData.setData(i, true, "NAME "+ i, "subtext " + i, "#000000", "assets/100x100p/" + i + ".png");
		// 	GLOBAL_NAMES_LIST[i].refreshPageData();
		// }

		
		
		names.refreshArrayIndices();
		//---------------------------------- // TEST DATA //-----------------------------------------------------------

		IMAGE_BLOCK_SIZE = namesPanelContainer.width/IMAGE_COLUMN_AMOUNT;
		imageRows = Math.floor(GLOBAL_LIST_OF_IMAGES.length/IMAGE_COLUMN_AMOUNT)+1;
		
		
		
		
	}

	names.newImageHandler = function(image)
	{
		if (image.type === 'image')
		{

			loadImage(image.data, imageTemp =>
			{
				var temp = new ImageFormatting(names);
				temp.setImage(imageTemp);
				temp.setPadding(5);

				GLOBAL_LIST_OF_IMAGES[GLOBAL_LIST_OF_IMAGES.length] = temp;


			});

			namesPanelCanvasSizeUpdateFlag = true;
		}

	}
	
	names.checkIfMouseClicked = function()
	{
		//IMAGES SCREEN
		if(isNamesListHidden)
		{
			for (const image in GLOBAL_LIST_OF_IMAGES)
			{
				
				if(GLOBAL_LIST_OF_IMAGES[image].tryClick(names))
				{
					//DELETE IMAGE MODE ACTIVE
					if(deleteImageMode)
					{
						if(image == 0 || image == 1)
						{
							continue;
						}
						GLOBAL_LIST_OF_IMAGES.splice(image,1);
						namesPanelCanvasSizeUpdateFlag = true;
					}
					//Global image selection
					else if(GLOBAL_NAMES_HEADER.imageSelectFlag)
					{
						for (const name in GLOBAL_NAMES_LIST) 
						{
							if(!GLOBAL_NAMES_LIST[name].getEnabled())
							{
								continue;
							}
							
							if(image == 0)
							{
								GLOBAL_NAMES_LIST[name].imageDisabled = true;
							}
							else
							{
								GLOBAL_NAMES_LIST[name].imageDisabled = false;
							}
							
							if(image == 1)
							{
								names.onRandomiseClicked();
								return;
							}
							
							GLOBAL_NAMES_LIST[name].setImage(GLOBAL_LIST_OF_IMAGES[image].image);
							GLOBAL_NAMES_LIST[name].saveData();
						}
						GLOBAL_NAMES_HEADER.setImage(GLOBAL_LIST_OF_IMAGES[image].image);
						GLOBAL_NAMES_HEADER.imageSelectFlag = false;
						GLOBAL_DEFAULT_IMAGE = GLOBAL_LIST_OF_IMAGES[image].image;

						isNamesListHidden = false;
						names.showNamesList();
						names.updateCanvasSize();
					}
					//Normal image selection
					else
					{
						//console.log(image);
						if(image == 0)
						{
							GLOBAL_NAMES_LIST[currentRowIndexImageSelection].imageDisabled = true;
						}
						else
						{
							GLOBAL_NAMES_LIST[currentRowIndexImageSelection].imageDisabled = false;
						}
						
						if(image == 1)
						{
							let randomValue = Math.floor((Math.random() * (GLOBAL_LIST_OF_IMAGES.length-2)) + 2);
							//randomValue += 2;
							console.log(randomValue);

							GLOBAL_NAMES_LIST[currentRowIndexImageSelection].setImage(GLOBAL_LIST_OF_IMAGES[randomValue].image);
						}
						else
						{
							GLOBAL_NAMES_LIST[currentRowIndexImageSelection].setImage(GLOBAL_LIST_OF_IMAGES[image].image);
						}


						GLOBAL_NAMES_LIST[currentRowIndexImageSelection].saveData();
						isNamesListHidden = false;
						names.showNamesList();
						names.updateCanvasSize();
					}
					
					
					
				}
			}
		}
		else 
		{
			GLOBAL_NAMES_HEADER.mousePressed(names);
			
			names.deleteAllNames();
			
			for (const name in GLOBAL_NAMES_LIST)
			{
				GLOBAL_NAMES_LIST[name].mousePressed(names);
			}
			
		}
		
		
	}

	names.draw = function()
	{
		imageRows = Math.floor(GLOBAL_LIST_OF_IMAGES.length/IMAGE_COLUMN_AMOUNT)+1;
		imageDrawCounter = 0;

		names.background(255,255,255,150);

		names.checkIfMouseHovered();

		//NAMES SCREEN
		if(!isNamesListHidden)
		{

			names.drawNamesScreen();

			names.checkHeaderOperationFlags();

		}
		//IMAGE SCREEN
		else
		{
			names.drawImageScreen();
		}

	}

	names.drawNamesScreen = function()
	{
		GLOBAL_NAMES_HEADER.draw();

		//Checks for delete flags and draws each row
		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			if(GLOBAL_NAMES_LIST[i].deleteFlag)
			{
				GLOBAL_NAMES_LIST[i].deleteAllHTML();
				GLOBAL_NAMES_LIST.splice(i,1);
				names.refreshArrayIndices();
				names.updateCanvasSize();
				activateFlash();
				continue;
			}


			if(GLOBAL_NAMES_LIST[i].imageSelectFlag)
			{
				
				this.hideNamesList();
				currentRowIndexImageSelection = i;
				namesPanelCanvasSizeUpdateFlag = true;
				GLOBAL_NAMES_LIST[i].imageSelectFlag = false;
				//GLOBAL_NAMES_LIST[i].draw();
				break;
			}
			
			GLOBAL_NAMES_LIST[i].draw();

		}

		//updates "add row" button position (required if new rows are added/removed)
		//newRowButton.position(GLOBAL_ROW_HEIGHT/4, GLOBAL_ROW_HEIGHT/4); //(GLOBAL_NAMES_LIST.length+headerOffsetMultiplier)* GLOBAL_ROW_HEIGHT
		newRowButton2.position(0, (GLOBAL_NAMES_LIST.length+headerOffsetMultiplier)* GLOBAL_ROW_HEIGHT);
		//newRowButton.size(100,GLOBAL_ROW_HEIGHT/2);
	}

	names.checkHeaderOperationFlags = function()
	{
		if(GLOBAL_REFRESH_FLAG)
		{
			names.refreshArrayIndices();
			GLOBAL_REFRESH_FLAG = false;
			activateFlash();
		}

		if(GLOBAL_NAMES_HEADER.imageSelectFlag)
		{
			this.hideNamesList();
			namesPanelCanvasSizeUpdateFlag = true;
			activateFlash();
		}

		if(GLOBAL_NAMES_HEADER.getEnabledToggleFlag())
		{
			names.toggleEnabledCheckboxes();
			activateFlash();
		}

		if(GLOBAL_NAMES_HEADER.getColorSelectFlag())
		{
			names.setAllColors();
			activateFlash();
		}

		if(GLOBAL_NAMES_HEADER.getSubtextChangedFlag())
		{
			names.setAllSubtexts();
			activateFlash();
		}
	}

	names.drawImageScreen = function()
	{
		if(namesPanelCanvasSizeUpdateFlag)
		{
			names.updateCanvasSizeForImages();
			namesPanelCanvasSizeUpdateFlag = false;
		}
		
		names.push();
		names.fill(7,7,7);
		names.rect(0,0,namesPanelContainer.size().width, GLOBAL_ROW_HEIGHT);
		names.fill(255)
		names.textSize(15)
		names.textAlign(LEFT, CENTER);
		names.text("UPLOAD OWN IMAGES:", GLOBAL_ROW_HEIGHT/4 ,GLOBAL_ROW_HEIGHT/2);
		names.pop();
		
		for (let i = 0; i < imageRows; i++)
		{
			for (let j = 0; j < IMAGE_COLUMN_AMOUNT; j++)
			{
				if(imageDrawCounter >= GLOBAL_LIST_OF_IMAGES.length)
				{
					continue;
				}

				GLOBAL_LIST_OF_IMAGES[imageDrawCounter].setPosition(j*IMAGE_BLOCK_SIZE, i*IMAGE_BLOCK_SIZE + imageHeaderHeight);
				GLOBAL_LIST_OF_IMAGES[imageDrawCounter].setSize(IMAGE_BLOCK_SIZE, IMAGE_BLOCK_SIZE);
				GLOBAL_LIST_OF_IMAGES[imageDrawCounter].draw();

				imageDrawCounter++;

			}
		}

		
	}
	
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////				CORE END					//////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	names.deleteAllNames = function()
	{
		if(!GLOBAL_NAMES_HEADER.deleteFlag)
		{
			return;
		}
		
		for (const name in GLOBAL_NAMES_LIST)
		{
			if(!GLOBAL_NAMES_LIST[name].getEnabled())
			{
				continue;
			}
			GLOBAL_NAMES_LIST[name].deleteFlag = true;
		}

		GLOBAL_NAMES_HEADER.deleteFlag = false;
		names.refreshArrayIndices();
		activateFlash();
	}

	names.checkIfMouseHovered = function()
	{
		if(isNamesListHidden)
		{
			for (const image in GLOBAL_LIST_OF_IMAGES)
			{
				GLOBAL_LIST_OF_IMAGES[image].mouseOver(names);
				
			}
		}
		else {
			for (const name in GLOBAL_NAMES_LIST)
			{
				GLOBAL_NAMES_LIST[name].mouseOver(names);
			}
		}
		
		
	}

	names.checkIfMouseHoveredHeader = function()
	{
		if(!isNamesListHidden)
		{
			GLOBAL_NAMES_HEADER.mouseOver(names);
			
		}

	}
	
	names.hideNamesList = function()
	{
		// if(GLOBAL_NAMES_HEADER.imageSelectFlag)
		// {
		// 	randomiseImagesButton.removeClass("force-hide");
		// }
		isNamesListHidden = true;
		newRowButton.addClass("force-hide");
		newRowButton2.addClass("force-hide");
		addImageButton.removeClass("force-hide");
		deleteImageButton.removeClass("force-hide");
		
		GLOBAL_NAMES_HEADER.hideRow();
		
		for (const name in GLOBAL_NAMES_LIST)
		{
			GLOBAL_NAMES_LIST[name].hideRow();
		}
	}

	names.showNamesList = function()
	{
		isNamesListHidden = false;
		if(deleteImageMode)
		{
			names.toggleDeleteImageMode();
		}
		newRowButton.removeClass("force-hide");
		newRowButton2.removeClass("force-hide");
		addImageButton.addClass("force-hide");
		deleteImageButton.addClass("force-hide");
		// if(!randomiseImagesButton.hasClass("force-hide"))
		// {
		// 	randomiseImagesButton.addClass("force-hide");
		//
		// }
		
		GLOBAL_NAMES_HEADER.showRow();

		for (const name in GLOBAL_NAMES_LIST)
		{
			GLOBAL_NAMES_LIST[name].showRow();
		}
		activateFlash();
	}
	
	//Updates Canvas size if rows become more than the height of the canvas
	names.updateCanvasSize = function()
	{
		if((GLOBAL_NAMES_LIST.length+headerOffsetMultiplier+1) * GLOBAL_ROW_HEIGHT > namesPanelContainer.size().height)
		{
			names.resizeCanvas(namesPanelContainer.size().width, (GLOBAL_NAMES_LIST.length+headerOffsetMultiplier+1) * GLOBAL_ROW_HEIGHT);
		}
		else
		{
			names.resizeCanvas(namesPanelContainer.size().width, namesPanelContainer.size().height);
		}
	}

	names.updateCanvasSizeForImages = function()
	{
		if(imageRows * IMAGE_BLOCK_SIZE + imageHeaderHeight  > namesPanelContainer.size().height)
		{
			//console.log("update cnvs");
			names.resizeCanvas(namesPanelContainer.size().width, imageRows * IMAGE_BLOCK_SIZE + imageHeaderHeight);
		}
		else
		{
			//console.log("reset cnvs");
			names.resizeCanvas(namesPanelContainer.size().width, namesPanelContainer.size().height);
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

		//newRowButton.position(0, (GLOBAL_NAMES_LIST.length+headerOffsetMultiplier)* GLOBAL_ROW_HEIGHT);
		names.updateCanvasSize();
		
		//revisit using this here - quick hack to save data on new row added (does this need dedicated button)?
		names.refreshArrayIndices();

		activateFlash();
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
	
	names.toggleEnabledCheckboxes = function ()
	{
		if(!GLOBAL_NAMES_HEADER.getEnabledToggleFlag())
		{
			
			return;
		}

		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			GLOBAL_NAMES_LIST[i].setEnabled(GLOBAL_NAMES_HEADER.getEnabled());
			GLOBAL_NAMES_LIST[i].refreshPageData();
			GLOBAL_NAMES_LIST[i].saveData();

		}
		
		GLOBAL_NAMES_HEADER.setEnabledToggleFlag(false);
		names.refreshArrayIndices();
	}
	
	names.setAllColors = function()
	{
		if(!GLOBAL_NAMES_HEADER.getColorSelectFlag())
		{
			return;
		}
		
		

		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			if(!GLOBAL_NAMES_LIST[i].getEnabled())
			{
				continue;
			}
			GLOBAL_NAMES_LIST[i].setColor(GLOBAL_NAMES_HEADER.getColor());
			GLOBAL_NAMES_LIST[i].refreshPageData();
			GLOBAL_NAMES_LIST[i].saveData();

		}
		
		GLOBAL_NAMES_HEADER.setColorSelectFlag(false);
		names.refreshArrayIndices();
	}
	
	names.setAllSubtexts = function()
	{
		if(!GLOBAL_NAMES_HEADER.getSubtextChangedFlag())
		{
			return;
		}
		
		for (let i = 0; i < GLOBAL_NAMES_LIST.length; i++)
		{
			if(!GLOBAL_NAMES_LIST[i].getEnabled())
			{
				continue;
			}
			GLOBAL_NAMES_LIST[i].setSubtext(GLOBAL_NAMES_HEADER.getSubtext());
			GLOBAL_NAMES_LIST[i].refreshPageData();
			GLOBAL_NAMES_LIST[i].saveData();

		}

		GLOBAL_NAMES_HEADER.setSubtextChangedFlag(false);
		names.refreshArrayIndices();
		
	}
	
	
};

new p5(namesP5);






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
////////////////////		PREVIEW PANEL		/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//all preview canvas should be prefrixed with names
var previewP5 = function (preview)
{
	var refresh = false;
	var totalHeight = 0;
	var totalHeightMultiplier =1;
	var saveButton;
	var refreshButton;
	
	
	preview.setup = function()
	{
		previewPanelContainer = select('#preview-panel-container');
		var previewPanelCanvas = preview.createCanvas(GLOBAL_PAGE_WIDTH, GLOBAL_PAGE_HEIGHT);//namesPanelContainer.size().width
    	previewPanelCanvas.parent('preview-panel-container');
		
		
		//var saveButton = createButton("SAVE");
		//saveButton.parent(previewPanelContainer);
		//saveButton.position(previewPanelContainer.size().width*1.5, previewPanelContainer.size().height +10);
		saveButton = select('#save-button');
		saveButton.mouseClicked(preview.saveDocument);
		saveButton.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>SAVE PDF BUTTON:</b> Save a PDF file to your computer - Note: Select 'save as PDF' in the destination section for best results. PDF content will reflect the PREVIEW window.";});

		refreshButton = select('#refresh-button');
		refreshButton.mouseClicked(()=>{GLOBAL_PREVIEW_PAGE_REFRESH_FLAG = true;});
		refreshButton.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>REFRESH BUTTON:</b> Click to refresh the PREVIEW screen (Required for larger documents)";});
		//var refreshButton = createButton("REFRESH");
		//refreshButton.parent(previewPanelContainer);
		//refreshButton.position(previewPanelContainer.size().width/2 - 100, previewPanelContainer.size().height +10);
		//refreshButton.mouseClicked(preview.refreshDocument);

		this.pageCount = 1;
	}
	
	preview.saveDocument = function()
	{
		//let pdfCanvas = createCanvas(595, 841);
		
		//preview.noLoop();
		preview.refreshDocument();
		preview.generatePDF();
		// PDF.save();
		// PDF.endRecord();
		//totalHeight = 0;
		//this.pageCount = 1;
		
	}
	
	

	preview.refreshDocument = function()
	{
		if(refresh)
		{
			return;
		}

		refresh = true;
		this.pageCount = 1;
		totalHeightMultiplier = 1;
		GLOBAL_FLASH_REFRESH_BUTTON_FLAG = false;

	}
	
	preview.generatePDF2 = function()
	{
		//Dont loop if refresh flag is not set to true (VERY IMPORTANT)
		if(!refresh)
		{
			return;
		}
		
		
		
		

		if(GLOBAL_PAGE_HEIGHT != preview.height)
		{
			console.log("RESIZED FRO PDF");
			preview.resizeCanvas(GLOBAL_PAGE_WIDTH, GLOBAL_PAGE_HEIGHT);
		}
		
		//preview.resizeCanvas(595,841);

		//Create fresh PDF
		PDF = preview.createPDF();
		PDF.beginRecord();

		//Clean background
		preview.background(255);
		
		// //loop through all templates
		for (let i = 0; i < GLOBAL_TEMPLATES_LIST.length; i++)
		{
			let template = GLOBAL_TEMPLATES_LIST[i];

			//Check if the template is selected by the user or not
			//console.log(template.isNotSelected);
			if(template.getSelectState())
			{
				//If it is not selected, skip this template
				continue;
			}

			// number of templates per row.
			// connect this parameter with user input.
			let numOfTempPreRow = 2;

			let rate = 1 / numOfTempPreRow;

			let calculatedX = 0;
			let calculatedY = 0;

			let h = template.getCurrentHeight();
			let w = floor(GLOBAL_PAGE_WIDTH/numOfTempPreRow);//template.getCurrentWidth();
			let col = 0;
			let row = 0;
			let counter = 0;
			//let offsetflag = 0;

			//draw vertical cut line
			preview.stroke(0, 0, 0, 50);
			preview.strokeWeight(1);
			preview.line(GLOBAL_PAGE_WIDTH/numOfTempPreRow, 0, GLOBAL_PAGE_WIDTH/numOfTempPreRow, previewPanelContainer.size().height);


			//For the current template (i), iterate through all names (j)
			for (let j = 0; j < GLOBAL_NAMES_LIST.length; j++)
			{
				if(!GLOBAL_NAMES_LIST[j].getEnabled())
				{
					continue;
				}
				
				col = counter % numOfTempPreRow;

				row = Math.floor( counter / numOfTempPreRow);

				let startingX = col * w;

				let startingY = row * h;

				//draw horizontal cut line
				preview.stroke(0, 0, 0, 50);
				preview.strokeWeight(1);
				preview.line(startingX, startingY + h, GLOBAL_PAGE_WIDTH, startingY + h)

				if(startingY + h > previewPanelContainer.size().height) //if the next name will be out of bounds
				{
					
					counter = 0 //reset positional counters
					j--;		//rerun previous name again
					this.pageCount++;	//Keeps track of the amount of pages sofar
					PDF.nextPage();		//Lets save current canvas to new PDF page
					preview.background(255);	//Clear Background
					//draw vertical cut line
					preview.stroke(0);
					preview.strokeWeight(1);
					preview.line(GLOBAL_PAGE_WIDTH/numOfTempPreRow, 0, GLOBAL_PAGE_WIDTH/numOfTempPreRow, previewPanelContainer.size().height);
					continue;	

				}
			//---------uncommon this---------------------------------------------------------------------------------------------------------------------------------------------------
				// template.drawNameTag(preview, GLOBAL_NAMES_LIST[j], startingX, startingY, GLOBAL_PAGE_WIDTH * rate);// example parameters (c, data, startX, startY, W )
			//---------uncommon this---------------------------------------------------------------------------------------------------------------------------------------------------

				counter++;
			}


		}
		refresh = false;
		PDF.save();
		PDF.endRecord();
		//preview.saveDocument();
		
		
		
	}






	preview.generatePDF = function()
	{
		//Dont loop if refresh flag is not set to true (VERY IMPORTANT)
		if(!refresh)
		{
			return;
		}

		if(GLOBAL_PAGE_HEIGHT != preview.height)
		{
			console.log("RESIZED FOR PDF");
			preview.resizeCanvas(GLOBAL_PAGE_WIDTH, GLOBAL_PAGE_HEIGHT);
		}

		//preview.resizeCanvas(595,841);

		//Create fresh PDF
		PDF = preview.createPDF();
		PDF.beginRecord();
		

		//Clean background
		preview.background(255);
		let startingY = 0;

		
		for (let i = 0; i < GLOBAL_TEMPLATES_LIST.length; i++)
		{
			
			let template = GLOBAL_TEMPLATES_LIST[i];

			//Check if the template is selected by the user or not
			if(!template.getSelectState())
			{
				//If it is not selected, skip this template
				continue;
			}
			
			let rate = template.getDropDownMenuResult();
			let numOfTempPerRow = Math.floor(1/rate);


			// this is used for call the draw nameTag function.
			let nameTag = template.getNameTag();

			// FullSize is the size of draw one nameTag.
			// this is help parameter, only use to find the relative size.
			let FullSize = nameTag.getFullSize(GLOBAL_PAGE_WIDTH);

			// relative size and position of one nameTag.
			let pos = nameTag.getRelativeSize(FullSize, rate);
			let w = pos.relativeW;
			let h = pos.relativeH;
			let counter = 0;
			
			//For the current template (i), iterate through all names (j)
			for (let j = 0; j < GLOBAL_NAMES_LIST.length; j++)
			{
				if(!GLOBAL_NAMES_LIST[j].getEnabled())
				{
					continue;
				}
				
				let startingX = (counter % numOfTempPerRow) * w;

				//draw horizontal cut line
				preview.push();
				preview.stroke(0, 0, 0, 50);
				preview.strokeWeight(2);
				preview.drawingContext.setLineDash([10, 10]);
				startingX == 0?preview.line(0, startingY + h, GLOBAL_PAGE_WIDTH, startingY + h):null;
				preview.pop();

				//draw vertical cut line
				preview.push();
				preview.stroke(0, 0, 0, 50);
				preview.strokeWeight(2);
				preview.drawingContext.setLineDash([10, 10]);
				preview.line(startingX, startingY, startingX,  startingY+h);
				preview.pop();
				if(startingY + h > GLOBAL_PAGE_HEIGHT) //if the next name will be out of bounds
				{
					counter = 0 //reset positional counters
					j--;		//rerun previous name again
					this.pageCount++;	//Keeps track of the amount of pages sofar
					PDF.nextPage();		//Lets save current canvas to new PDF page
					preview.background(255);	//Clear Background
					startingY = 0;
					//draw vertical cut line
					//preview.stroke(0);
					//preview.strokeWeight(1);
					//preview.line(GLOBAL_PAGE_WIDTH/numOfTempPreRow, 0, GLOBAL_PAGE_WIDTH/numOfTempPreRow, previewPanelContainer.size().height);
					continue;

				}
				
				// draw nameTags
				template.drawNameTag(preview, GLOBAL_NAMES_LIST[j], startingX, startingY, pos);

				counter++;

				// update startingY
				startingY = (counter % numOfTempPerRow == 0) ? startingY + h: startingY;

			}
			
			if((counter) % numOfTempPerRow != 0) startingY += h;


		}
		refresh = false;
		PDF.save();
		PDF.endRecord();
		GLOBAL_PREVIEW_PAGE_REFRESH_FLAG = true;
		//preview.saveDocument();


	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	preview.displayViewCanvas = function()
	{
		if(GLOBAL_LOADING_TEXT.hasClass('force-hide'))
		{
			GLOBAL_LOADING_TEXT.removeClass('force-hide');
		}
		
		//Clean background
		preview.background(255);

		let firstTemplate = true;
		let startingY = 0;
		let preH = 0;
		//totalHeightMultiplier = 1;


		// //loop through all templates
		for (let i = 0; i < GLOBAL_TEMPLATES_LIST.length; i++)
		{
			let template = GLOBAL_TEMPLATES_LIST[i];

			//Check if the template is selected by the user or not
			if(!template.getSelectState())
			{
				//If it is not selected, skip this template
				continue;
			}

			let rate = template.getDropDownMenuResult();
			let numOfTempPreRow = Math.floor(1/rate);
			

			// this is used for call the draw nameTag function.
			let nameTag = template.getNameTag();

			// FullSize is the size of draw one nameTag.
			// this is help parameter, only use to find the relative size.
			let FullSize = nameTag.getFullSize(GLOBAL_PAGE_WIDTH - 10);

			// relative size and position of one nameTag.
			let pos = nameTag.getRelativeSize(FullSize, rate);
			let w = pos.relativeW;
			let h = pos.relativeH;
			let counter = 0;




			//For the current template (i), iterate through all names (j)
			for (let j = 0; j < GLOBAL_NAMES_LIST.length; j++)
			{
				if(!GLOBAL_NAMES_LIST[j].getEnabled())
				{
					continue;
				}

				let startingX = (counter % numOfTempPreRow) * w;

				//draw horizontal cut line
				preview.push();
				preview.stroke(0, 0, 0, 50);
				preview.strokeWeight(2);
				preview.drawingContext.setLineDash([10, 10]);
				startingX == 0?preview.line(0, startingY + h, GLOBAL_PAGE_WIDTH, startingY + h):null;
				preview.pop();

				//draw vertical cut line
				preview.push();
				preview.stroke(0, 0, 0, 50);
				preview.strokeWeight(2);
				preview.drawingContext.setLineDash([10, 10]);
				preview.line(startingX, startingY, startingX,  startingY+h);
				preview.pop();
				if(startingY + h > (GLOBAL_PAGE_HEIGHT * totalHeightMultiplier)) //if the next name will be out of bounds
				{
					totalHeightMultiplier++;
					//counter += numOfTempPreRow //reset positional counters
					// j--;		//rerun previous name again
					// this.pageCount++;	//Keeps track of the amount of pages sofar
					// PDF.nextPage();		//Lets save current canvas to new PDF page
					// preview.background(255);	//Clear Background
					// //draw vertical cut line
					// preview.stroke(0);
					// preview.strokeWeight(1);
					// preview.line(GLOBAL_PAGE_WIDTH/numOfTempPreRow, 0, GLOBAL_PAGE_WIDTH/numOfTempPreRow, previewPanelContainer.size().height);
					// continue;

				}
				
				// draw nameTags
				template.drawNameTag(preview, GLOBAL_NAMES_LIST[j], startingX, startingY, pos);

				counter++;

				// update startingY
				startingY = (counter % numOfTempPreRow == 0) ? startingY + h: startingY;

			}

			if((counter) % numOfTempPreRow != 0) startingY += h;
			
			
		}
		if((GLOBAL_PAGE_HEIGHT * totalHeightMultiplier) != preview.height)
		{
			preview.resizeCanvas(GLOBAL_PAGE_WIDTH, (GLOBAL_PAGE_HEIGHT * totalHeightMultiplier))
			preview.displayViewCanvas();
			return;
		}
		
		refresh = false;
		GLOBAL_PREVIEW_PAGE_REFRESH_FLAG = false;
		//cursor(ARROW);

		if(!GLOBAL_LOADING_TEXT.hasClass('force-hide'))
		{
			GLOBAL_LOADING_TEXT.addClass('force-hide');
		}
		
	}

	preview.draw = function()
	{

		if(GLOBAL_PREVIEW_PAGE_REFRESH_FLAG)
		{
			if(GLOBAL_LOADING_TEXT.hasClass('force-hide'))
			{
				GLOBAL_LOADING_TEXT.removeClass('force-hide');
				return;
			}
	
			cursor('progress');
			preview.refreshDocument();
			preview.displayViewCanvas();
		}
		//preview.generatePDF();
		
		if(frameCount % 300 == 0 && preview.height < 5000)
		{
			preview.refreshDocument();
			preview.displayViewCanvas();
		}
		
		
		if(GLOBAL_FLASH_REFRESH_BUTTON_FLAG)
		{
			if(!refreshButton.hasClass('button-flash'))
			{
				refreshButton.html("REFRESH PAGE");
				refreshButton.addClass('button-flash');
			}
			
		}
		else
		{
			if(refreshButton.hasClass('button-flash'))
			{
				refreshButton.html("PAGE UP TO DATE");
				refreshButton.removeClass('button-flash');
			}
		}
		
		
		


	}
	
};

new p5(previewP5);

//preview.line(startingX, startingY, w * numOfTempPreRow, startingY);
// some examples
// GLOBAL_TEMPLATES_LIST[1].SetName(GLOBAL_NAMES_LIST[0].getName());
// GLOBAL_TEMPLATES_LIST[i].draw();
// GLOBAL_TEMPLATES_LIST[i].setPos(x,y);


// if (frameCount == 60*60)
// {
//   generatePDF();
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
////////////////////		TEMPLATES PANEL		/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////					/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
  
	This is a template P5 class function.
  	'templates' parameter is an canvas pobject.

*/

var templateFont;
var templatesP5_fnc = function (templates)
{
	// accumulate height for drawing next template.
	let totalH = 0;
	let tempOne;
	let tempTwo;
	let tempThree;
	let tempFour;
	let tempFive;
	let tempSix;


	templates.preload = function()
	{
		templateFont = loadFont('assets/fonts/letters_for_learners/Letters for Learners.ttf');
	}



	templates.setup = function()
	{
		templates.textFont(templateFont);
		GLOBAL_TEMPLATE_FILL_DATA = new RowFormatting(templates);
		GLOBAL_TEMPLATE_FILL_DATA.rowData.setData(1, true, "NAME FIELD", "SUBTEXT FIELD", "#000000", "assets/tempalte-photo.png");
		GLOBAL_TEMPLATE_FILL_DATA.deleteInputs();
		
		//select DOM container of our 'template' canvas.
		var templatesPanelContainer = select('#templates-panel-container');

		//create a 'tempalte' Canvas object.
		var templatesPanelCanvas = templates.createCanvas(GLOBAL_PAGE_WIDTH,  GLOBAL_PAGE_HEIGHT*3.5);

		//make DOM container as our canvas's parent element.
		templatesPanelCanvas.parent('templates-panel-container');

		//set up base size
		//GLOBAL_COLUMN_WIDTH = templatesPanelCanvas.size().width / GLOBAL_COLUMN_DIVISION; <-- not what global_Column_width is used for
		


		templates.containerStartX = templatesPanelContainer.elt.offsetLeft;
		templates.containerStartY = templatesPanelContainer.elt.offsetTop;
		templates.containerW = templatesPanelContainer.elt.offsetWidth;
		templates.containerH = templatesPanelContainer.elt.offsetHeight;
		
		


		////////////////////////
		//// First Template ////
		////////////////////////
		{
			tempOne = new TemplateClass(templates);

			// some parameter to design a nameTag.
			let h = 300;							// height of Template
			let nameRatioW = 0.7;					// name WIDTH % of total nameTag WIDTH.
			let nameRatioH = 0.5;					// name HEIGHT % of the total nameTag HEIGHT.
			let subTextRatioW = 0.7;				// subtext WIDTH % of total nameTag WIDTH.
			let subTextRatioH = 0.4;				// subtext HEIGHT % of total nameTag HEIGHT.
			let padBtwNameAndSubTextRatio = 0.0;	// padding % between name and subtext.
			let imgRatioSize = 0.25;					// image WIDTH %
			let imgRatioW = 0.33;					// image container WIDTH %
			let imgRatioH = 0.5;
			let prototypeW = 500;
			let prototypeH = 160;


			let ratios = {
				nameRatioW,
				nameRatioH,
				subTextRatioW,
				subTextRatioH,
				padBtwNameAndSubTextRatio,
				imgRatioSize,
				imgRatioW,
				imgRatioH
				};


				tempOne.init(        
				_startX = 0,
				_startY = totalH,
				_totalW = templates.containerW,
				_totalH = h,
				_backGroundColor = 177,
				_nameTageName = "TEMPLATE #1",
				_ratios = ratios,
				_round = false,
				_select = true,
				_prototypeW = prototypeW,
				_prototypeH = prototypeH
			);
			GLOBAL_TEMPLATES_LIST[GLOBAL_TEMPLATES_LIST.length] = tempOne;
		}

		totalH += tempOne.getTotalH();

		/////////////////////////
		//// Second Template ////
		/////////////////////////
		{
			tempTwo = new TemplateClass(templates);


			// some parameter to design a nameTag.
			let h = 400;							// height of Template
			let nameRatioW = 0.66;					// name WIDTH % of total nameTag WIDTH.
			let nameRatioH = 0.5;					// name HEIGHT % of the total nameTag HEIGHT.
			let subTextRatioW = 0.66;				// subtext WIDTH % of total nameTag WIDTH.
			let subTextRatioH = 0.4;				// subtext HEIGHT % of total nameTag HEIGHT.
			let padBtwNameAndSubTextRatio = 0.15;	// padding % between name and subtext.
			let imgRatioSize = 0.33;					// image WIDTH %
			let imgRatioW = 0.4;					// image container WIDTH %
			let imgRatioH = 0.5;
			let prototypeW = 570;
			let prototypeH = 300;


			let ratios = {
				nameRatioW,
				nameRatioH,
				subTextRatioW,
				subTextRatioH,
				padBtwNameAndSubTextRatio,
				imgRatioSize,
				imgRatioW,
				imgRatioH};


				tempTwo.init(        
				_startX = 0,
				_startY = totalH,
				_totalW = templates.containerW,
				_totalH = h,
				_backGroundColor = 177,
				_nameTageName = "TEMPLATE #2",
				_ratios = ratios,
				_round = true,
				_select = false,
				_prototypeW = prototypeW,
				_prototypeH = prototypeH
			);
			GLOBAL_TEMPLATES_LIST[GLOBAL_TEMPLATES_LIST.length] = tempTwo;
		}
		
		totalH += tempTwo.getTotalH();

		////////////////////////
		//// Third Template ////
		////////////////////////
		{
			tempThree = new TemplateClass(templates);

			// some parameter to design a nameTag.
			let h = 680;							// height of Template
			let nameRatioW = 1;					// name WIDTH % of total nameTag WIDTH.
			let nameRatioH = 0.75;					// name HEIGHT % of the total nameTag HEIGHT.
			let subTextRatioW = 1;				// subtext WIDTH % of total nameTag WIDTH.
			let subTextRatioH = 0.3;				// subtext HEIGHT % of total nameTag HEIGHT.
			let padBtwNameAndSubTextRatio = 0.05;	// padding % between name and subtext.
			let imgRatioSize = 0.5;					// image WIDTH %
			let imgRatioW = 0.75;					// image container WIDTH %
			let imgRatioH = 0.35;
			let prototypeW = 570;
			let prototypeH = 650;

			let ratios = {
				nameRatioW,
				nameRatioH,
				subTextRatioW,
				subTextRatioH,
				padBtwNameAndSubTextRatio,
				imgRatioSize,
				imgRatioW,
				imgRatioH};


				tempThree.init(        
				_startX = 0,
				_startY = totalH,
				_totalW = templates.containerW,
				_totalH = h,
				_backGroundColor = 177,
				_nameTageName = "TEMPLATE #3",
				_ratios = ratios,
				_round = true,
				_select = false,
				_prototypeW = prototypeW,
				_prototypeH = prototypeH
			);
			GLOBAL_TEMPLATES_LIST[GLOBAL_TEMPLATES_LIST.length] = tempThree;
		}	

		totalH += tempThree.getTotalH();

		////////////////////////
		//// Forth Template ////
		////////////////////////
		{
			tempFour = new TemplateClass(templates);

			// some parameter to design a nameTag.
			let h = 520;							// height of Template
			let nameRatioW = 1.0;					// name WIDTH % of total nameTag WIDTH.
			let nameRatioH = 0.7;					// name HEIGHT % of the total nameTag HEIGHT.
			let subTextRatioW = 1.0;				// subtext WIDTH % of total nameTag WIDTH.
			let subTextRatioH = 0.3;				// subtext HEIGHT % of total nameTag HEIGHT.
			let padBtwNameAndSubTextRatio = 0.05;	// padding % between name and subtext.
			let imgRatioSize = 0.3;					// image WIDTH %
			let imgRatioW = 0.65;					// image container WIDTH %
			let imgRatioH = 0.28;
			let prototypeW = 450;
			let prototypeH = 350;

			let ratios = {
				nameRatioW,
				nameRatioH,
				subTextRatioW,
				subTextRatioH,
				padBtwNameAndSubTextRatio,
				imgRatioSize,
				imgRatioW,
				imgRatioH};


				tempFour.init(        
				_startX = 0,
				_startY = totalH,
				_totalW = templates.containerW,
				_totalH = h,
				_backGroundColor = 177,
				_nameTageName = "TEMPLATE #4",
				_ratios = ratios,
				_round = true,
				_select = false,

				_prototypeW = prototypeW,
				_prototypeH = prototypeH
			);
			GLOBAL_TEMPLATES_LIST[GLOBAL_TEMPLATES_LIST.length] = tempFour;
		}	

		totalH += tempFour.getTotalH();
		
		////////////////////////
		//// Fifth Template ////
		////////////////////////
		{
			tempFive = new TemplateClass(templates);


			// some parameter to design a nameTag.
			let h = 1200;							// height of Template
			let nameRatioW = 1.0;					// name WIDTH % of total nameTag WIDTH.
			let nameRatioH = 0.7;					// name HEIGHT % of the total nameTag HEIGHT.
			let subTextRatioW = 1.0;				// subtext WIDTH % of total nameTag WIDTH.
			let subTextRatioH = 0.3;				// subtext HEIGHT % of total nameTag HEIGHT.
			let padBtwNameAndSubTextRatio = 0.05;	// padding % between name and subtext.
			let imgRatioSize = 0.8;					// image WIDTH %
			let imgRatioW = 0.5 + imgRatioSize/2;	// image container WIDTH %
			let imgRatioH = 0.35;
			let prototypeW = 350;
			let prototypeH = 750;


			let ratios = {
				nameRatioW,
				nameRatioH,
				subTextRatioW,
				subTextRatioH,
				padBtwNameAndSubTextRatio,
				imgRatioSize,
				imgRatioW,
				imgRatioH};


				tempFive.init(        
				_startX = 0,
				_startY = totalH,
				_totalW = templates.containerW,
				_totalH = h,
				_backGroundColor = 177,
				_nameTageName = "TEMPLATE #5",
				_ratios = ratios,
				_round = true,
				_select = false,

				_prototypeW = prototypeW,
				_prototypeH = prototypeH
			);
			GLOBAL_TEMPLATES_LIST[GLOBAL_TEMPLATES_LIST.length] = tempFive;
		}	

		totalH += tempFive.getTotalH();


		// ////////////////////////
		// //// Sixth Template ////
		// ////////////////////////
		{
			tempSix = new TemplateClass(templates);
			
			// some parameter to design a nameTag.
			let h = 700;							// height of Template
			let nameRatioW = 1;					// name WIDTH % of total nameTag WIDTH.
			let nameRatioH = 0.25;					// name HEIGHT % of the total nameTag HEIGHT.
			let subTextRatioW = 1;				// subtext WIDTH % of total nameTag WIDTH.
			let subTextRatioH = 0.3;				// subtext HEIGHT % of total nameTag HEIGHT.
			let padBtwNameAndSubTextRatio = 0.05;	// padding % between name and subtext.
			let imgRatioSize = 0.5;					// image WIDTH %
			let imgRatioW = 0.75;					// image container WIDTH %
			let imgRatioH = 0.65;
			let prototypeW = 570;
			let prototypeH = 650;


			let ratios = {
				nameRatioW,
				nameRatioH,
				subTextRatioW,
				subTextRatioH,
				padBtwNameAndSubTextRatio,
				imgRatioSize,
				imgRatioW,
				imgRatioH};


				tempSix.init(        
				_startX = 0,
				_startY = totalH,
				_totalW = templates.containerW,
				_totalH = h,
				_backGroundColor = 177,
				_nameTageName = "TEMPLATE #6",
				_ratios = ratios,
				_round = true,
				_select = false,

				_prototypeW = prototypeW,
				_prototypeH = prototypeH
			);
			GLOBAL_TEMPLATES_LIST[GLOBAL_TEMPLATES_LIST.length] = tempSix;
		}

		totalH += tempSix.getTotalH();

	}



	
	templates.draw = function()
	{	
		
		templates.push();
		templates.fill(211);
		templates.pop();

		for( var temp of GLOBAL_TEMPLATES_LIST){

			temp.draw();
			
		}
		
		if(templates.height != totalH)
		{
			templates.resizeCanvas(templates.width, totalH)
		}


	}

};


var templatesP5 =  new p5(templatesP5_fnc);


