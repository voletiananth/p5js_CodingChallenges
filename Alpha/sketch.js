
let ppl;
let pplArray;
let totallevel;
let distance;
let width;
let height;
let nodeRadius


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  



function setup(){

    totallevel = 11
    nodeRadius = 10 
    ppl = (1<<(totallevel+1))-1
    console.log("People : "+ppl)
    pplArray = []

    width = (1<<totallevel) *(2*nodeRadius+2)
    height = (totallevel+1)*(2*nodeRadius*10)



  
    createCanvas(width,height)
   
        new Promise(
            async (resolve)=>{
                await alphaf(0,width,20,0,ppl-1,-1,0,0)
                 resolve()
               
             }
         ).then(()=>{
            noLoop()
           
         })
         
}

async function alphaf(xwidth,ywidth,height,low,high,parentid,state,level){
    if(low  > high)
        return ;

    let mid = low +(high-low)/2
    let midwidth =  Math.floor( xwidth+(ywidth-xwidth)/2)
  
    
    pplArray.push(data(midwidth,height,parentid,state,level))
   await sleep(50)
    let len = pplArray.length-1

    await alphaf(xwidth,midwidth,height,low,mid-1,len,1,level+1)
    
    await alphaf(midwidth+1,ywidth,height,mid+1,high,len,2,level+1)

    return;
     

}


function data(x,y,parentid,state,level){
    y = level*(2*nodeRadius*10) + y
    switch(state){
       
        case 0 :
            return new Person(x,y,0,0,0) 
        case 1 :
            return pplArray[parentid].pNode(x,y)
        case 2 :
            return pplArray[parentid].pNode(x,y)
    }

   
}


function draw(){
    ellipseMode(RADIUS)
    background("#fffff")

    for(let i=0;i<pplArray.length;i++){
        pplArray[i].drawEllipse().drawLine()
        
    }




   

  

}