function Cell()
{
    this.x;
    this.y ;
    this.w ;
    this.h ;
    this.type ;
    this.isButton = false;

    this.init = function(_x, _y, _w, _h, _type)
    {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.type = _type;
    }

    this.setAsButton = function(_isButton)
    {
        this.isButton = _isButton;
    }

    this.tryClick = function()
    {
        if (mouseX > this.x && mouseX < this.x + this.w + 10 && mouseY > this.y && mouseY < this.y + this.h)
            {
                return true;
            }
            return false;
    }

}