
let board;
let s;
let count = 0;
let boardColors =[]
let tileColors = []

function updateColor(c){
    
  for (let i = 0; i < s; i++) {
   
    for (let j = 0; j < s; j++) {

      let tile = board[i][j]
      if(tile!=-1){
        tileColors[i][j] = boardColors[c-tile]
      }
    }
  }

}


function createboard(k) {
  boardColors.push(color(255, 225, 143))
  let board = []
  
    for (let i = 0; i < k; i++) {
    board[i] = []
    tileColors[i] = []
    for (let j = 0; j < k; j++) {
      board[i][j] = 0
      tileColors[i][j] = boardColors[0]
    }
  }
  let x = Math.floor(random(0, board.length))
  let y = Math.floor(random(0, board.length))
  board[x][y] = -1
  return board

}

function mid(s, e) {
  return Math.floor(s + (e - s) / 2)
}


async function locate_defective(r1, c1, r2, c2 ) {

  let defect = function (r1, c1, r2, c2) {
    if (r2 < r1) {
      return  undefined
    }

    let _mid =mid(r1,r2)

    for (let i = c1; i < c2 + 1; i++) {
      
      if (board[_mid][i] == -1) {
        return [_mid,i]
      }
    }

    let f_half = defect(r1, c1,_mid-1, c2)
    
    if (f_half != undefined) {
      return f_half
    }
    return defect(_mid+1, c1, r2, c2,)
  }

  let result = defect(r1, c1, r2, c2)
  
  let r = result[0], c = result[1]

  if (r <= mid(r1, r2)) {
    // left
    if (c <= mid(c1, c2))
      return 0
    // right
    else
      return 1

  }// Bottom
  else {
    // left
    if (c <= mid(c1, c2)) {
      return 2
    } // Right
    else
      return 3
  }
 
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function add_defective(dict,defect){
    

    for(let i=0;i<4;i++){
      if(i!=defect)
        board[dict[i][0]][dict[i][1]] = -1

    }

    await sleep(1000)

}

async function add_trionimo(dict,defect){
  count+=1


 
  
  for(let i=0;i<4;i++){
    if(i!=defect)
      board[dict[i][0]][dict[i][1]] = count
      

  }
  r = random(255); // r is a random number between 0 - 255
  g = random(100,200); // g is a random number betwen 100 - 200
  b = random(100); // b is a random number between 0 - 100
  boardColors.push(color(r,g,b))

  updateColor(count);

  
  await sleep(1000)
}


 async function tile_rec(r1,c1,r2,c2){
  let dict = {
    0:[mid(r1,r2),mid(c1,c2)],
    1:[mid(r1,r2),mid(c1,c2)+1],
    2:[mid(r1,r2)+1,mid(c1,c2)],
    3:[mid(r1,r2)+1,mid(c1,c2)+1]
  } 
  let defect = await locate_defective(r1,c1,r2,c2)
  console.log()

  if(r1 == r2-1 && c1==c2-1){

    await add_trionimo(dict,defect)

     return;
  }else{

    await add_defective(dict,defect)

    await tile_rec(r1,c1,dict[0][0],dict[0][1]) //top-left
    await tile_rec(r1,dict[1][1],dict[1][0],c2) //top-right
    await tile_rec(dict[2][0],c1,r2,dict[2][1]) //bottom-left
    await tile_rec(dict[3][0],dict[3][1],r2,c2) //bottom-right
    await add_trionimo(dict,defect)

  }
   
  
 
}


async function tile(k){


  await tile_rec(0,0,s-1,s-1)
}



let tile_width,tile_height;
async function setup() {
  createCanvas(600,600).position(300,0)
  s = 8
  tile_width = width/s
  tile_height = height/s
  board = createboard(s)

 
  new Promise(async (resolve)=>{
    await sleep(1000)
   await tile(s)
   
    resolve()
  }).then(()=>{
  
    noLoop()
  }
    
  )
 
  
  
  


}



function draw() {
  background(0)
  stroke(255)
  strokeWeight(1)
  for(let j=0;j<s;j++){
    for(let i=0;i<s;i++){
      let tile = board[j][i]
      stroke(255)
      strokeWeight(1)
      
      if(tile==-1){
        fill(0)
        rect(i*tile_width,j*tile_height,tile_width,tile_width)

      }else{
        fill(tileColors[j][i])
        rect(i*tile_width,j*tile_height,tile_width,tile_width)
        fill(255)
        noStroke()
        let txt_w = (35/100)*tile_width
        textSize(txt_w)
        text(tile,i*tile_width+tile_width/2-txt_w/4,j*tile_height+tile_height/2+txt_w/4)
      }
      
    }
  }
  
  
}



