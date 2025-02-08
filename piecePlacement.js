//initializing all Piece Placement segment variables
let PP_playerCount = 1;
let PP_chessboardSize = 8;
let PP_blocksArray = [];

let PP_hoverShade = "#00FF00";

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
        this.PP_block_strokeColor = color(255);
        
        this.PP_block_hoverFlag = 0;
        this.PP_block_occupiedFlag = 0;
        this.PP_block_playerNumber = 0;
    }
    //function to generate individual blocks on-screen
    PP_drawBlock()
    {
        rectMode(CENTER);        
        stroke(this.PP_block_strokeColor);
        noStroke();

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
        }
        else
        {
            this.PP_block_hoverFlag = 0;
            this.PP_block_fillColor = color(255);
        }
    }    
}

//class declaration for player 1 pieces
class PP_P1_Pieces
{
    constructor(_PP_pieceType)
    {
        this.PP_pieceType = _PP_pieceType;
        this.PP_piecePosition = [];
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
            PP_blocksArray[PP_blockRow][PP_blockCol].PP_drawBlock();

            if(PP_playerCount == 1)
            {
                //running loop for player 1 - piece placement on left-most 3 columns
                for(let i=0; i<3; i++)
                {
                    PP_blocksArray[PP_blockRow][i].PP_hoverBlock();
                    if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag != 1)
                    {
                        PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag = 1;
                        mouseIsPressed = false;
                    }
                }
            }
            else if(PP_playerCount == 2)
            {
                //running loop for player 2 - piece placement on right-most 3 columns
                //COPY CODE HERE WHEN COMPLETE WITH PLAYER 1
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
}