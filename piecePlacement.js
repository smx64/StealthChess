//initializing all Piece Placement segment variables
let PP_playerCount = 1;
let PP_chessboardSize = 8;
let PP_pieceCounter = 1;
let PP_hoverShade = "#00FF00";
let PP_hoverActive = 1;

//initializing variables for piece movement after initial placement
let PP_blockActive = 0;
let PP_prev_blockRow, PP_prev_blockCol;

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
        this.PP_block_fillColor;
        this.PP_block_visibility = 0;
        
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
        // block visibility variable checks which player side is presently active, and makes other blocks translucent
        if(this.PP_block_visibility == 1)
        {
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
        }
        //block fillcolor code to run when blocks are marked as "non-active"
        else if(this.PP_block_visibility == 0)
        {
            if(this.PP_block_hoverFlag == 0)
            {
                if(this.PP_block_idRow%2 == 0)
                {
                    if(this.PP_block_idCol%2 != 0)
                    {
                        this.PP_block_fillColor = color(255,0,0,50);
                    }
                    else
                    {
                        this.PP_block_fillColor = color(255,50);
                    }
                }                
                else
                {
                    if(this.PP_block_idCol%2 == 0)
                    {
                        this.PP_block_fillColor = color(255,0,0,50);
                    }
                    else
                    {
                        this.PP_block_fillColor = color(255,50);
                    }
                }  
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
                if(this.PP_block_visibility == 1)
                {
                    this.PP_block_fillColor = color(0);
                }
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
        }
        else
        {
            this.PP_block_hoverFlag = 0;
        }

        //function to disable/enable block color change on mouse-hover
        if(PP_hoverActive == 1)
        {
            if(this.PP_block_hoverFlag == 1)
            {
                this.PP_block_fillColor = PP_hoverShade;
            }
            else
            {
                this.PP_block_fillColor = color(255);
            }
        }
    }    
}

//class declarations for player pieces
class PP_P1_Pieces
{
    constructor()
    {
        this.PP_piecePlayerNumber = 1;
        this.PP_pieceType;
        this.PP_piecePosition_idRow;
        this.PP_piecePosition_idCol;
    }
}

class PP_P2_Pieces
{
    constructor()
    {
        this.PP_piecePlayerNumber = 2;
        this.PP_pieceType;
        this.PP_piecePosition_idRow;
        this.PP_piecePosition_idCol;
    }
}

//main function where everything runs
function piecePlacement()
{
    if(PP_playerCount <= PS_totalPlayers)
    {
        PP_playerTextDisplay();
        
        //generating chessboard and running all functions
        for(let PP_blockRow=0; PP_blockRow<PP_chessboardSize; PP_blockRow++)
        {
            for(let PP_blockCol=0; PP_blockCol<PP_chessboardSize; PP_blockCol++)
            {
                //draw chessboard on-screen and initializing all blocks as non-active in the beginning
                PP_blocksArray[PP_blockRow][PP_blockCol].PP_drawBlock();
                PP_blocksArray[PP_blockRow][PP_blockCol].PP_block_visibility = 0;
                
                //calculate mousehover loop start/end depending on player number
                let PP_hoverBlock_Start, PP_hoverBlock_End;
                if(PP_playerCount == 1)
                {
                    PP_hoverBlock_Start = 0;
                    PP_hoverBlock_End = 3;
                }
                else
                {
                    PP_hoverBlock_Start = PP_chessboardSize-3;
                    PP_hoverBlock_End = PP_chessboardSize;
                }

                //code to run mouse-hover functions depending on player number
                for(let i=PP_hoverBlock_Start; i<PP_hoverBlock_End; i++)
                {
                    PP_blocksArray[PP_blockRow][i].PP_hoverBlock();

                    //make only those blocks opaque where players can position their pieces
                    PP_blocksArray[PP_blockRow][i].PP_block_visibility = 1;

                    //running loop for total no.of pieces (5)
                    if(PP_pieceCounter <= PS_totalCards)
                    {
                        //code to run only when mouse-clicked and hovering on an empty block
                        if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag != 1)
                        {
                            //toggle occupiedFlag for specific block
                            PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag = 1;

                            //insert piece position into piece-array depending on player number && set player number for block
                            if(PP_playerCount == 1)
                            {
                                PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = 1;
                                PP_P1_piecesArray[PP_pieceCounter-1].PP_pieceType = PS_P1_Cards[PP_pieceCounter-1];
                                PP_P1_piecesArray[PP_pieceCounter-1].PP_piecePosition_idRow = PP_blockRow;
                                PP_P1_piecesArray[PP_pieceCounter-1].PP_piecePosition_idCol = i;
                            }
                            else if(PP_playerCount == 2)
                            {
                                PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = 2;
                                PP_P2_piecesArray[PP_pieceCounter-1].PP_pieceType = PS_P2_Cards[PP_pieceCounter-1];
                                PP_P2_piecesArray[PP_pieceCounter-1].PP_piecePosition_idRow = PP_blockRow;
                                PP_P2_piecesArray[PP_pieceCounter-1].PP_piecePosition_idCol = i;
                            }
                            
                            //increment piece counter once a piece has been placed & refresh screen graphics
                            mouseIsPressed = false;
                            keyIsPressed = false;
                            PP_pieceCounter++;
                        }
                    }
                    else if(PP_pieceCounter > PS_totalCards)
                    {
                        //finalize piece positions for player and increment counter on pressing enter
                        //reset piececounter variable for next player and re-activate block color change on mousehover
                        if(keyCode == ENTER && keyIsPressed == true && PP_blockActive != 1)
                        {
                            PP_hoverActive = 1;
                            PP_playerCount++;
                            PP_pieceCounter = 1;
                        }
                        else
                        {
                            //code to run when no block is selected
                            if(PP_blockActive == 0)
                            {
                                //disable block color change on mousehover
                                PP_hoverActive = 0;

                                //toggling selected flag value when clicking on an occupied block
                                if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 0)
                                {
                                    //store coordinates in variables so that this block can be reset if player moves piece
                                    PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag = 1;
                                    PP_prev_blockRow = PP_blockRow;
                                    PP_prev_blockCol = i;

                                    //toggle flag to mark that a block has been selected & re-activate block color change on mousehover
                                    PP_hoverActive = 1;
                                    PP_blockActive = 1;
                                    mouseIsPressed = false;
                                }
                            }
                            //code to run when a particular block is selected
                            else if(PP_blockActive == 1)
                            {
                                //mouse-click only works if a block is being hovered on
                                if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1)
                                {
                                    //de-selecting block if it is clicked again
                                    if(PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 1)
                                    {
                                        //toggling flag and reseting variable values
                                        PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag = 0;
                                        PP_prev_blockRow = '';
                                        PP_prev_blockCol = '';

                                        //toggling flag to reset the block selection process
                                        PP_blockActive = 0;
                                        mouseIsPressed = false;
                                    }
                                    //move selection to another occupied block when it is clicked
                                    else if(PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 0)
                                    {
                                        //move selection to current block, and de-select the previous block
                                        PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag = 1;
                                        PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_selectedFlag = 0;

                                        //store value of current block coordinates in variable for later manipulation
                                        PP_prev_blockRow = PP_blockRow;
                                        PP_prev_blockCol = i;
                                        PP_blockActive = 1;
                                        mouseIsPressed = false;
                                    }
                                    //changing the position of a selected block
                                    else if(PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag != 1 && PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_selectedFlag == 1)
                                    {
                                        //toggling occupied flag and setting player number for the new block
                                        PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag = 1;
                                        PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = PP_playerCount;
                                        
                                        //resetting flags & player number for the previously selected block
                                        PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_occupiedFlag = 0;
                                        PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_selectedFlag = 0;
                                        PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_playerNumber = 0;

                                        //checking piece array for the previous block's coordinates for updating values
                                        for(let j=0; j<PS_totalCards; j++)
                                        {
                                            if(PP_playerCount == 1)
                                            {
                                                //updating piece coordinates with new values for player 1
                                                if(PP_P1_piecesArray[j].PP_piecePosition_idRow == PP_prev_blockRow && PP_P1_piecesArray[j].PP_piecePosition_idCol == PP_prev_blockCol)
                                                {
                                                    PP_P1_piecesArray[j].PP_piecePosition_idRow = PP_blockRow;
                                                    PP_P1_piecesArray[j].PP_piecePosition_idCol = i;
                                                    break;
                                                }
                                            }
                                            else if(PP_playerCount == 2)
                                            {
                                                //updating piece coordinates with new values for player 2
                                                if(PP_P2_piecesArray[j].PP_piecePosition_idRow == PP_prev_blockRow && PP_P2_piecesArray[j].PP_piecePosition_idCol == PP_prev_blockCol)
                                                {
                                                    PP_P2_piecesArray[j].PP_piecePosition_idRow = PP_blockRow;
                                                    PP_P2_piecesArray[j].PP_piecePosition_idCol = i;
                                                    break;
                                                }
                                            }
                                        }
                                        
                                        //resetting flag to restart process for a new block
                                        PP_blockActive = 0;
                                        mouseIsPressed = false;
                                    }
                                }
                            }
                        }
                    }
                }            
            }
        }
    }
    //code to run after piece placement has finished for both players
    else if(PP_playerCount > PS_totalPlayers)
    {
        background(PS_backgroundImage);
        console.log(PP_P1_piecesArray);
        console.log(PP_P2_piecesArray);
        noLoop();
    }
}

//function to display page text and card images
function PP_playerTextDisplay()
{
    background(PS_backgroundImage);
    textAlign(LEFT,CENTER);
    textFont(PS_fontBody);
    fill(255);
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
            image(PP_showCardImage(PS_P1_Cards[PP_pieceCounter-1]), width/1.55, height/3.15, PS_cards_size*1.2, (PS_cards_size*1.2)/0.64);
        }
        else
        {
            image(PP_showCardImage(PS_P2_Cards[PP_pieceCounter-1]), width/1.55, height/3.15, PS_cards_size*1.2, (PS_cards_size*1.2)/0.64);
        }
    }
    else
    {
        //generating instructional text when player has placed all pieces
        fill(PS_redShade);
        text("You've placed all your pieces!", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/2);
        
        fill(255);
        textSize(22);
        text("Modify a piece's position by clicking on it, and then clicking on an empty cell.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.8);
        
        fill(PS_redShade);
        text("OR", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.72);
        
        fill(255);
        text("Press [ ENTER ] if you're ready to proceed.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.65);

        //code to display image of piece that has been selected for modifying position
        if(PP_blockActive == 1)
        {
            background(PS_backgroundImage);

            textSize(32);
            fill(PS_redShade);
            text("CURRENTLY MODIFYING:", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, PP_blocksArray[0][0].PP_block_yPos-PP_blocksArray[0][0].PP_block_size/2);

            //displaying image of piece that is currently selected for position modification
            for(let i=0; i<PS_totalCards; i++)
            {
                if(PP_playerCount == 1)
                {
                    if(PP_P1_piecesArray[i].PP_piecePosition_idRow == PP_prev_blockRow && PP_P1_piecesArray[i].PP_piecePosition_idCol == PP_prev_blockCol)
                    {
                        image(PP_showCardImage(PP_P1_piecesArray[i].PP_pieceType), width/1.55, height/3.55, PS_cards_size, PS_cards_size/0.64);
                    }
                }
                else
                {
                    if(PP_P2_piecesArray[i].PP_piecePosition_idRow == PP_prev_blockRow && PP_P2_piecesArray[i].PP_piecePosition_idCol == PP_prev_blockCol)
                    {
                        image(PP_showCardImage(PP_P2_piecesArray[i].PP_pieceType), width/1.55, height/3.55, PS_cards_size, PS_cards_size/0.64);
                    }
                }
            }

            textSize(22);
            fill(255);
            text("- Click on an empty cell to move the piece there.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.2);
            text("- To deselect, click on the same piece again.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.16);
            text("- Press [ ENTER ] ONLY when you've finalized, and are ready to proceed.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.12);
        }
    }

    //rendering page heading - it is here because this needs to be the top-most layer, and not get affected by above code
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