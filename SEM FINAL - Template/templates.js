
/*
	TemplateRow should only do drawing on provided position, and TempalteRow should have fixed height and width.

	There sould also be a function find_position() focus on calculating starting X, starting Y, ending X, ending Y, 

	This templates should draw 2 nameTags per row.

	for each nameTag:
	1. startingX: we pass as parameter,
	2. stratingY: we pass as parameter,
*/


function TemplateOne(canvas) {
	//two templates one row

	// create selectBox for display purpose.

	/**
	 * 	default width = 576,
	 * 	default height = 300,
	 * 	we first calculate ratio rateW, rateH.
	 * 	then use ratio to calculate paddingX, paddingY, startingX, startingY. 
	 * 
	 */
	var self = this;
	
	self.isNotSelected = false;
	self.isRound = true;

	self.init = function () {

        //---------------------------------/  ENABLED  /--------------------------------------
		// add checkbox
		self.checkbox = canvas.createElement("input");
		self.checkbox.attribute("checked",'checked');
		self.checkbox.attribute("type", "checkbox");
		self.checkbox.attribute("id", "template-one-checkBox");
		self.checkbox.position(0, 0);
		self.checkbox.parent(select('#templates-panel-container'));
		self.checkbox.changed(self.checkboxEventHandler);

		// add round checkbox
		self.round_checkbox = canvas.createCheckbox(' Round', true);
		self.round_checkbox.attribute("checked",'checked');
		self.round_checkbox.attribute("type", "checkbox");
		self.round_checkbox.attribute("id", "template-one-roundCheckBox");
		self.round_checkbox.position(0, 0);
		self.round_checkbox.parent(select('#templates-panel-container'));
		self.round_checkbox.changed(self.checkboxEventHandler);




		// add size drop down 
		// options: full, 1/2, 1/3, 1/4, 1/8
		canvas.push();
		canvas.textSize(32);
		canvas.textAlign(CENTER);
		self.sel = createSelect();
		self.sel.position(10, 10);
		self.sel.option('Full');
		self.sel.option('1/2');
		self.sel.option('1/3');
		self.sel.option('1/4');
		self.sel.selected('1/2');
		self.sel.changed(self.mySelectEvent);
		canvas.pop();

		// other init
		self.rate = 1/2;
		self.defaultW = GLOBAL_PAGE_WIDTH;
		self.defaultH = 300;
		self.W = (GLOBAL_PAGE_WIDTH) * self.rate;
		self.H = 300 * self.rate;
		self.round = 40 * self.rate;
		self.padding =1;//Math.floor(30 * self.rate);

		self.strokeWidth = 10 * self.rate;

	}

	self.update = function () {
		self.W = GLOBAL_PAGE_WIDTH * self.rate;
		self.H = 300 * self.rate;
		self.round = 40 * self.rate;
		self.padding = 1;//Math.floor(30 * self.rate);
	}

	self.setRate = function (rate) {
		
		self.rate = rate;

		self.update();
	}

	self.getRate = function(){
		return self.rate;
	}
	self.getCurrentWidth = function(){
		return self.W;
	}
	self.getCurrentHeight = function () {
		return self.H;
	}

	self.setSelectState = function(state) {
		self.isNotSelected = state;
	}

	self.getSelectState = function () {
		return self.isNotSelected;
	}

	self.getDefaultWidth = function () {
		return self.defaultW;
	}

	self.getDefaultHeight = function () {
		return self.defaultH;
	}


	self.drawInputs = function (startingX=0, startingY=0) {

		// checkbox position
		self.checkbox.position(startingX + canvas.containerW*3/4, startingY+ self.getDefaultWidth()/2);

		// round checkbox position
		self.round_checkbox.position(canvas.containerW/2, startingY - 30);

		// dropdown position
		self.sel.position(
			canvas.containerStartX + canvas.containerW * 4 / 5 , 
			startingY - 30);

	}

	self.findPosForDisplay = function(startingX, startingY, imageDisabled = false ){
		let back_x = startingX + self.padding;
		let back_y = startingY + self.padding;
		let back_w = self.W - self.padding * 2;
		let back_h = self.H - self.padding * 2;
		let back_round = self.isRound?self.round:0;
		let backgroundPos = {
				"x":back_x,
				"y":back_y, 
				"w":back_w,
				"h":back_h,
				"r":back_round};

		let name_x = startingX + self.padding * 2 + 0;
		let name_y = startingY + self.padding * 2 + 0;
		let name_w = (self.W - self.padding * 4) * (imageDisabled? 1 : 2/3);
		let name_h = self.H / 2 - self.padding * 2;
		let textPos = {
			"x": name_x,
			"y": name_y,
			"w": name_w,
			"h": name_h
		}

		let subText_x = startingX + self.padding * 2 + 0;
		let subText_y = startingY + self.padding * 10 + self.H / 2;
		let subText_w = (self.W - self.padding * 4) * (imageDisabled? 1 : 2/3);
		let subText_h = self.H / 2 - self.padding * 2;

		let subTextPos = {
			"x": subText_x,
			"y": subText_y,
			"w": subText_w,
			"h": subText_h
		};

		let img_x = startingX - self.padding + self.W - self.W / 4;
		let img_y = startingY + self.H / 2;
		let img_w = self.W / 3 - self.padding * 2;
		let img_h = self.W / 3 - self.padding * 2;

		let imgPos = {
			"x": img_x,
			"y": img_y,
			"w": img_w,
			"h": img_h
		};
		return {
			backgroundPos, 
			textPos, 
			subTextPos,
			imgPos
		};
	}

	self.findPosForTemplate = function(startingX, startingY, imageDisabled = true){
		let back_x = startingX + self.padding;
		let back_y = startingY + self.padding;
		let back_w = self.defaultW * 0.5 - self.padding * 2;
		let back_h = self.defaultH * 0.5 - self.padding * 2;
		let back_round = self.isRound?20:0;

		let backgroundPos = {
				"x":back_x,
				"y":back_y, 
				"w":back_w,
				"h":back_h,
				"r":back_round};

		let name_x = startingX + self.padding * 2 + 0;
		let name_y = startingY + self.padding * 2 + 0;
		let name_w = (self.defaultW * 0.5 - self.padding * 4) * (imageDisabled? 1 : 2/3);
		let name_h = (self.defaultH * 0.5 )/ 2 - self.padding * 2;
		let textPos = {
			"x": name_x,
			"y": name_y,
			"w": name_w,
			"h": name_h
		}



		let subText_x = startingX + self.padding * 2 + 0;
		let subText_y = startingY + self.padding * 10 + (self.defaultH * 0.5)/2 ;
		let subText_w = ((self.defaultW * 0.5) - self.padding * 4) * (imageDisabled? 1 : 2/3);
		let subText_h = (self.defaultH * 0.5 ) / 2 - self.padding * 2;

		let subTextPos = {
			"x": subText_x,
			"y": subText_y,
			"w": subText_w,
			"h": subText_h
		};

		// let subText_x = startingX + self.padding * 2 + 0;
		// let subText_y = startingY + self.padding + self.H / 2;
		// let subText_w = (self.W - self.padding * 4) * (imageDisabled? 1 : 2/3);
		// let subText_h = self.H / 2 - self.padding * 2;

		let img_x = startingX - self.padding + (self.defaultW * 0.5 ) - (self.defaultW * 0.5 ) / 4;
		let img_y = startingY + (self.defaultH * 0.5 ) / 2;
		let img_w = (self.defaultH  ) / 3 - self.padding * 2;
		let img_h = (self.defaultH ) / 3 - self.padding * 2;

		let imgPos = {
			"x": img_x,
			"y": img_y,
			"w": img_w,
			"h": img_h
		};
		return {
			backgroundPos, 
			textPos, 
			subTextPos,
			imgPos
		};
	}

	self.getNameSize = function(length, imageDisabled){
		let text_width = (self.W ) * (imageDisabled ? 1 : 2/3);
		let nameSize = text_width * 3 / (3 * length);
		nameSize = Math.max(12, Math.min(nameSize, 50 * self.rate));
		// console.log(nameSize);
		return nameSize;
	}

	self.getSubTextSize = function(length, imageDisabled){
		let text_width = (self.W)* (imageDisabled ? 1 : 2/3);
		let subTextSize = 3 + text_width * 3 / (3 * length);
		subTextSize = Math.max(6, Math.min(subTextSize, 40 * self.rate));
		return subTextSize;
	}
	self.drawAutoAdjustTempalte = function (c, data, startingX, startingY, isTemplate = false) {

		
		if (data == null) {return;}

		// self.setRate(rate);

		// if it's template nametags, use rate as fixed 0.5,
		// if it's display nametags, use rate as the user selected.
		let pos = (isTemplate?self.findPosForTemplate(startingX, startingY, false):self.findPosForDisplay(startingX, startingY, data.imageDisabled));
		c.noStroke();
		c.fill(data.getColor())
		c.rect(
			pos.backgroundPos.x,			// x
			pos.backgroundPos.y,			// y
			pos.backgroundPos.w,			// width
			pos.backgroundPos.h,			// height
			pos.backgroundPos.r);		// round

		c.fill(255);
		c.rect(
			pos.backgroundPos.x + self.strokeWidth/2,	// x
			pos.backgroundPos.y  + self.strokeWidth/2,	// y
			pos.backgroundPos.w - self.strokeWidth,		// width
			pos.backgroundPos.h - self.strokeWidth,		// height
			pos.backgroundPos.r);					// round
		
		
		/////////////////////////////
		/////// draw names //////////
		/////////////////////////////
		
		c.push();
		c.noStroke();
		c.textAlign(CENTER, BOTTOM);
		let name = data.getName();

		//calculate the font size based the length of the string
		let nameSize = self.getNameSize(name.length);

		c.textSize(isTemplate?25:nameSize);

		c.fill(data.getColor());

		c.text(name,
			pos.textPos.x,
			pos.textPos.y,
			pos.textPos.w,
			pos.textPos.h);

		c.pop();

		/////////////////////////////
		/////// draw subtext ////////
		/////////////////////////////

		c.push();
		c.stroke(51);
		c.noStroke();


		c.fill(data.getColor());
		c.textAlign(CENTER, TOP);
		let subTextSize = self.getSubTextSize(data.getSubtext().length, data.imageDisabled);

		c.textSize(isTemplate?20:subTextSize);

		noLoop();
		c.text(data.getSubtext(),
			pos.subTextPos.x,
			pos.subTextPos.y,
			pos.subTextPos.w,
			pos.subTextPos.h);

		c.pop();
		
		///////////////////////////
		/////// draw image ////////
		///////////////////////////
		if(!data.imageDisabled)
		{
			c.push();
			c.imageMode(CENTER);

			c.image(data.getImage(),
				pos.imgPos.x,
				pos.imgPos.y,
				pos.imgPos.w,
				pos.imgPos.h,
			);
			c.pop();
		}

		//////////////////////////////
		/////// draw dropDown ////////
		//////////////////////////////



		

	};


	self.checkboxEventHandler = function(){
		let checkbox = select('#template-one-checkBox');
		if(checkbox.checked()){
			self.setSelectState(false);

		}
		else{
			self.setSelectState(true);
		}

		if(self.round_checkbox.checked()){
			console.log("Round");
			self.isRound = true;
		}
		else{
			self.isRound = false;
		}
	}

	self.mySelectEvent = function(){
		let value = self.sel.value();
		switch(value){
			case "Full":
				self.setRate(1);

				console.log(self.rate);
				break;
			case "1/2":
				self.setRate(1/2);
				console.log(self.rate);
				break;
			case "1/3":
				self.setRate(1/3);
				console.log(self.rate);
				break;
				default:
				self.setRate(1/4);
				console.log(self.rate);
				break;

			
		}
	}
}

