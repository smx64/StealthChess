//initializing all Piece Placement segment variables
let PP_playerCount = 1;
let PP_chessboardSize = 8;
let PP_pieceCounter = 1;
let PP_hoverShade = "#00FF00";

//initializing object arrays for chessboard & player piece placements
let PP_blocksArray = [];
let PP_P1_piecesArray = [];
let PP_P2_piecesArray = [];

//class declaration for the chessboard
class PP_Chessboard
{
    //constructor function for initializing all chessboard-related variables
    constructor(_PP_block_xPos, _PP_block_yPos, _PP_block_idRow, _PP_block_idCol)
    {
        this.PP_block_xPos = _PP_block_xPos;
        this.PP_block_yPos = _PP_block_yPos;
        this.PP_block_size = height/11;
        this.PP_block_separation = this.PP_block_size;
        this.PP_block_idRow = _PP_block_idRow;
        this.PP_block_idCol = _PP_block_idCol;
        this.PP_block_fillColor = color(255);
        
        this.PP_block_hoverFlag = 0;
        this.PP_block_occupiedFlag = 0;
        this.PP_block_selectedFlag = 0;
        this.PP_block_playerNumber = 0;
    }
    //function to generate individual blocks on-screen
    PP_drawBlock()
    {
        rectMode(CENTER);

        // conditional statements to alternate b/w white & red shades for the blocks
        // also to change fill color dynamically on mouse-hover
        if(this.PP_block_idRow%2 == 0)
        {
            if(this.PP_block_idCol%2 != 0 && this.PP_block_hoverFlag == 0)
            {
                this.PP_block_fillColor = PS_redShade;
            }
        }
        else
        {
            if(this.PP_block_idCol%2 == 0 && this.PP_block_hoverFlag == 0)
            {
                this.PP_block_fillColor = PS_redShade;
            }
        }

        //change block fill color to black once block becomes occupied
        if(this.PP_block_occupiedFlag == 1)
        {
            this.PP_block_fillColor = color(0);
        }

        fill(this.PP_block_fillColor);
        rect(this.PP_block_xPos, this.PP_block_yPos, this.PP_block_size);
    }
    //function to determine when mousepointer is hovering over a block & toggle hoverflag value accordingly
    PP_hoverBlock()
    {
        if(mouseX <= this.PP_block_xPos+this.PP_block_size/2 && mouseX >= this.PP_block_xPos-this.PP_block_size/2 && mouseY <= this.PP_block_yPos+this.PP_block_size/2 && mouseY >= this.PP_block_yPos-this.PP_block_size/2)
        {
            this.PP_block_hoverFlag = 1;
            this.PP_block_fillColor = PP_hoverShade;
            this.PP_block_strokeColor = color(0);
        }
        else
        {
            this.PP_block_hoverFlag = 0;
            this.PP_block_fillColor = color(255);
        }
    }    
}

//class declarations for player pieces
class PP_P1_Pieces
{
    constructor(_PP_pieceType)
    {
        this.PP_piecePlayerNumber = 1;
        this.PP_pieceType = _PP_pieceType;
        this.PP_piecePosition_idRow;
        this.PP_piecePosition_idCol;
    }
}

class PP_P2_Pieces
{
    constructor(_PP_pieceType)
    {
        this.PP_piecePlayerNumber = 2;
        this.PP_pieceType = _PP_pieceType;
        this.PP_piecePosition_idRow;
        this.PP_piecePosition_idCol;
    }
}

//main function where everything runs
function piecePlacement()
{
    PP_playerTextDisplay();

    //generating chessboard and running all functions
    for(let PP_blockRow=0; PP_blockRow<PP_chessboardSize; PP_blockRow++)
    {
        for(let PP_blockCol=0; PP_blockCol<PP_chessboardSize; PP_blockCol++)
        {
            //draw chessboard on-screen
            PP_blocksArray[PP_blockRow][PP_blockCol].PP_drawBlock();

            if(PP_playerCount <= PS_totalPlayers)
            {
                //calculate loop start/end depending on player number
                let hoverBlock_Start, hoverBlock_End;
                if(PP_playerCount == 1)
                {
                    hoverBlock_Start = 0;
                    hoverBlock_End = 3;
                }
                else
                {
                    hoverBlock_Start = PP_chessboardSize-3;
                    hoverBlock_End = PP_chessboardSize;
                }

                //code to run mouse-hover functions depending on player number
                for(let i=hoverBlock_Start; i<hoverBlock_End; i++)
                {
                    //running loop for total no.of pieces (5)
                    if(PP_pieceCounter <= PS_totalCards)
                    {
                        PP_blocksArray[PP_blockRow][i].PP_hoverBlock();

                        //code to run only when mouse-clicked and hovering on an empty block
                        if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag != 1)
                        {
                            //toggle occupiedFlag for specific block
                            PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag = 1;

                            //insert piece position into piece-array depending on player number && set player number for block
                            if(PP_playerCount == 1)
                            {
                                PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = 1;
                                PP_P1_piecesArray[PP_pieceCounter-1].PP_piecePosition_idRow = PP_blockRow;
                                PP_P1_piecesArray[PP_pieceCounter-1].PP_piecePosition_idCol = i;
                            }
                            else if(PP_playerCount == 2)
                            {
                                PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = 2;
                                PP_P2_piecesArray[PP_pieceCounter-1].PP_piecePosition_idRow = PP_blockRow;
                                PP_P2_piecesArray[PP_pieceCounter-1].PP_piecePosition_idCol = i;
                            }

                            //increment piece counter once a piece has been placed
                            mouseIsPressed = false;
                            keyIsPressed = false;
                            PP_pieceCounter++;
                        }
                    }
                }

                if(PP_pieceCounter > PS_totalCards)
                {
                    fill(255);
                    text("DONE.", width/2, height/2);
                    if(keyCode == ENTER && keyIsPressed == true)
                    {
                        background(PS_backgroundImage);
                        PP_playerCount++;
                        PP_pieceCounter = 1;
                    }
                }
            }
            else
            {
                //ENTER CODE WHEN ALL PLAYERS HAVE PLACED THEIR PIECES
            }
        }
    }
}

//function to display page heading text
function PP_playerTextDisplay()
{
    textAlign(CENTER,CENTER);
    textFont(PS_fontAccent);
    textSize(32);
    fill(PS_redShade);
    noStroke();
    text("PIECE PLACEMENT", width/2, height/12);

    textFont(PS_fontHeading);
    fill(255);
    text("PLAYER "+PP_playerCount+": "+PS_playerNames[PP_playerCount-1], width/2, height/7.5);

    //generating divider line in middle of screen
    rectMode(CORNER);
    rect(PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size, PP_blocksArray[0][0].PP_block_yPos-PP_blocksArray[0][0].PP_block_size/2, 2, PP_blocksArray[0][0].PP_block_size*PP_chessboardSize);
}