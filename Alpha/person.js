class Person{
    plan;
    constructor(x,y,px,py,parentid,isRoot){
        this.w = 10
        this.ex = x
        this.ey = y
        this.px = px
        this.py = py
        this.isRoot = isRoot
        this.currentBalance = 100
        this.parentid = parentid
        this.level = -1
        this.profit = 0
        this.plan = {
         
            1 : {
                people:2,upgrade:200,currentpeople:0,amount:0
            },
            2:{
                people:4,upgrade:400,currentpeople:0,amount:0
            },
            3:{
                people:8,upgrade:0,currentpeople:0,amount:0
            }
           
        }
        this.atJoin = function(){
            this.level = 0
            let upgradeAmount = this.currentBalance
            this.currentBalance = 0

            return upgradeAmount

        }
        
        


    }
    
    update(childfee){
        this.plan[this.level+1].currentpeople +=1
        this.plan[this.level+1].amount +=childfee
        if(this.plan[this.level+1].people==this.plan[this.level+1].currentpeople){
            if(this.level==3){
                return [false]
            }
            this.level+=1
            this.plan[this.level].amount -= this.plan[this.level].upgrade
          
            
            return [true,this.level,this.parentid,this.plan[this.level].upgrade]

        }
            return [false]
        



    }







    getPlan(){
        return this.plan
    }

    drawEllipse(){
        stroke(0)
        ellipse(this.ex,this.ey,this.w)
        stroke(255,204)
        textSize(this.w*1.6)
        text(this.level,this.ex-5,this.ey+5)
        
        return this
      
    }

    drawLine(){
        stroke(255, 204, 0)
        if(!this.isRoot){
                let deg = atan2(this.ey-this.py,this.ex-this.px)
                

            line(this.px,this.py,this.ex-this.w*cos(deg),this.ey-this.w*sin(deg))

        }

       

    }

    money() {
      
        
        
    }


  



    pNode(x,y,parentid){
            let deg = atan2(y-this.ey,x-this.ex)
        return new Person(x,y,this.ex+this.w*cos(deg),this.ey+ this.w*sin(deg),parentid,false)
    }

  
    
}