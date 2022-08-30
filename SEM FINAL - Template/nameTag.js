function NameTag() {

    var self = this;

    let prototypeW;
    let prototypeH;

    let nameRatioW;
    let nameRatioH;

    let subTextRatioW;
    let subTextRatioH;

    let padBtwNameAndSubTextRatio;

    let imgRatioSize;
    let imgRatioW;
    let imgRatioH;

    let round = 20;



    self.init = function (
        _nameRatioW,
        _nameRatioH,
        _subTextRatioW,
        _subTextRatioH,
        _padBtwNameAndSubTextRatio,
        _imgRatioSize,
        _imgRatioW,
        _imgRatioH,
        _prototypeW = 570,
        _prototypeH = 300
    ) {

        prototypeW = _prototypeW;
        prototypeH = _prototypeH;

        nameRatioW = _nameRatioW;
        nameRatioH = _nameRatioH;

        subTextRatioW = _subTextRatioW;
        subTextRatioH = _subTextRatioH;

        padBtwNameAndSubTextRatio = _padBtwNameAndSubTextRatio;

        imgRatioSize = _imgRatioSize;
        imgRatioW = _imgRatioW;
        imgRatioH = _imgRatioH;

    }
    // first resize all parameters to canvasW
    self.update = function () {

    }

    // we can leave number of nametags to template class or other class
    // we only need the width and height here.

    // we draw something first
    self.draw = function (c, data, startX, startY, pos, isRound,) {

        let isImgDisabled = data.imageDisabled;
        
        if(c.mouseX > startX && c.mouseX < startX + pos.relativeW && c.mouseY > startY && c.mouseY < startY + pos.relativeH)
        {
            TUTORIAL_MESSAGE = "<b>TEMPLATE EXAMPLE:</b> This is an example of the label that will be generated on the PREVIEW page.";
        }


        c.textFont(templateFont);
        //draw stroke
        c.fill(data.getColor());
        c.rect(
            startX + pos.padding,
            startY + pos.padding,
            pos.relativeW - pos.padding * 2,
            pos.relativeH - pos.padding * 2,
            isRound ? round : 0);
        c.fill(255);
        c.rect(
            startX + pos.strokeWeight + pos.padding,
            startY + pos.strokeWeight + pos.padding,
            pos.relativeW - pos.strokeWeight * 2 - pos.padding * 2,
            pos.relativeH - pos.strokeWeight * 2 - pos.padding * 2,
            isRound ? round : 0);

        //draw Name
        let name = data.getName();
        let textW = pos.relativeW * (isImgDisabled ? 1 : nameRatioW);
        let textH = pos.relativeH * (isImgDisabled ? 0.5 : nameRatioH);

        c.push();
        c.textAlign(CENTER, BOTTOM);
        c.textSize(self.getNameSize(name.length, textW, textH));
        c.fill(data.getColor());

        c.text(name, startX + pos.padding, startY + pos.padding, textW, textH);
        c.pop();

        //draw Subtext
        let subText = data.getSubtext();
        let subTextX = startX + pos.padding;
        let subTextY = startY + pos.padding + pos.relativeH * (nameRatioH + padBtwNameAndSubTextRatio);
        let subTextW = pos.relativeW * (isImgDisabled ? 1 : subTextRatioW);
        let subTextH = pos.relativeH * (isImgDisabled ? 0.2 : subTextRatioH);

        c.push();
        c.textAlign(CENTER, TOP);
        c.textSize(self.getSubTextSize(subText.length, subTextW, subTextH));
        c.fill(data.getColor());
        c.text(subText,
            subTextX,
            subTextY,
            subTextW,
            subTextH
        )
        c.pop();

        //draw Image
        if (!data.imageDisabled) {
            c.push();
            c.imageMode(CENTER);

            c.image(data.getImage(),
                startX + pos.relativeW * (1 - imgRatioW) + pos.relativeW * (imgRatioSize / 2),
                startY + pos.relativeH * imgRatioH,
                pos.relativeW * (isImgDisabled ? 0 : imgRatioSize),
                pos.relativeW * (isImgDisabled ? 0 : imgRatioSize)
            );
            c.pop();
        }

    }
    self.getFullSize = function (canvasW) {
        let zoom = canvasW / prototypeW;
        let fullW = prototypeW * zoom;
        let fullH = prototypeH * zoom;
        let fullStrokeWeight = 10 * zoom;
        let fullPadding = 3;//10 * zoom;
        return { fullW, fullH, fullStrokeWeight, fullPadding };
    }

    self.getRelativeSize = function (pos, _ratio) {
        let relativeW = pos.fullW * _ratio;
        let relativeH = pos.fullH * _ratio;
        let strokeWeight = pos.fullStrokeWeight * _ratio;
        let padding = pos.fullPadding * _ratio;

        return { relativeW, relativeH, strokeWeight, padding };
    }

    self.setRound = function (value) {
        round = value;
    }

    self.getNameSize = function (strLength, W, H) {

        return 2*Math.min(70,Math.min(Math.floor(W / strLength), H / 2));
    }

    self.getSubTextSize = function (strLength, W, H) {

        return 2*Math.min(Math.floor(W / strLength * 0.8), H / 2);
    }




}

