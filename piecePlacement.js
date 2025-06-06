//initializing all Piece Placement segment variables
let PP_playerCount = 1;
let PP_chessboardSize = 8;
let PP_pieceCounter = 1;
let PP_hoverShade = "#00FF00";
let PP_hoverActive = 1;

//initializing variables for piece movement after initial placement
let PP_blockActive = 0;
let PP_prev_blockRow, PP_prev_blockCol;
let PP_temp_pieceType = '';

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
        this.PP_block_size = int(height/11);
        this.PP_block_separation = this.PP_block_size;
        this.PP_block_idRow = _PP_block_idRow;
        this.PP_block_idCol = _PP_block_idCol;
        this.PP_block_fillColor;
        this.PP_block_visibility = 0;
        
        this.PP_block_hoverFlag = 0;
        this.PP_block_occupiedFlag = 0;
        this.PP_block_selectedFlag = 0;
        this.PP_block_playerNumber = 0;
        this.PP_block_pieceType = '';
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
        //starting background score for the piece placement segment
        PP_bgm.setVolume(0.25);
        PP_bgm.playMode('untilDone');
        PP_bgm.loop();

        PP_playerTextDisplay();
        
        if(PS_instOverlayFlag == 2)
        {
            //display instructional overlay and hide all other interface elements
            instructionContent(PS_instOverlayFlag);
        }
        else if(PS_instOverlayFlag != 2)
        {
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

                        //generating piece thumbnails for every block that is occupied
                        imageMode(CENTER);
                        if(PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag == 1)
                        {
                            for(let k=0; k<PS_totalCards; k++)
                            {
                                if(PP_playerCount == 1)
                                {
                                    //checking whether array piece type is equal to the block piece type
                                    if(PP_P1_piecesArray[k].PP_pieceType == PP_blocksArray[PP_blockRow][i].PP_block_pieceType)
                                    {
                                        //pass piece type letter to image display function and place image when block is occupied
                                        image(PP_showCardThumb(PP_P1_piecesArray[k].PP_pieceType), PP_blocksArray[PP_blockRow][i].PP_block_xPos, PP_blocksArray[PP_blockRow][i].PP_block_yPos, PP_blocksArray[PP_blockRow][i].PP_block_size, PP_blocksArray[PP_blockRow][i].PP_block_size);
                                    }
                                }
                                else if(PP_playerCount == 2)
                                {
                                    if(PP_P2_piecesArray[k].PP_pieceType == PP_blocksArray[PP_blockRow][i].PP_block_pieceType)
                                    {
                                        image(PP_showCardThumb(PP_P2_piecesArray[k].PP_pieceType), PP_blocksArray[PP_blockRow][i].PP_block_xPos, PP_blocksArray[PP_blockRow][i].PP_block_yPos, PP_blocksArray[PP_blockRow][i].PP_block_size, PP_blocksArray[PP_blockRow][i].PP_block_size);
                                    }
                                }
                            }
                            
                            //highlight image when it is selected during piece placement modification step
                            if(PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 1)
                            {
                                //generating highlighter box over image when a player selects a piece
                                fill(255,255,0,100);
                                rect(PP_blocksArray[PP_blockRow][i].PP_block_xPos, PP_blocksArray[PP_blockRow][i].PP_block_yPos, PP_blocksArray[PP_blockRow][i].PP_block_size)
                            }
                        }

                        imageMode(CORNER);
                        //running loop for total no.of pieces (5)
                        if(PP_pieceCounter <= PS_totalCards)
                        {
                            //code to run only when mouse-clicked and hovering on an empty block
                            if(mouseButton == LEFT && mouseIsPressed == true && PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag != 1)
                            {
                                //toggle occupiedFlag for specific block
                                PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag = 1;
                                PP_SFX_pieceClicked.play();

                                //insert piece position into piece-array based on player && set player number & piece type for block
                                if(PP_playerCount == 1)
                                {
                                    PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = 1;
                                    PP_blocksArray[PP_blockRow][i].PP_block_pieceType = PS_P1_Cards[PP_pieceCounter-1];

                                    PP_P1_piecesArray[PP_pieceCounter-1].PP_pieceType = PS_P1_Cards[PP_pieceCounter-1];
                                    PP_P1_piecesArray[PP_pieceCounter-1].PP_piecePosition_idRow = PP_blockRow;
                                    PP_P1_piecesArray[PP_pieceCounter-1].PP_piecePosition_idCol = i;
                                }
                                else if(PP_playerCount == 2)
                                {
                                    PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = 2;
                                    PP_blocksArray[PP_blockRow][i].PP_block_pieceType = PS_P2_Cards[PP_pieceCounter-1];

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
                                //resetting hover flag for every block when transitioning to next player
                                for(let i=0; i<PP_chessboardSize; i++)
                                {
                                    for(let j=0; j<PP_chessboardSize; j++)
                                    {
                                        PP_blocksArray[i][j].PP_block_hoverFlag = 0;
                                    }
                                }

                                PP_hoverActive = 1;
                                PP_playerCount++;
                                PP_pieceCounter = 1;
                            }
                            else
                            {
                                //generating piece thumbnail highlighter on mouse hover - depicting swap condition
                                if(PP_blocksArray[PP_blockRow][i].PP_block_hoverFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 0 && PP_hoverActive == 1)
                                {
                                    fill(0,255,0,50);
                                    rect(PP_blocksArray[PP_blockRow][i].PP_block_xPos, PP_blocksArray[PP_blockRow][i].PP_block_yPos, PP_blocksArray[PP_blockRow][i].PP_block_size);
                                }

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
                                        PP_SFX_pieceClicked.play();
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
                                            PP_SFX_pieceClicked.play();
                                            mouseIsPressed = false;
                                        }
                                        //swap pieces when another occupied block is clicked while having one selected
                                        else if(PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag == 1 && PP_blocksArray[PP_blockRow][i].PP_block_selectedFlag == 0)
                                        {
                                            //passing piece type value of selected block onto a temp variable
                                            PP_temp_pieceType = PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_pieceType;

                                            //replacing piece type of selected block with piece type value of other block
                                            PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_pieceType = PP_blocksArray[PP_blockRow][i].PP_block_pieceType;

                                            //updating piece type value of selected block in player piece array
                                            for(let j=0; j<PS_totalCards; j++)
                                            {
                                                if(PP_playerCount == 1)
                                                {
                                                    if(PP_P1_piecesArray[j].PP_piecePosition_idRow == PP_prev_blockRow && PP_P1_piecesArray[j].PP_piecePosition_idCol == PP_prev_blockCol)
                                                    {
                                                        PP_P1_piecesArray[j].PP_pieceType = PP_blocksArray[PP_blockRow][i].PP_block_pieceType;
                                                    }
                                                }
                                                else if(PP_playerCount == 2)
                                                {
                                                    if(PP_P2_piecesArray[j].PP_piecePosition_idRow == PP_prev_blockRow && PP_P2_piecesArray[j].PP_piecePosition_idCol == PP_prev_blockCol)
                                                        {
                                                            PP_P2_piecesArray[j].PP_pieceType = PP_blocksArray[PP_blockRow][i].PP_block_pieceType;
                                                        }
                                                }
                                            }

                                            //replacing piece type of other block with piece type value stored in temp variable
                                            PP_blocksArray[PP_blockRow][i].PP_block_pieceType = PP_temp_pieceType;

                                            //updating piece type value of other block in player piece array
                                            for(let j=0; j<PS_totalCards; j++)
                                            {
                                                if(PP_playerCount == 1)
                                                {
                                                    if(PP_P1_piecesArray[j].PP_piecePosition_idRow == PP_blockRow && PP_P1_piecesArray[j].PP_piecePosition_idCol == i)
                                                    {
                                                        PP_P1_piecesArray[j].PP_pieceType = PP_temp_pieceType;
                                                    }
                                                }
                                                else if(PP_playerCount == 2)
                                                {
                                                    if(PP_P2_piecesArray[j].PP_piecePosition_idRow == PP_blockRow && PP_P2_piecesArray[j].PP_piecePosition_idCol == i)
                                                    {
                                                        PP_P2_piecesArray[j].PP_pieceType = PP_temp_pieceType;
                                                    }
                                                }
                                            }

                                            //resetting selected flag to deselect all blocks
                                            PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_selectedFlag = 0;

                                            //toggling flag to reset the block selection process
                                            PP_blockActive = 0;
                                            PP_SFX_pieceClicked.play();
                                            mouseIsPressed = false;
                                        }
                                        //changing the position of a selected block
                                        else if(PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag != 1 && PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_selectedFlag == 1)
                                        {
                                            //toggling occupied flag and setting player number for the new block
                                            PP_blocksArray[PP_blockRow][i].PP_block_occupiedFlag = 1;
                                            PP_blocksArray[PP_blockRow][i].PP_block_playerNumber = PP_playerCount;
                                            PP_blocksArray[PP_blockRow][i].PP_block_pieceType = PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_pieceType;
                                            
                                            //resetting flags & player number for the previously selected block
                                            PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_occupiedFlag = 0;
                                            PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_selectedFlag = 0;
                                            PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_playerNumber = 0;
                                            PP_blocksArray[PP_prev_blockRow][PP_prev_blockCol].PP_block_pieceType = '';

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
                                            PP_SFX_pieceMoved.play();
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
    }
    //proceed to actual gameplay after piece placement has finished for both players
    else if(PP_playerCount > PS_totalPlayers)
    {
        PP_bgm.stop();
        gamePlay();
    }
}

//function to display page text and card images
function PP_playerTextDisplay()
{
    background(PS_backgroundImage);

    //toggling instructional overlay
    if(key == 'i' && keyIsPressed == true)
    {
        //prevents continuous keystrokes - registers keypress only once
        keyIsPressed = false;

        //toggling between low & high flag state based on initial flag value
        if(PS_instOverlayFlag != 2)
        {
            PS_instOverlayFlag = 2;
        }
        else if(PS_instOverlayFlag == 2)
        {
            PS_instOverlayFlag = 0;
        }
    }

    textAlign(LEFT,CENTER);
    textFont(PS_fontBody);
    fill(255);
    if(PP_pieceCounter <= PS_totalCards)
    {
        //generating text relative to the chessboard's position
        text("Please place your pieces on the chessboard", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, PP_blocksArray[0][0].PP_block_yPos-PP_blocksArray[0][0].PP_block_size/2);

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
        text("Re-position any piece by clicking on it, and then clicking on another cell.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.8);
        
        fill(PS_redShade);
        text("OR", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.72);
        
        fill(255);
        text("Press [ ENTER ] if you're ready to proceed.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.65);

        //code to display image of piece that has been selected for re-positioning
        if(PP_blockActive == 1)
        {
            background(PS_backgroundImage);

            textSize(32);
            fill(PS_redShade);
            text("CURRENTLY RE-POSITIONING:", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, PP_blocksArray[0][0].PP_block_yPos-PP_blocksArray[0][0].PP_block_size/2);

            //displaying image of piece that is currently selected for re-positioning
            for(let i=0; i<PS_totalCards; i++)
            {
                if(PP_playerCount == 1)
                {
                    if(PP_P1_piecesArray[i].PP_piecePosition_idRow == PP_prev_blockRow && PP_P1_piecesArray[i].PP_piecePosition_idCol == PP_prev_blockCol)
                    {
                        image(PP_showCardImage(PP_P1_piecesArray[i].PP_pieceType), width/1.55, height/3.4, PS_cards_size, PS_cards_size/0.64);
                    }
                }
                else
                {
                    if(PP_P2_piecesArray[i].PP_piecePosition_idRow == PP_prev_blockRow && PP_P2_piecesArray[i].PP_piecePosition_idCol == PP_prev_blockCol)
                    {
                        image(PP_showCardImage(PP_P2_piecesArray[i].PP_pieceType), width/1.55, height/3.4, PS_cards_size, PS_cards_size/0.64);
                    }
                }
            }

            textSize(22);
            fill(255);
            text("- Click on an empty cell to move the piece there.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.16);
            text("- Click on an occupied cell to swap piece positions.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.12);
            text("- To de-select, click on the same piece again.", PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size*1.45, height/1.083);
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

    rectMode(CORNER);
    fill(PS_redShade);
    rect(width/1.25, height/10, width, height/19);
    textAlign(RIGHT,CENTER);
    textFont(PS_fontBody);
    textSize(25);
    fill(255);
    text("Press [ i ] to view instructions", width/1.01, height/8.9);

    //generating divider line in middle of screen
    rect(PP_blocksArray[0][PP_chessboardSize-1].PP_block_xPos+PP_blocksArray[0][PP_chessboardSize-1].PP_block_size, PP_blocksArray[0][0].PP_block_yPos-PP_blocksArray[0][0].PP_block_size/2, 2, PP_blocksArray[0][0].PP_block_size*PP_chessboardSize);
}

//function to generate card images depending on piece-type value found on the block
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

//function to generate piece thumbnails depending on piece-type value found on the block
function PP_showCardThumb(letterValue)
{
    if(PP_playerCount == 1)
    {
        switch(letterValue)
        {
            case 'K': return PP_P1_cardThumb_K;
            break;
            case 'Q': return PP_P1_cardThumb_Q;
            break;
            case 'B': return PP_P1_cardThumb_B;
            break;
            case 'N': return PP_P1_cardThumb_N;
            break;
            case 'R': return PP_P1_cardThumb_R;
            break;
            case 'P': return PP_P1_cardThumb_P;
            break;
        }
    }
    else if(PP_playerCount == 2)
    {
        switch(letterValue)
        {
            case 'K': return PP_P2_cardThumb_K;
            break;
            case 'Q': return PP_P2_cardThumb_Q;
            break;
            case 'B': return PP_P2_cardThumb_B;
            break;
            case 'N': return PP_P2_cardThumb_N;
            break;
            case 'R': return PP_P2_cardThumb_R;
            break;
            case 'P': return PP_P2_cardThumb_P;
            break;
        }
    }
}