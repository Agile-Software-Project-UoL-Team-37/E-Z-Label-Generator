function NameData()
{
    this.id = -1;
    this.enabled = false;
    this.name = "";
    this.subtext = "";
    this.color = color(200, 200, 200);
    this.image = "imageName.jpg";

    this.populateData = function(_id, _enabled, _name, _subtext, _color, _image)
{
    this.id = _id;
    this.enabled = _enabled;
    this.name = _name;
    this.subtext = _subtext;
    this.color = _color;
    this.image = _image;

}

}
