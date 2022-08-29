function ImageFormatting(c) 
{
    this.x;
    this.y;
    this.w;
    this.h;
    this.image;
    this.padding;
    this.deleteMode = false;
    var aspectRatio;
    
    var isHovering;
    
    this.setSize = function(_width, _height)
    {
        this.w = _width;
        this.h = _height;
    }

    this.setPadding = function(_padding)
    {
        this.padding = _padding;
    }
    
    this.setPosition = function(_x, _y)
    {
        this.x = _x;
        this.y = _y;
    }
    
    this.setImage = function(_image)
    {
        this.image = _image;

        aspectRatio = this.image.width/this.image.height;
    }
    
    this.forceImageAR = function(_w, _h)
    {
        aspectRatio = _w/_h;
    }
    
    this.draw = function()
    {
        if(deleteImageMode)
        {
            c.fill(230,190,190);
        }
        else
        {
            c.fill(210,210,230);
        }
        
        c.rect(this.x, this.y, this.w, this.h);
        c.image(this.image, this.x + this.padding, this.y + this.padding, this.w - this.padding*2 , (this.h - this.padding*2) );
        
        
        if(isHovering)
        {
            
            
            //Delete mode off
            if(!deleteImageMode)
            {
                if(GLOBAL_NAMES_HEADER.imageSelectFlag)
                {
                    TUTORIAL_MESSAGE = "<b>SELECT IMAGE [GLOBAL]:</b> Selecting this will assign this image to all enabled rows.";
                }
                else
                {
                    TUTORIAL_MESSAGE = "<b>SELECT IMAGE:</b> Selecting this will assign this image to the corresponding row.";
                }
                
                //Highlight blue for selection
                c.push();
                c.fill(0,0,100,80);
                c.rect(this.x, this.y, this.w, this.h);
                c.fill(255);
                c.stroke(0);
                c.text("SELECT", this.x+this.w/2, this.y+this.h/2);
                c.pop();
                
                if(this.x == 0 && this.y == GLOBAL_ROW_HEIGHT)
                {
                    if(GLOBAL_NAMES_HEADER.imageSelectFlag)
                    {
                        TUTORIAL_MESSAGE = "<b>NO IMAGE [GLOBAL]:</b> Selecting this will disable all the images on enabled rows.";
                    }
                    else
                    {
                        TUTORIAL_MESSAGE = "<b>NO IMAGE:</b> Selecting this will disable the image from the corresponding row.";

                    }
                    
                }
                
                if(this.x == this.w && this.y == GLOBAL_ROW_HEIGHT)
                {
                    if(GLOBAL_NAMES_HEADER.imageSelectFlag)
                    {
                        TUTORIAL_MESSAGE = "<b>RANDOM IMAGE [GLOBAL]:</b> Selecting this will assign random images from the list of images to all enabled rows.";
                    }
                    else
                    {
                        TUTORIAL_MESSAGE = "<b>RANDOM IMAGE:</b> Selecting this will choose a random image from the list of images to assign to the corresponding row.";

                    }
                    
                }
            }
            //Delete mode on
            else
            {
                //Dont highlight permanent images
                if(this.x < this.w*2 && this.y == GLOBAL_ROW_HEIGHT)
                {
                    return;
                }

                //Highlight red for deletion
                c.push();
                c.fill(100,0,0,80);
                c.rect(this.x, this.y, this.w, this.h);
                c.fill(255);
                c.stroke(0);
                c.text("DELETE", this.x+this.w/2, this.y+this.h/2);
                c.pop();
                TUTORIAL_MESSAGE = "<b>DELETE-IMAGE:</b> Selecting this will delete this image from the list of images.";
            }
            
           
        }
        
    
    }

    this.tryClick = function(c)
    {
        if (c.mouseX > this.x && c.mouseX < this.x + this.w && c.mouseY > this.y && c.mouseY < this.y + this.h)
        {
            //console.log("IMAGE PRESSED: x | " + this.x + "  y | " +this.y );
            
            return true;

        }
       
        return false;
    }

    this.mouseOver = function(c)
    {
        if (c.mouseX > this.x && c.mouseX < this.x + this.w && c.mouseY > this.y && c.mouseY < this.y + this.h)
        {
            // c.fill(0,0,100,50);
            // c.rect(this.x, this.y, this.w, this.y);
            isHovering = true;
            return true;

        }
        isHovering = false;
        return false;
        
    }
    
}
