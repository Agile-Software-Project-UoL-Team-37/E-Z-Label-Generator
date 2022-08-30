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
        _topH = 50,
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
            prototypeW = prototypeW,
            prototypeH = prototypeH,
            );



    }

    self.addSelectCheckbox = function (state) {

        checkbox = canvas.createCheckbox("", state);
        checkbox.attribute("type", "checkbox");
        checkbox.attribute("id", "template-one-checkBox");
        checkbox.position(0, 0);
        checkbox.parent(select('#templates-panel-container'));
        checkbox.changed(self.selectEventHandler);
    }

    self.addRoundCheckbox = function (state) {
        roundCheckbox = canvas.createCheckbox(' ROUND', state);
        console.log(roundCheckbox);
        roundCheckbox.attribute("type", "checkbox");
        roundCheckbox.attribute("id", "template-one-roundCheckBox");
        roundCheckbox.parent(select('#templates-panel-container'));
        roundCheckbox.changed(self.roundEventHandler);
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
        canvas.pop();
    }

    self.addRoundSlider = function () {
        roundSlider = canvas.createSlider(0, 100, 50);
        roundSlider.position(10, 10);
        roundSlider.parent(select('#templates-panel-container'));
        roundSlider.style('width', '80px');
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
        canvas.textSize(24);
        canvas.fill(0);
        canvas.textAlign(CENTER, CENTER);
        canvas.text(nameTagName, startX, startY, W / 2, H);
        canvas.pop();
        // draw round checkbox
        roundCheckbox.position(startX + W * 0.5, startY + H / 3);

        // draw round slider
        roundSlider.position(startX + W * 0.65, startY + H / 3);

        // draw select box
        sel.position(startX + W * 0.85, startY + H / 3);

    }


    ////////////////////////////////////
    //////////  Draw Body  /////////////
    ////////////////////////////////////
    self.drawBody = function (startX, startY, W, H) {

        let pos = nameTag.getFullSize(W);

        let relativePos = nameTag.getRelativeSize(pos, 0.75);

        // draw nameTag
        nameTag.draw(
            canvas,
            GLOBAL_TEMPLATE_FILL_DATA,
            startX,
            startY + bottomH * 0.5,
            relativePos,
            self.getRoundState());

        //draw select checkbox
        checkbox.position(
            startX + W * 0.9,
            startY + H / 2);
    }

    //////////////////////////////////////
    //////////  Draw Bottom  /////////////
    //////////////////////////////////////
    self.drawBottom = function (startX, startY, W, H) {

        //draw bottom padding
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


    }
    //// round checkbox handler ////
    self.roundEventHandler = function () {

        if (roundCheckbox.checked()) {

            self.setRoundState(true);
        }
        else {
            self.setRoundState(false);
        }
    }
    //// dropdown handler ////
    self.mySelectEvent = function () {
        let select = sel.value();
        nameTagNum = self.translateSelToNum(select);
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