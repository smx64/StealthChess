let GP_blocksArray = [];

class GP_Chessboard
{
    constructor(_GP_block_xPos, _GP_block_yPos, _GP_block_idRow, _GP_block_idCol)
    {
        this.GP_block_xPos = _GP_block_xPos;
        this.GP_block_yPos = _GP_block_yPos;
        this.GP_block_size = height/11;
        this.GP_block_separation = this.GP_block_size;
        this.GP_block_idRow = _GP_block_idRow;
        this.GP_block_idCol = _GP_block_idCol;
        this.GP_block_fillColor = color(255);
    }
    GP_drawBlock()
    {
        rectMode(CENTER);
        fill(this.GP_block_fillColor);
        stroke(0);
        strokeWeight(3);
        rect(this.GP_block_xPos, this.GP_block_yPos, this.GP_block_size);
    }
}

function gamePlay()
{
    GP_playerTextDisplay();

    for(let GP_blockRow=0; GP_blockRow<PP_chessboardSize; GP_blockRow++)
    {
        for(let GP_blockCol=0; GP_blockCol<PP_chessboardSize; GP_blockCol++)
        {
            GP_blocksArray[GP_blockRow][GP_blockCol].GP_drawBlock();
        }
    }
}

function GP_playerTextDisplay()
{
    background(PS_backgroundImage);
    GP_logoWidth = width/6;
    imageMode(CENTER);
    image(GP_gameLogo, width/2, height/12, GP_logoWidth, GP_logoWidth/4);
}