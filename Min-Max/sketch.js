let data = []
let arrlist;
let cw,ch;
let total;
let f ;
function setup(){
    f = 5
    cw = windowWidth
    ch = windowHeight   
    createCanvas(600,600).position((cw-600)/2,0)
    arrlist= [23,57,24,04,41,56,27,76,54,31,3]
    data.push(new Tile(true,0,0,0,0,0,0,[]))

    total = 0;
    new Promise(
       async (resolve)=>{
            console.log(  await  min_max(0,arrlist.length-1,0,width,0,0,...arrlist))
            resolve()
          
        }
    ).then(()=>{
        noLoop()
    })
    
    
   
}

function flag(c){
    f  = c
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function  pushData(parnt,tile){
    

    data.push(tile)

  
    if(!parnt){
        await sleep(500)
        flag(1)
        await sleep(500)
        flag(2)

    }
    await sleep(500)

    flag(3)
    await sleep(500)
    flag(0)
    await sleep(500)
    flag(5)
}

async function min_max(low,high,xwidth,ywidth,level,parentid,...arr)
{   
   
    if(level>total){
        total = level
    }
    let  sarr = arr.slice(low,high+1)
    let parnt = data[parentid]
    let tile =  new DivideTile(xwidth,ywidth,30,20,level,low,parnt,...sarr)
    if(low==high){
        tile.setMin_Max(arr[low],arr[high])
       await pushData(parnt.isRoot(),tile)
        
       
        return [arr[low],arr[high],data.length-1]; 
    }

    else if(low+1==high){
        if(arr[low]<arr[high]){
           
            
            tile.setMin_Max(arr[low],arr[high])
            await pushData(parnt.isRoot(),tile)
            
            
          
            
            return [arr[low],arr[high],data.length-1]

        }else{
            tile.setMin_Max(arr[high],arr[low])
            
            await pushData(parnt.isRoot(),tile)
            
           
            return [arr[high],arr[low],data.length-1]
        }
       
        

    }else{
     
        await pushData(parnt.isRoot(),tile)
       let  midwidth = xwidth+(ywidth-xwidth)/2
       let  mid = Math.floor(low+(high-low)/2)
       let leng = data.length-1
        let f = await min_max(low,mid,xwidth,midwidth,level+1,leng,...arr)
        let s = await min_max(mid+1,high,midwidth+1,ywidth,level+1,leng,...arr)
      

        if(f[0]>s[0]){
            f[0] = s[0]
        }
        if(f[1]<s[1]){
            f[1]=s[1]
        }



        
      tile = new MergeTile(xwidth,ywidth,30,(total-level)*30+20,total+total-level,low,data[f[2]],data[s[2]],...sarr)
        tile.setMin_Max(f[0],f[1])
       
      data.push(tile)
        await sleep(500)
        flag(1)
        await sleep(500)
        flag(3)
        await sleep(500)
         flag(0)

      await sleep(500)
        flag(5)
    
     
    
   
     
        f[2] = data.length-1
        
        return f
        
    }
}


function draw(flag){
   
 background("#FFFFF")
    
  
   for(let i= 1;i<data.length;i++){
        let d = data[i]
        d.drawTile(f)
       
     

     }

   

 
}