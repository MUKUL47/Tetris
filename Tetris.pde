import java.util.Collections;
int Layout[][] = new int[20][29];
boolean LayoutMark[][] = new boolean[20][29], nextPiece=false, start=true;
ArrayList<Integer> pieceX = new ArrayList<Integer>();
ArrayList<Integer> pieceY = new ArrayList<Integer>();
int randItem;
int S = second(), S1=S;
void setup()
{
  size(400, 600);
  initLayout();
  layout();
  frameRate(12);
  pickRandItem();
  
}
void draw() {
  S = millis(); //S1=S;
  layout();
  newControls();
  if(nextPiece){resetPieces();}
  if(checkBottom()){DestroyBottom();}
  for(int i=0;i<20;i++){if(!LayoutMark[i][1]){noLoop();}}
}

//Update every pixel
void layout() {
  int x=0, y=40, Y=0;
  for (int i=0; i<20; i++) {
    if (Layout[i][Y]==1 && x==i*20 && y==Y*20+40 || !LayoutMark[i][Y]) { 
      fill(50);
    } else { 
      fill(200);
    }

    rect(x, y, 20, 20);
    x+=20; 
    if (i==19 && Y<29-1) { 
      i=-1; 
      x=0; 
      y+=20; 
      Y+=1;
    }
  }
}

void newControls() {
  if(keyPressed ){
  temporaryClear();
  if (keyCode == DOWN && Collections.max(pieceY)<27) {
    for (int i=0; i<pieceY.size(); i++) {  
      pieceY.set(i, pieceY.get(i)+1);      
    }
  }
  else if (Collections.max(pieceX)<=18 && keyCode == RIGHT && !checkRightPiece() ) {
    for (int i=0; i<pieceY.size(); i++) {  
      pieceX.set(i, pieceX.get(i)+1);
    }
  }
  else if (Collections.min(pieceX)>0 && keyCode == LEFT && !checkLeftPiece()) {    
    for (int i=0; i<pieceY.size(); i++) {  
      pieceX.set(i, pieceX.get(i)-1);
    }
  }
 if(Collections.max(pieceY)<26 && checkBelowPiece()){nextPiece=true;}
}

   if(abs(S-S1)>=350 && Collections.max(pieceY)<27){ 
     temporaryClear();
  for (int i=0; i<pieceY.size(); i++) {  
      pieceY.set(i, pieceY.get(i)+1);
    }
    S1=S;
 }
 if(checkBelowPiece()){nextPiece=true;}
 if(Collections.max(pieceY)==27){nextPiece=true;}
 
    for (int i=0; i<pieceX.size(); i++) {
      Layout[pieceX.get(i)][pieceY.get(i)]=1;
    }
 
  
}
void resetPieces(){
for(int i=0;i<pieceY.size();i++){
LayoutMark[pieceX.get(i)][pieceY.get(i)]=false;
Layout[pieceX.get(i)][pieceY.get(i)]=(int)random(50,150);
}
pieceY.clear();
pieceX.clear();
pickRandItem();
nextPiece=false;

}

void initLayout() {
  for (int i=0; i<20; i++) {
    for (int j=0; j<29; j++) {
      Layout[i][j]=0;
      LayoutMark[i][j]=true;
    }
  }
}

void temporaryClear(){
for (int i=0; i<20; i++) {
    for (int j=0; j<29; j++) {
      for(int k=0;k<pieceX.size();k++){
      if(pieceX.get(k)!=i && pieceY.get(k)!=j) Layout[i][j]=0;
      }      
    }
  }
}

boolean checkBottom() {
  for (int j=0; j<20; j++) {
    if (LayoutMark[j][27]) {
      return false;
    }
  }
  return true;
}

void DestroyBottom() {  
  int Layout1[][] = new int[20][29];
  boolean LayoutMark1[][] = new boolean[20][29];
  for (int i=0; i<20; i++) {
    Layout1[i][0]=0; 
    LayoutMark1[i][0]=true;
  }
  for (int j=0, j1=1; j<28; j++, j1++) { 
    for (int i=0; i<20; i++) { 
      Layout1[i][j1]=Layout[i][j];
      LayoutMark1[i][j1]=LayoutMark[i][j];
    }
  }
  Layout=Layout1;
  LayoutMark=LayoutMark1;
}

void pickRandItem() {
  randItem =(int)random(1,6);
  if (randItem==1) {
    int start = (int)random(0,16);    pieceX.add(start);   
    pieceY.add(0);    
    pieceX.add(start-1);    
    pieceY.add(1);     
    pieceX.add(start);   
    pieceY.add(1);     
    pieceX.add(start+1);   
    pieceY.add(1);         
  }
  else if(randItem==2) {
    int start = (int)random(0,16);
    pieceX.add(start);    
    pieceY.add(0);   
    pieceX.add(start+1);    
    pieceY.add(0);   
    pieceX.add(start);   
    pieceY.add(1);     
    pieceX.add(start+1);   
    pieceY.add(1);         
  }
  else if(randItem==3) {
    int start = (int)random(0,14);
    //1
    pieceX.add(start);    
    pieceY.add(0);    
    pieceX.add(start+1);    
    pieceY.add(0);       
    pieceX.add(start+1);   
    pieceY.add(1);       
    pieceX.add(start+2);   
    pieceY.add(1);         
  }
    else if(randItem==4) {
    int start = (int)random(0,16);
    pieceX.add(start);    
    pieceY.add(0);   
    pieceX.add(start);    
    pieceY.add(1);    
    pieceX.add(start+1);   
    pieceY.add(1);      
    pieceX.add(start+2);   
    pieceY.add(1);         
  }else{
    int start = (int)random(0,14);
    pieceX.add(start);    
    pieceY.add(0);   
    pieceX.add(start+1);    
    pieceY.add(0);    
    pieceX.add(start+2);   
    pieceY.add(0);      
    pieceX.add(start+3);   
    pieceY.add(0);}
}


boolean checkBelowPiece(){
for(int i=0;i<pieceX.size();i++){
  pieceX.set(i,abs(pieceX.get(i)));
  pieceY.set(i,abs(pieceY.get(i)));
if(!LayoutMark[pieceX.get(i)][pieceY.get(i)+1]){return true;}
}
return false;
}
boolean checkRightPiece(){
for(int i=0;i<pieceX.size();i++){
if(!LayoutMark[pieceX.get(i)+1][pieceY.get(i)]){return true;}
}
return false;
}
boolean checkLeftPiece(){
for(int i=0;i<pieceX.size();i++){
if(!LayoutMark[pieceX.get(i)-1][pieceY.get(i)]){return true;}
}
return false;
}
