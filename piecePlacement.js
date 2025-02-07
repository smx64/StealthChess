let PP_playerCount = 1;
let PP_chessboardSize = 8;
let PP_blocksArray = [];

//class declaration for the chessboard
class PP_Chessboard
{
    constructor(_PP_block_xPos, _PP_block_yPos, _PP_block_idRow, _PP_block_idCol)
    {
        this.PP_block_xPos = _PP_block_xPos;
        this.PP_block_yPos = _PP_block_yPos;
        this.PP_block_size = height/11;
        this.PP_block_separation = this.PP_block_size;
        this.PP_block_idRow = _PP_block_idRow;
        this.PP_block_idCol = _PP_block_idCol;
        this.PP_block_fillColor = color(255);
        this.PP_block_strokeColor = color(0);
    }
    PP_drawBlock()
    {
        rectMode(CENTER);        
        stroke(this.PP_block_strokeColor);
        noStroke();

        if(this.PP_block_idRow%2==0)
        {
            if(this.PP_block_idCol%2!=0)
            {
                this.PP_block_fillColor = color(255,0,0);
            }
        }
        else
        {
            if(this.PP_block_idCol%2==0)
            {
                this.PP_block_fillColor = color(255,0,0);
            }
        }

        fill(this.PP_block_fillColor);
        rect(this.PP_block_xPos, this.PP_block_yPos, this.PP_block_size);
    }
}

//main function where everything runs
function piecePlacement()
{
    PP_playerTextDisplay();

    for(let PP_blockRow=0; PP_blockRow<PP_chessboardSize; PP_blockRow++)
    {
        for(let PP_blockCol=0; PP_blockCol<PP_chessboardSize; PP_blockCol++)
        {
            PP_blocksArray[PP_blockRow][PP_blockCol].PP_drawBlock();
        }
    }
}

//function to display page heading text
function PP_playerTextDisplay()
{
    textAlign(CENTER,CENTER);
    textFont(CS_fontAccent);
    textSize(32);
    fill(CS_redShade);
    noStroke();
    text("PIECE PLACEMENT", width/2, height/12);

    textFont(CS_fontHeading);
    fill(255);
    text("PLAYER "+PP_playerCount+": "+CS_playerNames[PP_playerCount-1], width/2, height/7.5);
}