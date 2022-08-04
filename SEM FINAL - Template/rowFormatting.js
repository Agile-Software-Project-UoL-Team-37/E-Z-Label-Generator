function RowFormatting(c)
{
    this.w;
    this.h;
    this.x;
    this.y;
    this.color;

    this.paddingHor;
    this.paddingVer;

    var colW;
    var rowH;

    let columnDivision = 22;

    this.rowData = new NameData();

    let nameInput = createInput("Name");
    let subtextInput = createInput("Subtext");

    let enabledInput = createCheckbox();


   

    this.setup = function()
    {
        colW = this.w/columnDivision;
        rowH = this.h;

        this.idCell = new Cell();
        this.idCell.init(0, 0, 2, 1, "int");
    
        this.enabledCell = new Cell();
        this.enabledCell.init(2, 0, 2, 1, "bool");

        enabledInput.parent(namesPanelContainer);
        enabledInput.position(this.enabledCell.x*colW+this.paddingHor, this.y + this.enabledCell.y+this.paddingVer);
        enabledInput.size(this.enabledCell.w*colW-3*this.paddingHor, (this.enabledCell.h*rowH)-3*this.paddingVer);

        this.nameCell = new Cell();
        this.nameCell.init(4, 0, 6, 1, "str");
        
        nameInput.parent(namesPanelContainer);
        nameInput.position(this.nameCell.x*colW+this.paddingHor, this.y + this.nameCell.y+this.paddingVer);
        nameInput.size(this.nameCell.w*colW-3*this.paddingHor, (this.nameCell.h*rowH)-3*this.paddingVer);
        

        this.subtextCell = new Cell();
        this.subtextCell.init(10, 0, 6, 1, "str");
        
        subtextInput.parent(namesPanelContainer);
        subtextInput.position(this.subtextCell.x*colW+this.paddingHor, this.y + this.subtextCell.y+this.paddingVer);
        subtextInput.size(this.subtextCell.w*colW-3*this.paddingHor, (this.subtextCell.h*rowH)-3*this.paddingVer);

        this.colorCell = new Cell();
        this.colorCell.init(16,0, 2,1, "color");

        this.imageCell = new Cell();
        this.imageCell.init(18,0, 2,1, "img");

        this.deleteCell = new Cell();
        this.deleteCell.init(20,0, 2,1, "btn");

        //this.rowData.populateData(2, false, "ALX", "subtext1", color(0,0,0), "test1.jpg");
        
   
    }

    this.draw = function()
    {
        
        this.forceUdateProperties();



        
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

        
    }



    this.setPosition = function(_x, _y)
    {
        this.x = _x;
        this.y  = _y;
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

    this.forceUdateProperties = function()
    {
        enabledInput.position(this.enabledCell.x*colW+this.paddingHor, this.y + this.enabledCell.y+this.paddingVer);
        enabledInput.size(this.enabledCell.w*colW-3*this.paddingHor, (this.enabledCell.h*rowH)-3*this.paddingVer);
        enabledInput.value(true);

        nameInput.position(this.nameCell.x*colW+this.paddingHor, this.y + this.nameCell.y+this.paddingVer);
        nameInput.size(this.nameCell.w*colW-3*this.paddingHor, (this.nameCell.h*rowH)-3*this.paddingVer);
        nameInput.value(this.rowData.name);

        subtextInput.position(this.subtextCell.x*colW+this.paddingHor, this.y + this.subtextCell.y+this.paddingVer);
        subtextInput.size(this.subtextCell.w*colW-3*this.paddingHor, (this.subtextCell.h*rowH)-3*this.paddingVer);
        subtextInput.value(this.rowData.subtext);
    }
}