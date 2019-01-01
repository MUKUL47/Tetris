import java.util.Collections;
int Layout[][] = new int[20][29];
boolean LayoutMark[][] = new boolean[20][29], nextPiece=false, start=true, down=true ;
int Color[][] = new int[20][29], COGX =0, COGY =0;
ArrayList<Integer> pieceX = new ArrayList<Integer>();
ArrayList<Integer> pieceY = new ArrayList<Integer>();
int randItem=0;
int S = second(), S1=S;
int S2=S;
void setup()
{
  size(400, 600);
  initLayout();
  layout();
  frameRate(20);
  pickRandItem();
}
void draw() {
  S = millis(); 
  layout();
  if(nextPiece){resetPieces();}  
  newControls();
  if (keyPressed && keyCode == UP) {    
    rotatePiece();
  }
  if(checkBottom()>0){DestroyBottom();}
  for(int i=0;i<20;i++){if(!LayoutMark[i][2]){noLoop();}}
}

//Update every pixel
void layout() {
  
  int x=0, y=40, Y=0;
  for (int i=0; i<20; i++) {
    if (Layout[i][Y]==1 && x==i*20 && y==Y*20+40 || !LayoutMark[i][Y] ) {  
 fill(int(Color[i][Y]/1000000),(Color[i][Y]%1000000)/1000,Color[i][Y]%1000);    } else {       fill(200);    }

    rect(x, y, 20, 20);
    x+=20; 
    if (i==19 && Y<29-1) {       i=-1;       x=0;       y+=20;       Y+=1;    }  }
}

void newControls() {
  temporaryClear();
  
  if (keyPressed  && keyCode == DOWN && Collections.max(pieceY)<=28) {COGY+=1;
    for (int i=0; i<pieceY.size(); i++) {  
      pieceY.set(i, pieceY.get(i)+1);            
    }
    
  }
  else if (keyPressed && Collections.max(pieceX)<=18 && keyCode == RIGHT && !checkRightPiece() ) {COGX+=1;
    for (int i=0; i<pieceY.size(); i++) {  
      pieceX.set(i, pieceX.get(i)+1);           
    } 
     
  }
  else if (keyPressed && Collections.min(pieceX)>0 && keyCode == LEFT && !checkLeftPiece()) {    COGX-=1; 
    for (int i=0; i<pieceY.size(); i++) {  
      pieceX.set(i, pieceX.get(i)-1);
    }      
  }

   if(!( keyPressed  && keyCode == DOWN ) && S-S1>=300 && Collections.max(pieceY)<27){ 
     COGY+=1; 
  for (int i=0; i<pieceY.size(); i++) {  
      pieceY.set(i, pieceY.get(i)+1);          
    } 
    S1=S;
    if (keyCode == UP && keyPressed && S-S2>=300 ) {    
    rotatePiece();
  }
 }
  
 temporaryClear();
    for (int i=0; i<pieceX.size(); i++) {
      Layout[abs(pieceX.get(i))][pieceY.get(i)]=1;
    }
 if(checkBelowPiece()){nextPiece=true;}
}
void resetPieces(){
int R = (int)random(100,250);
int G = (int)random(100,250);
int B = (int)random(100,250); 
String finalColor=R+""+G+""+B;
for(int i=0;i<pieceY.size();i++){
LayoutMark[pieceX.get(i)][pieceY.get(i)]=false;
Layout[pieceX.get(i)][pieceY.get(i)]=1;
Color[pieceX.get(i)][pieceY.get(i)]=int(finalColor);
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
      Color[i][j]=0;
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

int checkBottom() {
  int c=0,j1=0;
  for (int i=0; i<20; i++) {
    for(int j=0;j<28;j++){
    if (!LayoutMark[i][j]) {
      c+=1;j1=j;
    }
  } if(c==18){println(j1);return j1;} c=0; }
  return -1;
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
  randItem =(int)random(0,6);
  switch(randItem){
  case 1 : int start = (int)random(3,15);   
    pieceX.add(start);   
    pieceY.add(0);    
    pieceX.add(start-1);    
    pieceY.add(1);     
    pieceX.add(start); COGX =start;   
    pieceY.add(1); COGY =1;        
    pieceX.add(start+1);   
    pieceY.add(1);    
    break;
  case 2 : start = (int)random(0,18);
    pieceX.add(start);    
    pieceY.add(0);   
    pieceX.add(start+1);    
    pieceY.add(0);   
    pieceX.add(start);    COGX =start; 
    pieceY.add(1);     COGY =1;
    pieceX.add(start+1);   
    pieceY.add(1);
    break;
  case 3 : start = (int)random(0,18);
    pieceX.add(start);    
    pieceY.add(0);    
    pieceX.add(start+1);    
    pieceY.add(0);       
    pieceX.add(start+1);   COGX =start+1;  
    pieceY.add(1);       COGY =1;
    pieceX.add(start+2);   
    pieceY.add(1);
    break;
  case 4 : start = (int)random(0,18);
    pieceX.add(start);    
    pieceY.add(0);   
    pieceX.add(start);    
    pieceY.add(1);    
    pieceX.add(start+1);   
    pieceY.add(1);      
    pieceX.add(start+2);   
    pieceY.add(1);
    break;
  case 5 : start = (int)random(0,17);
    pieceX.add(start);    
    pieceY.add(0);   
    pieceX.add(start+1);    
    pieceY.add(0);    
    pieceX.add(start+2);  COGX =start+2; 
    pieceY.add(0);      COGY =0;
    pieceX.add(start+3);   
    pieceY.add(0);
    break;
  
  }

}


boolean checkBelowPiece(){
for(int i=0;i<pieceX.size();i++){ 
if(!LayoutMark[pieceX.get(i)][Collections.max(pieceY)+1] || Collections.max(pieceY)==27 ){ 
return true; }} return false; }


boolean checkRightPiece(){
for(int i=0;i<pieceX.size();i++){
if(!LayoutMark[pieceX.get(i)+1][Collections.max(pieceY)] || Collections.max(pieceX)==20 ){return true;}
}
return false;
}
boolean checkLeftPiece(){
for(int i=0;i<pieceX.size();i++){
if(!LayoutMark[pieceX.get(i)-1][pieceY.get(i)]){return true;}
}
return false;
}

void rotatePiece(){
///  println(pieceX+" "+pieceY);
for(int i=0;i<pieceX.size();i++){
println(i+") "+pieceX.get(i)+","+COGX+"  |   "+pieceY.get(i)+","+COGY);
//if(pieceX.get(i)!=COGX && pieceY.get(i)!=COGY){
int x1=pieceX.get(i)-COGX;
int y1=pieceY.get(i)-COGY;
int x11 = (0*x1)+(-1*y1);
int y11 = (1*x1)+(0*y1);
x1 =x11+COGX;
y1 =y11+COGY;
println(")"+x1+","+y1+" | "+pieceX.get(i)+","+pieceY.get(i));
pieceX.set(i,x1);
pieceY.set(i,y1);
//println(pieceX+" "+pieceY);

}
S2=S;
}
