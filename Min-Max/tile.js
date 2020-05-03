class Tile{
    _w ;
    _arr;
    _size
    _x;
    _y;
    _low;
    _min;
    _max;
    _hasMin_Max;
    _level;
    _isRoot;

    constructor(isRoot,xwidth,ywidth,w,y,level,low,...arr){
        this._low = low
        this._w = w
        this._arr = arr
        this._size = arr.length
       
        this._x = xwidth+(ywidth-xwidth-this._size*this._w)/2
        this._y =  (level*2*this._w)+y
        this._min = 0
        this._max = 0
        this._hasMin_Max = false
        this._level = level
        this._isRoot = isRoot
        
    }

    
    
    
    draw(){
        let s = 0.3*this._w
        textSize(s)
        

        for(let i=0,j=this._low;i<this._size;i++,j++){
            stroke(0)
            strokeWeight(1)
            noFill()
            rect(i*this._w+this._x,this._y,this._w,this._w)
            noStroke()
            fill(0)
            text(this._arr[i],i*this._w+this._w/2+this._x-s/2,this._y+this._w/2+s/2)
            text(j,i*this._w+this._w/2+this._x-s/2,this._y+this._w*1.5)
           if(this._hasMin_Max){
                text("min : "+this._min,this._x+this._size*this._w/2-23,this._y+this._w*1.7+s)
                text("max : "+this._max,this._x+this._size*this._w/2-23,this._y+this._w*1.7+2*s)
           }
            
        }
    }

     isRoot(){
         return this._isRoot
    }

    drawOutline(){
   
        stroke(232,32,21)
        noFill()
        rect(this._x-1,this._y-1,this._size*this._w+2,this._w+2)
        
          }
         

    drawPoutline(p,s){
        stroke(232,32,21)
        noFill()
        rect(this._x-1+(p-this._low)*this._w,this._y-1,s*this._w+2,this._w+2)

    }
    setMin_Max(min,max){
        this._hasMin_Max = true
        this._min = min
        this._max = max
    }

  
 
    
}


class DivideTile extends Tile{
    #parent
    #initial = true
    #p
    #s
    constructor(xwidth,ywidth,w,y,level,low,parentid,...arr){
        super(false,xwidth,ywidth,w,y,level,low,...arr)
        this.#parent = parentid
        this.#p = low
        this.#s = arr.length
            
        
    }

    

    drawTile(flag){
        
        if(this.#initial){
            switch(flag){
                case 0:
                    this.#initial = false
                    break;
                case 1:
                    this.#parent.drawOutline()
                    break;
                
                case 2:
                   this.#parent.drawPoutline(this.#p,this.#s)
                    break;

                case 3:
                    this.drawOutline()
                   
            }
            
           
        }else{
            this.draw()
        }
        
        
        
        
    }
}


class MergeTile extends Tile{
    #parent1
    #parent2
    #initial = true
    constructor(xwidth,ywidth,w,y,level,low,parent1,parent2,...arr){
        super(false,xwidth,ywidth,w,y,level,low,...arr)
        this.#parent1 = parent1
        this.#parent2 = parent2
    }

   

    drawTile(flag){
        if(this.#initial){
           
            switch(flag){
                case 0:
                    this.#initial = false
                    break;

                case 2:
                case 1:
                    this.#parent1.drawOutline()
                    this.#parent2.drawOutline()

                    break;
                
                  
                 case 3:
                    this.drawOutline()
                     break;
                default:
                    

            }
       
            
           
        }else{
            this.draw()
        }
        
    }

    }
