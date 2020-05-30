
let ppl;
let pplArray;
let totallevel;
let distance;
let width;
let height;
let nodeRadius;
let count =0 ;
let ncount = 0
let aData = false,pUpdate =false;

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
            aData = true
          
           
         })

         
}

async function alphaf(xwidth,ywidth,height,low,high,parentid,state,level){
   
    if(low  > high)
        return ;
     
    let mid = Math.floor(low +(high-low)/2)
    let midwidth =  Math.floor( xwidth+(ywidth-xwidth)/2)
  
    let a = data(midwidth,height,parentid,state,level)
    let j = a.atJoin()
    
    pplArray.push(a)

  
    new Promise(async (resolve)=>{
        count++
        updateData(parentid,j)
       resolve()
    }).then(()=>{
            if(count==ppl-1){
                pUpdate = true
            }
    })
     await sleep(50)

    let len = pplArray.length-1

    await alphaf(xwidth,midwidth,height,low,mid-1,len,1,level+1)
    
    await alphaf(midwidth+1,ywidth,height,mid+1,high,len,2,level+1)

    return;
     

}



function updateData(parentid,childfee){
    if(parentid==-1){
        count+=childfee
        return;
    }
   let parentData = pplArray[parentid].update(childfee)

     if(!parentData[0]){
        return;
     }
       
   let  parent = findParent(0,parentData[1],parentData[2])

   if(!parent[0]){
    count+=parentData[3]
    return;
   }

    return updateData(parent[1],parentData[3])
}


function findParent(parentlevel,level,parentid){
    if(parentid==-1){
       return [false]
    }
    if(parentlevel==level)
         return [true,parentid]

    return findParent(parentlevel+1,level,pplArray[parentid].parentid)

}

function data(x,y,parentid,state,level){
    y = level*(2*nodeRadius*10) + y
    switch(state){
       
        case 0 :
            return new Person(x,y,0,0,parentid,true) 
        case 1 :
            return pplArray[parentid].pNode(x,y,parentid)
        case 2 :
            return pplArray[parentid].pNode(x,y,parentid)
    }

   
}


function draw(){
    ellipseMode(RADIUS)
    background("#fffff")

    for(let i=0;i<pplArray.length;i++){
        pplArray[i].drawEllipse().drawLine()
        
    }

  


  if(aData&&pUpdate){
      noLoop()
      console.log("__________END_________")
  }




   

  

}