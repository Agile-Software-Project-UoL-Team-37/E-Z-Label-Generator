function HeaderFormatting(c)
{
    this.w;
    this.h;
    this.x;
    this.y;
    this.color;
    this.rowNumber;
    this.rowHeightMultiplier;
    
    this.paddingHor;
    this.paddingVer;
    
    this.deleteFlag = false;
    this.imageSelectFlag = false;
    var colorSelectFlag = false;
    var enabledToggleFlag = false;
    var subtextChangedFlag = false;

    this.rowData = new NameData();
    
    let subtextInput = createInput();
    let enabledInput = createCheckbox();
    let colorInput = createColorPicker();
    
    var self = this;
    
    subtextInput.attribute("placeholder", "Global Subtext");
    subtextInput.addClass("text-input-subtext");
    
    this.trashcanActive;
    this.trashcanHighlight;
    
    this.setup = function()
    {
        this.trashcanActive = loadImage("assets/Trashcan Icon/trashcan4.png");
        this.trashcanHighlight = loadImage("assets/Trashcan Icon/trashcan2.png");
        this.x = 0;
        this.y = 0;
    }

    this.refreshPageData = function()
    {

        //---------------------------------/  ID  /--------------------------------------
        this.idCell = new Cell();
        this.idCell.initLocalPositions(0, 1.75, 2, 1);
        this.idCell.initPadding(this.paddingHor,this.paddingVer, 0);
        this.idCell.initParentWidthAndHeight(this.w,this.h);
        this.idCell.setParentY(this.y);
        this.idCell.updatePosition();


        //---------------------------------/  ENABLED  /--------------------------------------
        this.enabledCell = new Cell();
        this.enabledCell.initLocalPositions(2, 1.75, 2, 1);
        this.enabledCell.initPadding(0,0, 0);
        this.enabledCell.initParentWidthAndHeight(this.w,this.h);
        this.enabledCell.setParentY(this.y);
        this.enabledCell.updatePosition();
        enabledInput.mouseClicked(this.onCheckboxClicked);

        enabledInput.parent(namesPanelContainer);
        enabledInput.position(this.enabledCell.x +this.enabledCell.w/4 , this.enabledCell.y + this.enabledCell.h/4);
        enabledInput.size(this.enabledCell.w/2, this.enabledCell.h/2);
        enabledInput.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>GLOBAL ENABLED TOGGLE:</b> Will enable or disable ALL the rows in the list. Click to toggle. A confirmation window will pop up.";});
        

        if(this.rowData.enabled)
        {
            enabledInput.checked(true);
        }
        else
        {
            enabledInput.checked(false);

        }

        //---------------------------------/  NAME  /--------------------------------------
        this.nameCell = new Cell();
        this.nameCell.initLocalPositions(4, 1.75, 6, 1);
        this.nameCell.initPadding(0, 0, 2.5);
        this.nameCell.initParentWidthAndHeight(this.w,this.h);
        this.nameCell.setParentY(this.y);
        this.nameCell.updatePosition();
        

        //---------------------------------/  SUBTEXT  /--------------------------------------
        this.subtextCell = new Cell();
        this.subtextCell.initLocalPositions(10, 1.75, 6, 1);
        this.subtextCell.initPadding(0, 0, 2.5);
        this.subtextCell.initParentWidthAndHeight(this.w,this.h);
        this.subtextCell.setParentY(this.y);
        this.subtextCell.updatePosition();

        subtextInput.parent(namesPanelContainer);
        subtextInput.position(this.subtextCell.x + this.subtextCell.w*0.05, this.subtextCell.y + this.subtextCell.h/5);
        subtextInput.size(this.subtextCell.w *0.85, this.subtextCell.h*0.5);
        subtextInput.value(this.rowData.subtext);
        subtextInput.changed(this.onSubtextChanged);
        subtextInput.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>GLOBAL SUBTEXT TEXT FIELD:</b> Will overwrite the subtext field on all of the enabled rows. A confirmation window will pop up.";});

        
        //---------------------------------/  COLOR  /--------------------------------------
        this.colorCell = new Cell();
        this.colorCell.initLocalPositions(16,1.75, 2,1);
        this.colorCell.initPadding(0, 0, 2.5);
        this.colorCell.initParentWidthAndHeight(this.w,this.h);
        this.colorCell.setParentY(this.y);
        this.colorCell.updatePosition();
        colorInput.parent(namesPanelContainer);
        colorInput.position(this.colorCell.x, this.colorCell.y);
        colorInput.size(this.colorCell.w, this.colorCell.h);
        colorInput.changed(this.onColorSelectorChanged);
        colorInput.mouseOver(()=>{TUTORIAL_MESSAGE = "<b>GLOBAL COLOR SELECTOR:</b> Will overwrite the color selections on all of the enabled rows. A confirmation window will pop up.";});
        
        
        colorInput.value(this.rowData.color);


        //---------------------------------/  IMAGE  /--------------------------------------
        this.imageCell = new Cell();
        this.imageCell.initLocalPositions(18,1.75, 2,1);
        this.imageCell.initPadding(this.paddingHor,this.paddingVer, 0);
        this.imageCell.initParentWidthAndHeight(this.w,this.h);
        this.imageCell.setParentY(this.y);
        this.imageCell.updatePosition();

        //---------------------------------/  DELETE  /--------------------------------------
        this.deleteCell = new Cell();
        this.deleteCell.initLocalPositions(20,1.75, 2,1);
        this.deleteCell.initPadding(this.paddingHor,this.paddingVer, 0);
        this.deleteCell.initParentWidthAndHeight(this.w,this.h);
        this.deleteCell.setParentY(this.y);
        this.deleteCell.updatePosition();
   
    }
    
    //Delete HTML elements
    this.deleteAllHTML = function()
    {
        nameInput.remove();
        subtextInput.remove();
        enabledInput.remove();
        colorInput.remove();
    }
    
    //GLobal Checkbox click handler
    this.onCheckboxClicked = function()
    {
        if(confirm("Are you sure you want to overwrite the enabled status of all rows?"))
        {
            enabledToggleFlag = true;
            self.saveData();
        }
        else
        {
            self.refreshPageData();
        }
        
    }
    
    //Global color select click handler
    this.onColorSelectorChanged = function()
    {
        if(confirm("Are you sure you want to overwrite ALL colors for selected rows?"))
        {
            colorSelectFlag = true;
            self.saveData();
            GLOBAL_DEFAULT_COLOR = self.getColor();
        }
        else
        {
            self.refreshPageData();
        }
        
    }
    
    //Global subtext changed handler
    this.onSubtextChanged = function()
    {
        if(confirm("Are you sure you want to overwrite ALL subtexts for selected rows?"))
        {
            subtextChangedFlag = true;
            self.saveData();
            GLOBAL_DEFAULT_SUBTEXT = self.getSubtext();
        }
        else
        {
            self.refreshPageData();
        }
        
    }

    this.saveData = function()
    {
        this.rowData.setData(this.rowData.id, enabledInput.checked(), "", subtextInput.value(), colorInput.value(), null);
    }
    
    //------------------// OPERATION FLAGS FOR PARENT //--------------------

    this.getSubtextChangedFlag = function()
    {
        return subtextChangedFlag;
    }

    this.setSubtextChangedFlag = function(_flag)
    {
        subtextChangedFlag = _flag;
    }
    
    this.getColorSelectFlag = function()
    {
        return colorSelectFlag;
    }

    this.setColorSelectFlag = function(_flag)
    {
        colorSelectFlag = _flag;
    }
    
    this.getEnabledToggleFlag = function()
    {
        return enabledToggleFlag;
    }

    //------------------// SETTERS //--------------------
    
    this.setEnabledToggleFlag = function(_flag)
    {
        enabledToggleFlag = _flag;
    }
    
    this.setID = function(_id)
    {
        this.rowData.id = _id;
    }

    this.setEnabled = function(_enabled)
    {
        this.rowData.enabled = _enabled;
    }

    this.setName = function(_name)
    {
        this.rowData.name = _name;
    }

    this.setSubtext = function(_subtext)
    {
        this.rowData.subtext = _subtext;
    }

    this.setColor = function(_color)
    {
        this.rowData.color = _color;
    }

    this.setImage = function(_image)
    {
        this.rowData.image = _image
    }

    this.setImagePath = function(_imagePath)
    {
        this.rowData.image = this.rowData.loadImage(_imagePath);
    }
    
    //----------------------------------------//        ENDPOINTS   START      //-------------------------------------------

    /**
     * Returns int.
     * Returns row identification number/index.
     */
    this.getID = function()
    {
        //Returns bool
        return this.rowData.id;
    }

    /**
     * Returns bool.
     * Whether row is selected to be active or not.
     */
    this.getEnabled = function()
    {
        return this.rowData.enabled;
    }

    /**
     * Returns string.
     * Name of the row.
     */
    this.getName = function()
    {
        return this.rowData.name;
    }

    /**
     * Returns string.
     * Subtext of the row.
     */
    this.getSubtext = function()
    {
        return this.rowData.subtext;
    }

    /**
     * Returns string.
     * Its the row color in HEX FORMAT
     */
    this.getColor = function()
    {
        return this.rowData.color;
    }

    /**
     * Returns image object.
     * The image assigned to the row.
     */
    this.getImage = function()
    {
        return this.rowData.image;
    }
    //----------------------------------------//        ENDPOINTS  END       //-------------------------------------------

    
    //Hides all header HTML elements
    this.hideRow = function()
    {
        subtextInput.addClass("force-hide");
        enabledInput.addClass("force-hide");
        colorInput.addClass("force-hide");
        
    }

    //show all header HTML elements
    this.showRow = function()
    {
        subtextInput.removeClass("force-hide");
        enabledInput.removeClass("force-hide");
        colorInput.removeClass("force-hide");
    }
    

    //CLICK HANDLER
    this.mousePressed = function (cnv)
	{
        
        if(this.idCell.tryClick(cnv))
        {
            return;
        }

        //Global Image cell click handler and confirmation
        if(this.imageCell.tryClick(cnv))
        {
            if(confirm("Are you sure you want to replace all images for selected rows?"))
            {
                this.imageSelectFlag = true;
            }
            else {
                this.imageSelectFlag = false;
            }
            
            return;
        }

        //Global delete click handler and confirmation
        if(this.deleteCell.tryClick(cnv))
        {
           
            if(confirm("Are you sure you want to delete all selected rows?"))
            {
                this.deleteFlag = true;
            }
            else
            {
                this.deleteFlag = false;
            }
            
            return;
        }
        
    }
    
    //Hover handler
    this.mouseOver = function(cnv)
    {
        if(this.deleteCell.tryHover(cnv))
        {
            return;
        }
    }


    //VARIOUS FORMATTING TO DRAW HEADER COMPONENT
    this.draw = function()
    {
        
        let headerTextDisplacement = 20;
        let headerTextSize = 13;
        
        //Background
        c.fill(10,10,10)
        c.rect(this.x, this.y, GLOBAL_COLUMN_DIVISION * GLOBAL_COLUMN_WIDTH, GLOBAL_ROW_HEIGHT*headerOffsetMultiplier);
        
        c.fill(255);
        c.textAlign(CENTER, CENTER);
        c.text("GLOBAL CONTROLS", this.w/2, this.h * 1/this.rowHeightMultiplier/2);

        //ID
        c.push()
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("ID", this.idCell.x +this.idCell.w/2, this.idCell.y - headerTextDisplacement);
        c.pop();
        

        //ENABLED
        c.push()
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("Enabled", this.enabledCell.x +this.enabledCell.w/2, this.enabledCell.y - headerTextDisplacement);
        c.pop();
        
        //NAME
        c.push()
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("Name", this.nameCell.x +this.subtextCell.w/2, this.subtextCell.y - headerTextDisplacement);
        c.pop();
        
        //SUBTEXT
        c.push()
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("Subtext", this.subtextCell.x +this.subtextCell.w/2, this.subtextCell.y - headerTextDisplacement);
        c.pop();

        //COLOR
        c.push()
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("Color", this.colorCell.x +this.colorCell.w/2, this.colorCell.y - headerTextDisplacement);
        c.pop();

        //IMAGE
        c.push()
        
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("Image", this.imageCell.x +this.imageCell.w/2, this.imageCell.y - headerTextDisplacement);
        c.rect(this.imageCell.x, this.imageCell.y, this.imageCell.w, this.imageCell.h, this.imageCell.w/5);
        c.image(this.rowData.image, this.imageCell.x, this.imageCell.y, this.imageCell.w, this.imageCell.h);
        c.pop();

        if(this.imageCell.tryHover(c))
        {
            c.cursor('pointer');
            c.push();
            c.fill(0,0,100,80);
            c.rect(this.imageCell.x, this.imageCell.y, this.imageCell.w, this.imageCell.h, this.imageCell.w/5);
            c.pop();
            TUTORIAL_MESSAGE = "<b>GLOBAL IMAGE SELECTOR:</b> Clicking will open up image selection screen. Selecting an image here will overwrite ALL the images on enabled rows. A confirmation window will pop up."
        }

        //DELETE
        c.push()
        c.fill(255,255,255,255);
        c.textSize(headerTextSize);
        c.text("Delete", this.deleteCell.x +this.deleteCell.w/2, this.deleteCell.y - headerTextDisplacement);
        c.fill(120,20,20);
        c.pop();

        //Trashcan icon highlight
        if(this.deleteCell.tryHover(c))
        {
            c.cursor('pointer');
            c.image(this.trashcanHighlight, this.deleteCell.x + this.deleteCell.w/2 - this.deleteCell.h*0.7*trashcanAR/2, this.deleteCell.y + this.deleteCell.h*0.15, this.deleteCell.h*trashcanAR*0.7,this.deleteCell.h*0.7);
            TUTORIAL_MESSAGE = "<b>[WARNING] - DELETE ALL BUTTON:</b> This will delete ALL of the enabled rows in the list - Use carefully. A confirmation window will pop up."
        }
        else
        {
            c.image(this.trashcanActive, this.deleteCell.x + this.deleteCell.w/2 - this.deleteCell.h*0.7*trashcanAR/2, this.deleteCell.y + this.deleteCell.h*0.15, this.deleteCell.h*trashcanAR*0.7,this.deleteCell.h*0.7);
        }
        
        //Divider lines
        c.push();
        c.fill(30,30,40);
        c.noStroke();
        c.rect(this.x, this.h - 5, this.w, 5);
        c.pop();

        c.push();
        c.fill(30,30,40);
        c.noStroke();
        c.rect(this.x, this.h/this.rowHeightMultiplier - 5, this.w, 5);
        c.pop();
    
    }
    
    this.setPosition = function(_rowNumber)
    {
        this.rowNumber = _rowNumber;
        this.x = 0;
        this.y  = GLOBAL_ROW_HEIGHT * (this.rowNumber+1);
        
        this.rowData.id = _rowNumber;
    }

    this.setGlobalRowSize = function(_w, _h, _mult)
    {
        this.w = _w;
        this.h = _h;
        this.rowHeightMultiplier = _mult;
    }

    this.setPadding = function(_hor, _ver)
    {
        this.paddingVer = _ver;
        this.paddingHor = _hor;
    }
}