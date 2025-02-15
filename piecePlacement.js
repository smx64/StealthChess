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
            if(this.PP_block_selectedFlag == 1)
            {
                this.PP_block_fillColor = color(255,255,0);
            }
            else
            {
                this.PP_block_fillColor = color(0);
            }
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
                    PP_blocksArray[PP_blockRow][i].PP_hoverBlock();

                    //running loop for total no.of pieces (5)
                    if(PP_pieceCounter <= PS_totalCards)
                    {
                        // PP_blocksArray[PP_blockRow][i].PP_hoverBlock();

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
                            background(PS_backgroundImage);
                        }
                    }
                    else if(PP_pieceCounter > PS_totalCards)
                    {
                        if(keyCode == ENTER && keyIsPressed == true)
                        {
                            background(PS_backgroundImage);
                            PP_playerCount++;
                            PP_pieceCounter = 1;
                        }
                        else
                        {
                            if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag == 1)
                            {
                                if(PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 0)
                                {
                                    PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag = 1;
                                    mouseIsPressed = false;
                                    console.log("SELECTED: "+PP_blockRow+','+i);

                                    let init_blockRow = PP_blockRow;
                                    let init_blockCol = i;

                                    console.log("POSITION BEFORE: "+init_blockRow+','+init_blockCol);
                                }
                                else
                                {
                                    PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag = 0;
                                    mouseIsPressed = false;
                                }
                            }
                        }
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

    textAlign(LEFT,CENTER);
    textFont(PS_fontBody);
    if(PP_pieceCounter <= PS_totalCards)
    {
        //generating text relative to the chessboard's position
        text("Please place your pieces onto the grid", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, PP_blocksArray[0][0].PP_block_yPos-PP_blocksArray[0][0].PP_block_size/2);

        fill(PS_redShade);
        text("CURRENTLY PLACING:", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, PP_blocksArray[0][0].PP_block_yPos-5);

        //generating card images while placing the particular piece
        imageMode(CORNER);
        if(PP_playerCount == 1)
        {
            image(PP_showCardImage(PS_P1_Cards[PP_pieceCounter-1]), width/1.55, height/3.1, PS_cards_size*1.2, (PS_cards_size*1.2)/0.64);
        }
        else
        {
            image(PP_showCardImage(PS_P2_Cards[PP_pieceCounter-1]), width/1.55, height/3.1, PS_cards_size*1.2, (PS_cards_size*1.2)/0.64);
        }
    }
    else
    {
        //generating text when player has placed all pieces
        text("You've placed all your pieces!", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.95);
        text("Press [ENTER] to finalize & proceed.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.82);
    }
}

//function to generate card images depending on piece-type value found in the player piece arrays
function PP_showCardImage(letterValue)
{
    if(PP_playerCount == 1)
    {
        switch(letterValue)
        {
            case 'K': return PS_P1_cardImage_K;
            break;
            case 'Q': return PS_P1_cardImage_Q;
            break;
            case 'B': return PS_P1_cardImage_B;
            break;
            case 'N': return PS_P1_cardImage_N;
            break;
            case 'R': return PS_P1_cardImage_R;
            break;
            case 'P': return PS_P1_cardImage_P;
            break;
        }
    }
    else if(PP_playerCount == 2)
    {
        switch(letterValue)
        {
            case 'K': return PS_P2_cardImage_K;
            break;
            case 'Q': return PS_P2_cardImage_Q;
            break;
            case 'B': return PS_P2_cardImage_B;
            break;
            case 'N': return PS_P2_cardImage_N;
            break;
            case 'R': return PS_P2_cardImage_R;
            break;
            case 'P': return PS_P2_cardImage_P;
            break;
        }
    }
}