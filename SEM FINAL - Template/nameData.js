function NameData(id)
{
    this.id = -1;
    this.enabled = true;
    this.name = "name";
    this.subtext = "subtext";
    this.color = color(25, 25, 25);
    this.image = "BLANK";

    this.populateData = function(_id, _enabled, _name, _subtext, _color, _image)
    {
        this.id = _id;
        this.enabled = _enabled;
        this.name = _name;
        this.subtext = _subtext;
        this.color = _color;
        this.image = this.loadImage(_image);
        
    }

    this.loadImage = function(_imagePath)
        {
            imgInput = loadImage(_imagePath);
            return imgInput;
        }

}

