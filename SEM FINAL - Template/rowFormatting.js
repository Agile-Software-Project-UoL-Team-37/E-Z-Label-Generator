function RowFormatting(c)
{
    this.w;
    this.h;
    this.x;
    this.y;
    this.color;

    var xLocal;
    var yLocal;

    let columnDivision = 22;

    this.rowData = new NameData();

    

    this.setup = function()
    {
        xLocal = this.w/columnDivision;
        yLocal = this.h;

        this.idCell = new Cell();
        this.idCell.init(0, 0, 2, 1, "int");
    
        this.enabledCell = new Cell();
        this.enabledCell.init(2, 0, 2, 1, "bool");

        this.nameCell = new Cell();
        this.nameCell.init(4, 0, 6, 1, "str");

        this.subtextCell = new Cell();
        this.subtextCell.init(10, 0, 6, 1, "str");

        this.colorCell = new Cell();
        this.colorCell.init(16,0, 2,1, "color");

        this.imageCell = new Cell();
        this.imageCell.init(18,0, 2,1, "img");

        this.deleteCell = new Cell();
        this.deleteCell.init(20,0, 2,1, "btn");

        this.rowData.populateData(2, false, "ALX", "subtext1", color(0,0,0), "test1.jpg");
   
   
    }

    this.draw = function()
    {
        
        c.fill(0,0,100);
        c.rect(this.x, this.y, this.w, this.h);
       

        c.fill(80,80,100);
        c.rect(this.idCell.x*xLocal, this.idCell.y, this.idCell.w*xLocal, this.idCell.h*yLocal);
        fill(255);
       // c.text(this.rowData.id, this.idCell.x*xLocal, this.idCell.h*yLocal/2);

        c.fill(70,70,100);
        c.rect(this.enabledCell.x*xLocal, this.enabledCell.y, this.enabledCell.w*xLocal, this.enabledCell.h*yLocal);

        c.fill(60,60,100);
        c.rect(this.nameCell.x*xLocal, this.nameCell.y, this.nameCell.w*xLocal, this.nameCell.h*yLocal);
        fill(255,255,255);
        c.text(this.rowData.name+"", this.nameCell.x*xLocal, this.nameCell.h*yLocal/2);

        c.fill(50,50,100);
        c.rect(this.subtextCell.x*xLocal, this.subtextCell.y, this.subtextCell.w*xLocal, this.subtextCell.h*yLocal);

        c.fill(40,40,100);
        c.rect(this.colorCell.x*xLocal, this.colorCell.y, this.colorCell.w*xLocal, this.colorCell.h*yLocal);

        c.fill(30,30,100);
        c.rect(this.imageCell.x*xLocal, this.imageCell.y, this.imageCell.w*xLocal, this.imageCell.h*yLocal);

        c.fill(100,20,20);
        c.rect(this.deleteCell.x*xLocal, this.deleteCell.y, this.deleteCell.w*xLocal, this.deleteCell.h*yLocal);

        
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
}