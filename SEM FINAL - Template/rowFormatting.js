function RowFormatting(c)
{
    this.w;
    this.h;
    this.x;
    this.y;
    this.color;
    this.rowNumber;

    this.paddingHor;
    this.paddingVer;

    var colW;
    var rowH;

    this.rowData = new NameData();

    let nameInput = createInput("Name");
    let nameInput2 = createInput("Name");
    let subtextInput = createInput("Subtext");

    let enabledInput = createCheckbox();
    let enabledInput2 = createCheckbox();
    let colorInput = createColorPicker();


   

    this.setup = function()
    {
        colW = this.w/GLOBAL_COLUMN_DIVISION;
        rowH = this.h;

        this.idCell = new Cell();
        this.idCell.init(0, 0, 2, 1, "int");
    
        this.enabledCell = new Cell();
        this.enabledCell2 = new Cell();
        this.enabledCell.init(2, 0, 2, 1, "bool");
        this.enabledCell2.initLocalPositions(2, 0, 2, 1, "bool");

        enabledInput.parent(namesPanelContainer);
        enabledInput.position(this.enabledCell.x*colW+this.paddingHor, this.y + this.enabledCell.y+this.paddingVer);
        enabledInput.size(this.enabledCell.w*colW-3*this.paddingHor, (this.enabledCell.h*rowH)-3*this.paddingVer);

        this.nameCell = new Cell();
        this.nameCell.init(4, 0, 6, 1, "str");
        
        nameInput.parent(namesPanelContainer);
        nameInput.position(this.nameCell.x*colW+this.paddingHor, this.y + this.nameCell.y+this.paddingVer);
        nameInput.size(this.nameCell.w*colW-3*this.paddingHor, (this.nameCell.h*rowH)-3*this.paddingVer);
        

        this.subtextCell = new Cell();
        this.subtextCell2 = new Cell();
        this.subtextCell.init(10, 0, 6, 1, "str");
        this.subtextCell2.initLocalPositions(10, 0, 6, 1, "str");
        
        subtextInput.parent(namesPanelContainer);
        subtextInput.position(this.subtextCell.x*colW+this.paddingHor, this.y + this.subtextCell.y+this.paddingVer);
        subtextInput.size(this.subtextCell.w*colW-3*this.paddingHor, (this.subtextCell.h*rowH)-3*this.paddingVer);

        this.colorCell = new Cell();
        this.colorCell2 = new Cell();
        this.colorCell.init(16,0, 2,1, "color");
        this.colorCell2.initLocalPositions(16,0, 2,1, "color");
        colorInput.parent(namesPanelContainer);
        colorInput.position(this.colorCell.x*colW+this.paddingHor, this.y + this.colorCell.y+this.paddingVer);
        colorInput.size(this.colorCell.w*colW-3*this.paddingHor, (this.colorCell.h*rowH)-3*this.paddingVer);


        this.imageCell = new Cell();
        this.imageCell2 = new Cell();
        this.imageCell.init(18,0, 2,1, "img");
        this.imageCell2.initLocalPositions(18,0, 2,1, "img");

        this.deleteCell = new Cell();
        this.deleteCell2 = new Cell();
        this.deleteCell.init(20,0, 2,1, "btn");
        this.deleteCell2.initLocalPositions(20,0, 2,1, "btn");

        //this.rowData.populateData(2, false, "ALX", "subtext1", color(0,0,0), "test1.jpg");
        this.forceUpdateProperties();
   
    }

    this.setup2 = function()
    {

        //---------------------------------/  ID  /--------------------------------------
        this.idCell2 = new Cell();
        this.idCell2.initLocalPositions(0, 0, 2, 1, "int");
        this.idCell2.initPadding(this.paddingHor,this.paddingVer, 0);
        this.idCell2.initParentWidthAndHeight(this.w,this.h);
        this.idCell2.setParentY(this.y);
        this.idCell2.updatePosition();




        //---------------------------------/  ENABLED  /--------------------------------------
        this.enabledCell2 = new Cell();
        this.enabledCell2.initLocalPositions(2, 0, 2, 1, "bool");
        this.enabledCell2.initPadding(this.paddingHor,this.paddingVer, 0);
        this.enabledCell2.initParentWidthAndHeight(this.w,this.h);
        this.enabledCell2.setParentY(this.y);
        this.enabledCell2.updatePosition();

        enabledInput2.parent(namesPanelContainer);
        //busy here
        //enabledInput2.className = "names-panel-text-input-field";
        //enabledInput2.classList.add('names-panel-text-input-field');
        enabledInput2.position(this.enabledCell2.x, this.enabledCell2.y);
        enabledInput2.size(this.enabledCell2.w, this.enabledCell2.h);

        if(this.rowData.enabled)
        {
            enabledInput2.checked(true);
        }
        else
        {
            enabledInput2.checked(false);

        }

        //---------------------------------/  NAME  /--------------------------------------
        this.nameCell2 = new Cell();
        this.nameCell2.initLocalPositions(4, 0, 6, 1);
        this.nameCell2.initPadding(0, 0, 2.5);
        this.nameCell2.initParentWidthAndHeight(this.w,this.h);
        this.nameCell2.setParentY(this.y);
        this.nameCell2.updatePosition();

        nameInput2.parent(namesPanelContainer);
        nameInput2.position(this.nameCell2.x, this.nameCell2.y);
        nameInput2.size(this.nameCell2.w, this.nameCell2.h);

        nameInput2.value(this.rowData.name);

        




       // this.forceUpdateProperties();
   
    }

    this.saveData = function()
    {
        this.rowData.setData(this.rowData.id, enabledInput.value(), nameInput.value(), subtextInput.value(), colorInput.color(), this.rowData.image);
    }

    this.mousePressed = function (cnv)
	{

        if(this.idCell2.tryClick(cnv))
        {
            console.log("ID button clicked :)")
            return;
        }

        // //WONT WORK BECAUSE HTML ELEMENT BLOCKING
        // if(this.enabledCell2.tryClick(cnv))
        // {
            
        //     console.log("ENABLED button clicked :)")
        //     return;
        // }
    }


    this.draw2 = function()
    {
        c.textAlign(CENTER, CENTER);
        c.fill(0,150,100);
        c.rect(this.x, this.y, GLOBAL_COLUMN_DIVISION * GLOBAL_COLUMN_WIDTH, GLOBAL_ROW_HEIGHT);

        //this.idCell2

        c.fill(80,80,100);
        c.rect(this.idCell2.x, this.idCell2.y, this.idCell2.w, this.idCell2.h);
        c.fill(255,255,255);
        c.text(this.rowData.id, this.idCell2.x + this.idCell2.w/2, this.y + this.idCell2.h/2);

        c.fill(60,60,100);
        c.rect(this.enabledCell2.x, this.enabledCell2.y, this.enabledCell2.w, this.enabledCell2.h);
        c.fill(255,255,255);
        c.text(this.rowData.enabled, this.enabledCell2.x + this.enabledCell2.w/2, this.y + this.enabledCell2.h/2);
       
        
    }


    this.draw = function()
    {
        
        
    
        c.textAlign(CENTER, CENTER);
        c.fill(0,0,100);
        c.rect(this.x, this.y, this.w, this.h);
       

        c.fill(80,80,100);
        c.rect(this.idCell.x*colW, this.y + this.idCell.y, this.idCell.w*colW, this.idCell.h*rowH);
        c.fill(255,255,255);
        c.text(this.rowData.id, this.idCell.x*colW + this.idCell.w/2*colW, this.y + this.idCell.h*rowH/2);

        c.fill(70,70,100);
        c.rect(this.enabledCell.x*colW,this.y +  this.enabledCell.y, this.enabledCell.w*colW, this.enabledCell.h*rowH);
        c.fill(255,255,255);
        c.text(this.rowData.enabled, this.enabledCell.x*colW + this.enabledCell.w/2*colW, this.y + this.enabledCell.h*rowH/2);
        

        c.fill(60,60,100);
        c.rect(this.nameCell.x*colW, this.y + this.nameCell.y, this.nameCell.w*colW, this.nameCell.h*rowH);
        c.fill(255,255,255);
        c.textAlign(CENTER);
        c.text(this.rowData.name, this.nameCell.x*colW + this.nameCell.w/2*colW, this.y + this.nameCell.h*rowH/2);
        

        c.fill(50,50,100);
        c.rect(this.subtextCell.x*colW, this.y + this.subtextCell.y, this.subtextCell.w*colW, this.subtextCell.h*rowH);


        c.fill(this.rowData.color);
        c.rect(this.colorCell.x*colW, this.y + this.colorCell.y, this.colorCell.w*colW, this.colorCell.h*rowH);

        c.fill(30,30,100);
        c.rect(this.imageCell.x*colW, this.y + this.imageCell.y, this.imageCell.w*colW, this.imageCell.h*rowH);
        c.image(this.rowData.image, this.imageCell.x*colW, this.y + this.imageCell.y, this.imageCell.w*colW, this.imageCell.h*rowH);

        c.fill(100,20,20);
        c.rect(this.deleteCell.x*colW, this.y + this.deleteCell.y, this.deleteCell.w*colW, this.deleteCell.h*rowH);

        //this.saveData();
    }



    this.setPosition = function(_rowNumber)
    {
        this.rowNumber = _rowNumber;
        this.x = 0;
        this.y  = GLOBAL_ROW_HEIGHT*this.rowNumber;
    }

    this.setGlobalRowSize = function(_w, _h)
    {
        this.w = _w;
        this.h = _h;
    }

    this.setPadding = function(_hor, _ver)
    {
        this.paddingVer = _ver;
        this.paddingHor = _hor;
    }

    this.forceUpdateProperties = function()
    {
        enabledInput.position(this.enabledCell.x*colW+this.paddingHor, this.y + this.enabledCell.y+this.paddingVer);
        enabledInput.size(this.enabledCell.w*colW-3*this.paddingHor, (this.enabledCell.h*rowH)-3*this.paddingVer);
        if(this.rowData.enabled)
        {
            enabledInput.checked(true);
        }
        else
        {
            enabledInput.checked(false);

        }
        

        nameInput.position(this.nameCell.x*colW+this.paddingHor, this.y + this.nameCell.y+this.paddingVer);
        nameInput.size(this.nameCell.w*colW-3*this.paddingHor, (this.nameCell.h*rowH)-3*this.paddingVer);
        nameInput.value(this.rowData.name);

        subtextInput.position(this.subtextCell.x*colW+this.paddingHor, this.y + this.subtextCell.y+this.paddingVer);
        subtextInput.size(this.subtextCell.w*colW-3*this.paddingHor, (this.subtextCell.h*rowH)-3*this.paddingVer);
        subtextInput.value(this.rowData.subtext);

        colorInput.position(this.colorCell.x*colW+this.paddingHor, this.y + this.colorCell.y+this.paddingVer);
        colorInput.size(this.colorCell.w*colW-3*this.paddingHor, (this.colorCell.h*rowH)-3*this.paddingVer);
        colorInput.value(this.rowData.color);

        //console.log(this.rowData.color.toString());
    }
}