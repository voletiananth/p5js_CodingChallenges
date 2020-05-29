class Person{
    constructor(x,y,px,py,isRoot){
        this.w = 10
        this.ex = x
        this.ey = y
        this.px = px
        this.py = py
        this.isRoot = isRoot
        


    }

    drawEllipse(){
        stroke(0)
        ellipse(this.ex,this.ey,this.w)
        return this
      
    }

    drawLine(){
        

       

    }

    getX(dis,deg){
        return dis*cos(deg)
    }

    getY(dis,deg){
        return  dis*sin(deg)
    }



    pNode(x,y){

       
        return new Person(x,y,this.ex,this.ey,false)
    }

  
    
}