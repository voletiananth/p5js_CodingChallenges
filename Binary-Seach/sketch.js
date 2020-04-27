let size;
let cp;
let arr;
let w ;
let low,mid,high;


function setup(){

    createCanvas(windowWidth,windowHeight)
    arr = [9,15,17,25,47,50,48,70]
    size = arr.length
    cp = 10/100*width
    w = (width-2*cp)/size
    low = undefined
    high = undefined
    mid = undefined
      
    new Promise( async(resolve,reject)=>{
        try{
           await binarySearch(0,arr.length-1,16)
            resolve()
        }catch(error){
            reject()
        }
    }).then(()=>{
        noLoop()
    }).catch(()=>{
        
        noLoop();
    })
   
}

async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function binarySearch(low_val,high_val,val)
{   if(low_val>high_val){
        low = arr.length
        high = undefined
         throw 'value not found'
    }
    mid_val =   Math.floor(low_val+(high_val-low_val)/2)
    
    low = low_val
    high = high_val
    await sleep(1000)
    mid = mid_val
    await sleep(1000)
    if(arr[mid]==val){
       
        return;
    }
     
    mid = undefined
    if(arr[mid_val]>val){
        return binarySearch(low_val,mid_val-1,val)
    }
    return binarySearch(mid_val+1,high_val,val)
    
    

   
}

function draw(){
    background("#FFFFF")
    
    noFill()
    let txtsize = 20/100*w
    textSize(txtsize)
     strokeWeight(2)
    
    for(let i=0;i<size;i++){
        stroke(0)
       if( (high!=undefined && high<i) || ( low!=undefined && low>i) )
        stroke("#C0C0C0")
       rect(i*w+cp,cp,w-4,w)
       text(arr[i],i*w+cp+w/2-txtsize/2-2,cp+w/2+txtsize/2)
       
        
       text(i,i*w+cp+w/2-txtsize/2-2,cp+w+w/2)
       
    }
     strokeWeight(10)
    if(low!=undefined && high!=undefined){
        stroke("#FF0000")
        ellipse(low*w+cp+w/2-txtsize/2+4,cp+w+w/2-4,w-0.5*w-4)
        stroke("#FF6347")
        ellipse(high*w+cp+w/2-txtsize/2+4,cp+w+w/2-4,w-0.5*w-4)

    }
    if(mid!=undefined){
        stroke("#008000")
        ellipse(mid*w+cp+w/2-txtsize/2+4,cp+w+w/2-4,w-0.5*w-4)
    }
       







   
}