function CustomUI()
{
    this.w;
    this.h;
    this.x;
    this.y;
    this.color;





    this.draw = function()
    {
        fill(this.color)
        rect(this.x, this.y, this.w, this.h);

    }
}