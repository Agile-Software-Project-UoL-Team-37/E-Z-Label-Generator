function TemplateClass(canvas) {

    // we need to seperate draw template nametags and review nametags

    // we can call draw nametags inside template draw

    // templates class
    /**
     * 
     * 1. we can create different templates class objects 
     *    based on the user defined shape and postion of text, subtex, and img.
     *    so we need, 
     *      a. nametag w, h. 
     *      b. text startingX, startingY.
     *      c. subtext startingX, staringY.
     *      d. imge startingX, startingY, w and h.
     * 
     * 2. when the user first create a template object.
     *      a. store the position relationships of the nametag
     *      b. create all the inputs for templates class
     *      c. calculate relative position and size of:
     *          1. nametag: startX, startY, Width, Height
     *          2. background: startX, startY, Width, Height
     *          3. checkbox: startX, startY
     *          4. round_checkbox: startX, startY
     *          5. dropdown select: startX, startY.
     * 
     */

    // nametags class

    // we need some fix position for checkboxes.
    var self = this;
    let topH;
    let bottomH;

    let startX;
    let startY;
    let totalW;
    let totalH;

    let checkbox;
    let roundCheckbox;
    let roundSlider;
    let sel;

    let backGroundColor;
    let nameTagName;

    let startBodyX;
    let startBodyY;
    let bodyW;
    let bodyH;

    let bottomX;
    let bottomY;
    let bottomW;

    let isSelected = true;
    let isRound;

    let nameTag;
    let nameTagNum;
    let ratios;

    let prototypeW;
    let prototypeH;

    let templateHeaderSpacingPadding = 50;
    let templateTitleColor = '#8d8d8d';
    let headerTopRowPadding = 15;
    let headerSecondRowPadding = 60;
    
    
    self.init = function (
        _startX,
        _startY,
        _totalW,
        _totalH,
        _backGroundColor,
        _nameTageName,
        _ratios,
        _isRound = true,
        _isSelect = true,
        _prototypeW = 570,
        _prototypeH = 300,
        _topH = 100,
        _bottomH = 20) {

        self.setPrototypeW(_prototypeW);
        self.setPrototypeH(_prototypeH);

        self.setStartX(_startX);
        self.setStartY(_startY);

        self.setTotalW(_totalW);
        self.setTotalH(_totalH);

        self.setTopH(_topH);
        self.setBottomH(_bottomH);

        self.setRatios(_ratios);

        self.addSelectCheckbox(_isSelect);

        self.addRoundCheckbox(_isRound);

        self.addDropDowMenu();

        self.addRoundSlider();


        self.setBackGroundColor(_backGroundColor);

        self.setNameTagName(_nameTageName);

        self.setSelectState(true);

        self.setRoundState(true);

        self.setRoundState(_isRound);

        self.setSelectState(_isSelect);


        // calculate body part pos and size.
        startBodyX = startX;
        startBodyY = startY + topH;
        bodyW = totalW;
        bodyH = totalH - topH - bottomH;

        //caluclate bottom part pos and size.
        bottomX = startX;
        bottomY = startY + totalH - bottomH;
        bottomW = totalW;

        nameTagNum = self.translateSelToNum(sel.value());

        nameTag = new NameTag();
        nameTag.init(

            nameRatioW = ratios.nameRatioW,
            nameRatioH = ratios.nameRatioH,

            subTextRatioW = ratios.subTextRatioW,
            subTextRatioH = ratios.subTextRatioH,

            padBtwNameAndSubTextRatio = ratios.padBtwNameAndSubTextRatio,

            imgRatioSize = ratios.imgRatioSize,
            imgRatioW = ratios.imgRatioW,
            imgRatioH = ratios.imgRatioH,
            prototypeW = prototypeW,
            prototypeH = prototypeH,

            );



    }
//23
    self.addSelectCheckbox = function (state) {

        checkbox = createCheckbox("", state);
        //checkbox.attribute("type", "checkbox");
        checkbox.attribute("id", "template-one-checkBox");
        checkbox.position(0, 0);
        checkbox.parent(select('#templates-panel-container'));
        checkbox.changed(self.selectEventHandler);
        checkbox.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>ENABLE TEMPLATE:</b> This will toggle the selected template on and off. Disabled templates will not be shown in PREVIEW panel.";})
    }

    self.addRoundCheckbox = function (state) {
        roundCheckbox = canvas.createCheckbox(' ROUND', state);
        //console.log(roundCheckbox);
        //roundCheckbox.attribute("type", "checkbox");
        roundCheckbox.attribute("id", "template-one-roundCheckBox");
        roundCheckbox.parent(select('#templates-panel-container'));
        roundCheckbox.changed(self.roundEventHandler);
        roundCheckbox.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>ROUNDED CORNERS TOGGLE:</b> This will toggle rounded edges on the template on and off.";})
    }

    self.addDropDowMenu = function () {
        canvas.push();
        canvas.textSize(32);
        canvas.textAlign(CENTER);
        sel = createSelect();
        sel.parent(select('#templates-panel-container'));
        sel.option('Full');
        sel.option('1/2');
        sel.option('1/3');
        sel.option('1/4');
        sel.selected('1/2');
        sel.changed(self.mySelectEvent);
        sel.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>DIVISION SELECTOR:</b> This will divide the template into fractions of the width of the PREVIEW page. e.g. 'full' is the entire width";})
        canvas.pop();
    }

    self.addRoundSlider = function () {
        roundSlider = canvas.createSlider(0, 100, 50);
        roundSlider.position(10, 10);
        roundSlider.parent(select('#templates-panel-container'));
        roundSlider.style('width', '80px');
        roundSlider.changed(()=>{ GLOBAL_FLASH_REFRESH_BUTTON_FLAG = true;});
        roundSlider.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>ROUNDED CORNERS AMOUNT:</b> This will increase/decrease the rounding on the corners of a template (Rounding needs to be enabled)";})
    }
    self.drawNameTag = function (c, data, startX, startY, pos) {
        nameTag.draw(
            c,
            data,
            startX,
            startY,
            pos,
            self.getRoundState());
    }

    // first row for input checkbox
    self.draw = function () {
        //preset

        
        canvas.noStroke();
        nameTag.setRound(map(roundSlider.value(), 0, 100, 0, 100));

        //draw background
        self.drawBackground(startX, startY, totalW, totalH);

        //draw top
        self.drawTop(startX, startY, totalW, topH);



        //draw body part
        self.drawBody(startBodyX, startBodyY, bodyW, bodyH);


        self.drawBottom(bottomX, bottomY, bottomW, bottomH);

        self.drawForeground(startX, startY, totalW, totalH);
    }


    //////////////////////////////////////////
    //////////  Draw Background  /////////////
    //////////////////////////////////////////
    self.drawBackground = function (startX, startY, w, h, color) {
        canvas.push();
        canvas.stroke(2);
        canvas.fill(backGroundColor);
        canvas.rect(startX, startY, w, h);
        canvas.pop();

    }

    ///////////////////////////////////
    //////////  Draw Top  /////////////
    ///////////////////////////////////
    self.drawTop = function (startX, startY, W, H) {
        
        

        //draw template name
        canvas.push();
        
        canvas.fill(23,23,23);
        canvas.rect(startX, startY, W, H);
        
        
        canvas.textFont(headerFont);
        canvas.textSize(24);
        canvas.fill(templateTitleColor);
        canvas.textAlign(LEFT, TOP);
        canvas.text(nameTagName, startX + templateHeaderSpacingPadding, startY + headerTopRowPadding, W);
        canvas.pop();

        //draw select checkbox
        checkbox.position(
            startX + headerTopRowPadding,
            startY + headerTopRowPadding);
        checkbox.size(25,25);
        
        
        // draw round checkbox
        roundCheckbox.position(startX + W * 0.45, startY + headerSecondRowPadding);
        roundCheckbox.size(25,25);
        if(isSelected)
        {
            roundCheckbox.disabled = false;
        }
        else
        {
            roundCheckbox.disabled = true;
        }
        

        // draw round slider
        roundSlider.position(startX + W * 0.65, startY + headerSecondRowPadding);
        if(isSelected)
        {
            roundSlider.elt.disabled =false;
        }
        else
        {
            roundSlider.elt.disabled =true;
        }
        

        // draw select box
        sel.position(startX + W * 0.85, startY + headerSecondRowPadding);
        if(isSelected)
        {
            sel.elt.disabled =false;
        }
        else
        {
            sel.elt.disabled =true;
        }

    }


    ////////////////////////////////////
    //////////  Draw Body  /////////////
    ////////////////////////////////////
    self.drawBody = function (startX, startY, W, H) {

        let pos = nameTag.getFullSize(W);

        let relativePos = nameTag.getRelativeSize(pos, 0.9);

        
        // draw nameTag
        nameTag.draw(
            canvas,
            GLOBAL_TEMPLATE_FILL_DATA,
            startX + headerTopRowPadding,
            startY + bottomH * 0.5,
            relativePos,
            self.getRoundState());

        
        
    }

    //////////////////////////////////////
    //////////  Draw Bottom  /////////////
    //////////////////////////////////////
    self.drawBottom = function (startX, startY, W, H) {

        //draw bottom padding
    }

    self.drawForeground = function (startX, startY, w, h, color)
    {
        if(!isSelected)
        {
            canvas.push();
            canvas.noStroke();
            canvas.fill(0, 0, 0, 100);
            canvas.rect(startX, startY, w, h);
            canvas.pop();
        }
        
    }


    /////////////////////////////////
    //////////  Setter  /////////////
    /////////////////////////////////
    self.setStartX = function (x) {
        startX = x;
    }

    self.setStartY = function (y) {
        startY = y;
    }
    self.setTopH = function (h) {
        topH = h;
    }
    self.setBottomH = function (h) {
        bottomH = h;
    }
    self.setTotalW = function (w) {
        totalW = w;
    }
    self.setTotalH = function (h) {
        totalH = h;
    }

    self.setBackGroundColor = function (color) {
        backGroundColor = color;
    }

    self.setNameTagName = function (name) {
        nameTagName = name;
    }

    self.setSelectState = function (state) {
        if(state)
        {
            templateTitleColor = '#40e770';
        }
        else
        {
            templateTitleColor = '#8d8d8d';
        }
        isSelected = state;
    }

    self.setRoundState = function (state) {
        isRound = state;
    }

    self.setRatios = function (_ratios) {
        ratios = _ratios;
    }

    self.setPrototypeW = function(value) {
        prototypeW = value;
    }

    self.setPrototypeH = function(value) {
        prototypeH = value;
    }

    /////////////////////////////////
    //////////  Getter  /////////////
    ///////////////////////////////// 

    self.getStartX = function () {
        return startX;
    }

    self.getStartY = function () {
        return startY;
    }

    self.getTopH = function () {
        return topH;
    }

    self.getBottomH = function () {
        return bottomH;
    }

    self.getTotalW = function () {
        return totalW;
    }

    self.getTotalH = function () {
        return totalH;
    }

    self.getSelectState = function () {
        return isSelected;
    }

    self.getCurrentHeight = function () {
        return 10;
    }

    self.getSelectState = function () {
        return isSelected;
    }

    self.getRoundState = function () {
        return isRound;
    }

    self.getNameTag = function () {
        return nameTag;
    }

    self.getDropDownMenuResult = function () {
        return nameTagNum;
    }

    self.getRatios = function () {
        return ratios;
    }


    //// select checkbox handler ////
    self.selectEventHandler = function () {

        if (checkbox.checked()) {

            self.setSelectState(true);
            

        }
        else {
            self.setSelectState(false);
            
        }

        
        GLOBAL_FLASH_REFRESH_BUTTON_FLAG = true;

    }
    //// round checkbox handler ////
    self.roundEventHandler = function () {

        if (roundCheckbox.checked()) {

            self.setRoundState(true);
        }
        else {
            self.setRoundState(false);
        }
        
        GLOBAL_FLASH_REFRESH_BUTTON_FLAG = true;
    }
    //// dropdown handler ////
    self.mySelectEvent = function () {
        let select = sel.value();
        nameTagNum = self.translateSelToNum(select);
        GLOBAL_FLASH_REFRESH_BUTTON_FLAG = true;
    }

    self.translateSelToNum = function (selection) {
        switch (selection) {
            case "Full":
                return 1;
            case "1/2":
                return 0.5;
            case "1/3":
                return 0.33;
            default:
                return 0.25;
        }
    }



}