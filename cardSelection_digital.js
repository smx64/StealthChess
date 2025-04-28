//initializing base game variables
let PS_totalPlayers = 2;
let PS_playerNames = [];
let PS_totalCards = 5;
let PS_cards_size;

//initializing card deck-related variables
let PS_deckCards = 9;
let PS_nameField, PS_init_card_xPos, PS_init_card_yPos;
let PS_deckLetters = ['P','R','N','B','Q','B','N','R','P'];

//initializing instructional overlay-related variables
let PS_instOverlayFlag = 0;
let PS_instImg_size = 0;
let PS_instImg_startPos = 0;
let PS_instructionsImage, PP_instructionsImage, GP_instructionsImage;

//initializing aesthetic variables - red hex value, fonts, card & background images, background score & sound effects
let PS_backgroundImage;
let PS_redShade = "#FF0000";
let PS_fontHeading, PS_fontBody, PS_fontAccent;
let PS_P1_cardImage_K, PS_P1_cardImage_Q, PS_P1_cardImage_B, PS_P1_cardImage_N, PS_P1_cardImage_R, PS_P1_cardImage_P;
let PS_P2_cardImage_K, PS_P2_cardImage_Q, PS_P2_cardImage_B, PS_P2_cardImage_N, PS_P2_cardImage_R, PS_P2_cardImage_P;
let PP_bgm, PP_SFX_pieceClicked, PP_SFX_pieceMoved, GP_SFX_pieceChecked, GP_bgm;

//initializing player count variable & arrays for storing players' card values
let PS_playerCount = 1;
let PS_cardCount = 1;
let PS_finalizeFlag = 0;
let PS_cardsArray = [];
let PS_P1_Cards = ['K'];
let PS_P2_Cards = ['K'];

//class declaration for the individual cards
class PS_Cards
{
    //constructor function for initializing all card-related variables
    constructor(_PS_card_xPos, _PS_card_yPos, _PS_card_id)
    {
        this.PS_card_xPos = _PS_card_xPos;
        this.PS_card_yPos = _PS_card_yPos;
        this.PS_card_id = _PS_card_id;
        this.PS_card_size = int(height/4.25);
        this.PS_card_separation = this.PS_card_size*1.25;

        //card-specific flags
        this.PS_card_hoverFlag = 0;
        this.PS_card_selectedFlag = 0;
        this.PS_card_pieceType = '';
    }
    //function to generate individual card on-screen & assign random piece type value
    PS_drawCard()
    {
        //generating card piece type value from deck letter array randomly
        let letterValue = random(PS_deckLetters);

        //setting card piece type value only for defined values
        if(letterValue != undefined)
        {
            this.PS_card_pieceType = letterValue;
        }

        //removing letters from deck letters array after setting card piece type value
        //ensures no value gets repeated when generated via the random function
        PS_deckLetters.splice(PS_deckLetters.indexOf(letterValue), 1);

        //logical condition for changing card color on mouse hover
        if(this.PS_card_hoverFlag == 0)
        {
            fill(255);
        }
        else if(this.PS_card_hoverFlag == 1)
        {
            fill(PS_redShade);
        }

        //logical condition for changing card stroke on mouse click
        if(this.PS_card_selectedFlag == 0)
        {
            noStroke();
        }
        else if(this.PS_card_selectedFlag == 1)
        {
            strokeWeight(7);
            stroke(255,255,0);
        }
        
        rectMode(CENTER);
        rect(this.PS_card_xPos, this.PS_card_yPos, this.PS_card_size, this.PS_card_size/0.64,10);
    }
    //function to determine when pointer is hovering over a card & toggle hoverflag value accordingly
    PS_hoverCard()
    {
        if(mouseX <= this.PS_card_xPos+this.PS_card_size/2 && mouseX >= this.PS_card_xPos-this.PS_card_size/2 && mouseY <= this.PS_card_yPos+this.PS_card_size/1.28 && mouseY >= this.PS_card_yPos-this.PS_card_size/1.27)
        {
            this.PS_card_hoverFlag = 1;
        }
        else
        {
            this.PS_card_hoverFlag = 0;
        }        
    }
}

function preload()
{
    //pre-loading background and game logos
    PS_backgroundImage = loadImage("./Assets/BG_Image.png");
    PS_gameLogo_BlackRed = loadImage("./Assets/Logo_StealthChess_Black.png");
    PS_gameLogo_BlackWhite = loadImage("./Assets/Logo_StealthChess_BnW.png");
    GP_gameLogo = loadImage("./Assets/Logo_StealthChess_White.png");
    
    //pre-loading typefaces
    PS_fontHeading = loadFont("./Assets/BlackOpsOne.ttf");
    PS_fontAccent = loadFont("./Assets/LexendTera.ttf");
    PS_fontBody = loadFont("./Assets/NATS.ttf");

    //pre-loading player 1 card images
    PS_P1_cardImage_K = loadImage("./Assets/Player1_King.png");
    PS_P1_cardImage_Q = loadImage("./Assets/Player1_Queen.png");
    PS_P1_cardImage_B = loadImage("./Assets/Player1_Bishop.png");
    PS_P1_cardImage_N = loadImage("./Assets/Player1_Knight.png");
    PS_P1_cardImage_R = loadImage("./Assets/Player1_Rook.png");
    PS_P1_cardImage_P = loadImage("./Assets/Player1_Pawn.png");

    //pre-loading player 2 card images
    PS_P2_cardImage_K = loadImage("./Assets/Player2_King.png");
    PS_P2_cardImage_Q = loadImage("./Assets/Player2_Queen.png");
    PS_P2_cardImage_B = loadImage("./Assets/Player2_Bishop.png");
    PS_P2_cardImage_N = loadImage("./Assets/Player2_Knight.png");
    PS_P2_cardImage_R = loadImage("./Assets/Player2_Rook.png");
    PS_P2_cardImage_P = loadImage("./Assets/Player2_Pawn.png");

    //pre-loading player 1 piece thumbnails - used in piecePlacement.js
    PP_P1_cardThumb_K = loadImage("./Assets/Player1_Thumbnail_King.png");
    PP_P1_cardThumb_Q = loadImage("./Assets/Player1_Thumbnail_Queen.png");
    PP_P1_cardThumb_B = loadImage("./Assets/Player1_Thumbnail_Bishop.png");
    PP_P1_cardThumb_N = loadImage("./Assets/Player1_Thumbnail_Knight.png");
    PP_P1_cardThumb_R = loadImage("./Assets/Player1_Thumbnail_Rook.png");
    PP_P1_cardThumb_P = loadImage("./Assets/Player1_Thumbnail_Pawn.png");

    //pre-loading player 2 piece thumbnails - used in piecePlacement.js
    PP_P2_cardThumb_K = loadImage("./Assets/Player2_Thumbnail_King.png");
    PP_P2_cardThumb_Q = loadImage("./Assets/Player2_Thumbnail_Queen.png");
    PP_P2_cardThumb_B = loadImage("./Assets/Player2_Thumbnail_Bishop.png");
    PP_P2_cardThumb_N = loadImage("./Assets/Player2_Thumbnail_Knight.png");
    PP_P2_cardThumb_R = loadImage("./Assets/Player2_Thumbnail_Rook.png");
    PP_P2_cardThumb_P = loadImage("./Assets/Player2_Thumbnail_Pawn.png");

    //pre-loading player 1 previous piece thumbnails - used in gamePlay.js
    GP_P1_prevThumb_K = loadImage("./Assets/Player1_PrevThumbnail_King.png");
    GP_P1_prevThumb_Q = loadImage("./Assets/Player1_PrevThumbnail_Queen.png");
    GP_P1_prevThumb_B = loadImage("./Assets/Player1_PrevThumbnail_Bishop.png");
    GP_P1_prevThumb_N = loadImage("./Assets/Player1_PrevThumbnail_Knight.png");
    GP_P1_prevThumb_R = loadImage("./Assets/Player1_PrevThumbnail_Rook.png");
    GP_P1_prevThumb_P = loadImage("./Assets/Player1_PrevThumbnail_Pawn.png");

    //pre-loading player 2 previous piece thumbnails - used in gamePlay.js
    GP_P2_prevThumb_K = loadImage("./Assets/Player2_PrevThumbnail_King.png");
    GP_P2_prevThumb_Q = loadImage("./Assets/Player2_PrevThumbnail_Queen.png");
    GP_P2_prevThumb_B = loadImage("./Assets/Player2_PrevThumbnail_Bishop.png");
    GP_P2_prevThumb_N = loadImage("./Assets/Player2_PrevThumbnail_Knight.png");
    GP_P2_prevThumb_R = loadImage("./Assets/Player2_PrevThumbnail_Rook.png");
    GP_P2_prevThumb_P = loadImage("./Assets/Player2_PrevThumbnail_Pawn.png");

    //pre-loading background score & sound effects - used in piecePlacement.js & gamePlay.js
    PP_bgm = loadSound("./Assets/Music_PiecePlacement.mp3");
    GP_bgm = loadSound("./Assets/Music_Gameplay.mp3");
    PP_SFX_pieceClicked = loadSound("./Assets/SFX_PieceClicked.mp3");
    PP_SFX_pieceMoved = loadSound("./Assets/SFX_PieceMoved.mp3");
    GP_SFX_pieceChecked = loadSound("./Assets/SFX_PieceChecked.mp3");

    //pre-loading instructional overlay images
    PS_instructionsImage = loadImage("./Assets/Instructions_PieceSelection_Digital.png");
    PP_instructionsImage = loadImage("./Assets/Instructions_PiecePlacement.png");
    GP_instructionsImage = loadImage("./Assets/Instructions_Gameplay.png");
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(PS_backgroundImage);

    //affects only piecePlacement.js - baseline for calculating card display size
    PS_cards_size = height/3;

    //creating name input field
    PS_nameField = createInput();
    PS_nameField.size(width/5, height/25);
    PS_nameField.position(width/2.5, height/2);
    PS_nameField.elt.focus();

    //initializing starting position of the cards on-screen based on screen resolution
    if(height <= 800)
    {
        PS_init_card_xPos = int(width/4.75);
    }
    else if(height > 800)
    {
        PS_init_card_xPos = int(width/5.85);
    }
    
    //generating individual cards for card selection segment -- runs in cardSelection.js file (this one)
    for(let i=0; i<PS_deckCards; i++)
    {
        //generating cards in top row
        if(i <= PS_deckCards/2)
        {
            PS_init_card_yPos = int(height/2.65);
        }
        //generating cards in bottom row
        else if(i > PS_deckCards/2)
        {
            //adjusting starting position of first card in bottom row
            if(i == (int(PS_deckCards/2)+1))
            {
                //screen resolution-based minor positional adjustments
                if(height <= 800)
                {
                    PS_init_card_xPos = int(width/3.6);
                }
                else if(height > 800)
                {
                    PS_init_card_xPos = int(width/4);
                }
            }
            PS_init_card_yPos = int(height/1.28);
        }

        let PS_Cards_object = new PS_Cards(PS_init_card_xPos, PS_init_card_yPos, i+1);
        PS_cardsArray.push(PS_Cards_object);
        PS_init_card_xPos += PS_cardsArray[i].PS_card_separation;
    }

    //generating chessboard for piece placement segment -- runs in piecePlacement.js file
    let PP_init_block_yPos = int(height/3.75);
    for(let PP_blockRow=0; PP_blockRow<PP_chessboardSize; PP_blockRow++)
    {
        let PP_init_block_xPos = int(width/9);
        PP_blocksArray.push([]);

        for(let PP_blockCol=0; PP_blockCol<PP_chessboardSize; PP_blockCol++)
        {
            let PP_Chessboard_object = new PP_Chessboard(PP_init_block_xPos, PP_init_block_yPos, PP_blockRow, PP_blockCol);
            PP_blocksArray[PP_blockRow].push(PP_Chessboard_object);
            PP_init_block_xPos += PP_blocksArray[PP_blockRow][PP_blockCol].PP_block_separation;
        }
        PP_init_block_yPos += PP_blocksArray[PP_blockRow][PP_blockRow].PP_block_separation;
    }

    //initializing class objects for player pieces - runs in piecePlacement.js file
    for(let i=0; i<PS_totalCards; i++)
    {
        let PP_P1_Pieces_object = new PP_P1_Pieces();
        let PP_P2_Pieces_object = new PP_P2_Pieces();
        PP_P1_piecesArray.push(PP_P1_Pieces_object);
        PP_P2_piecesArray.push(PP_P2_Pieces_object);
    }

    //generating the main chessboard for gameplay segment -- runs in gamePlay.js file
    let GP_init_block_yPos = int(height/4.3);
    for(let GP_blockRow=0; GP_blockRow<PP_chessboardSize; GP_blockRow++)
    {
        let GP_init_block_xPos;
        
        //determining chessboard start-point depending on window-height
        if(height <= 800)
        {
            GP_init_block_xPos = int(width/3.05);
        }
        else
        {
            GP_init_block_xPos = int(width/3.2);
        }
        GP_blocksArray.push([]);

        for(let GP_blockCol=0; GP_blockCol<PP_chessboardSize; GP_blockCol++)
        {
            let GP_Chessboard_object = new GP_Chessboard(GP_init_block_xPos, GP_init_block_yPos, GP_blockRow, GP_blockCol);
            GP_blocksArray[GP_blockRow].push(GP_Chessboard_object);
            GP_init_block_xPos += GP_blocksArray[GP_blockRow][GP_blockCol].GP_block_separation;
        }
        GP_init_block_yPos += GP_blocksArray[GP_blockRow][GP_blockRow].GP_block_separation;
    }

    //generating temporary chessboard for determining piece movements while king is checked -- runs in gamePlay.js file
    for(let GP_blockRow=0; GP_blockRow<PP_chessboardSize; GP_blockRow++)
    {
        GP_temp_blocksArray.push([]);
        for(let GP_blockCol=0; GP_blockCol<PP_chessboardSize; GP_blockCol++)
        {
            let GP_Chessboard_Temp_object = new GP_Chessboard_Temp(GP_blockRow, GP_blockCol);
            GP_temp_blocksArray[GP_blockRow].push(GP_Chessboard_Temp_object);
        }
    }
}

function draw()
{
    if(PS_playerCount <= PS_totalPlayers)
    {
        //function to display on-screen text
        PS_playerTextDisplay();
        
        //condition to check player name entry
        if(keyCode == ENTER && PS_nameField.value() != "")
        {
            //name value pushed to player name array on pressing enter key
            PS_playerNames.push(PS_nameField.value());
            PS_nameField.value("");
            PS_nameField.hide();

            //setting instructional overlay flag to middle value - hide instructional overlay
            PS_instOverlayFlag = 0.5;
        }

        //code to run depending on instructional overlay flag value
        if(PS_instOverlayFlag == 1)
        {
            //display instructional overlay and hide all other interface elements
            instructionContent(PS_instOverlayFlag);
        }
        else if(PS_instOverlayFlag == 0.5)
        {
            //displaying and running all game elements
            for(let i=0; i<PS_deckCards; i++)
            {
                //generating individual cards on-screen
                PS_cardsArray[i].PS_drawCard();
                PS_cardsArray[i].PS_hoverCard();

                //card selection logic on mouse press
                if(mouseButton == LEFT && mouseIsPressed == true && PS_cardsArray[i].PS_card_hoverFlag == 1 && PS_finalizeFlag == 0 )
                {
                    mouseIsPressed = false;

                    //toggling selection flag of individual card based on initial flag value
                    if(PS_cardsArray[i].PS_card_selectedFlag == 0 && PS_cardCount < PS_totalCards)
                    {
                        PS_cardsArray[i].PS_card_selectedFlag = 1;
                        PS_cardCount++;
                    }
                    else if(PS_cardsArray[i].PS_card_selectedFlag == 1)
                    {
                        PS_cardsArray[i].PS_card_selectedFlag = 0;
                        PS_cardCount--;
                    }
                }
 
                //displaying game logo on card backs depending on hover flag value
                imageMode(CENTER);
                let PS_gameLogo_size = width/11;

                if(PS_cardsArray[i].PS_card_hoverFlag == 0)
                {
                    image(PS_gameLogo_BlackRed, PS_cardsArray[i].PS_card_xPos, PS_cardsArray[i].PS_card_yPos, PS_gameLogo_size, PS_gameLogo_size/4);
                }
                else if(PS_cardsArray[i].PS_card_hoverFlag == 1)
                {
                    image(PS_gameLogo_BlackWhite, PS_cardsArray[i].PS_card_xPos, PS_cardsArray[i].PS_card_yPos, PS_gameLogo_size, PS_gameLogo_size/4);
                }

                //code to run once player has selected all of their cards
                if(PS_cardCount >= PS_totalCards)
                {
                    //displaying all deck cards & selected cards by player on keypress
                    if(keyCode == ENTER && keyIsPressed == true)
                    {
                        keyIsPressed = false;
                        PS_finalizeFlag++;

                        //finalizing selected cards on second keypress
                        if(PS_finalizeFlag == 2)
                        {
                            //running loop to pass selected cards onto player card array
                            for(let j=0; j<PS_deckCards; j++)
                            {
                                if(PS_cardsArray[j].PS_card_selectedFlag == 1)
                                {
                                    if(PS_playerCount == 1 && PS_P1_Cards.length < PS_totalCards)
                                    {
                                        PS_P1_Cards.push(PS_cardsArray[j].PS_card_pieceType);
                                    }
                                    else if(PS_playerCount == 2 && PS_P2_Cards.length < PS_totalCards)
                                    {
                                        PS_P2_Cards.push(PS_cardsArray[j].PS_card_pieceType);
                                    }
                                }
                            }

                            //incrementing player count and resetting all deck-related variables for next player
                            PS_playerCount++;
                            PS_cardCount = 1;
                            PS_finalizeFlag = 0;
                            PS_deckLetters = ['P','R','N','B','Q','B','N','R','P'];

                            //resetting card-specific variables for next player
                            for(let j=0; j<PS_deckCards; j++)
                            {
                                PS_cardsArray[j].PS_card_selectedFlag = 0;
                                PS_cardsArray[j].PS_card_pieceType = '';
                            }
                            
                            //re-enabling text input for player name entry
                            PS_nameField.show();
                            PS_nameField.elt.focus();
                        }
                    }
                }

                //displaying deck card images upon first keypress - after full selection and before finalizing by player
                if(PS_finalizeFlag == 1)
                {                    
                    image(PS_showCardImage(PS_cardsArray[i].PS_card_pieceType), PS_cardsArray[i].PS_card_xPos, PS_cardsArray[i].PS_card_yPos, PS_cardsArray[i].PS_card_size, PS_cardsArray[i].PS_card_size/0.64);
                }
            }
        }
    }
    //if all players done with their piece selections, move onto piece placement file
    else if(PS_playerCount > PS_totalPlayers)
    {
        PS_nameField.hide();
       
        //function to proceed to piece placement step
        piecePlacement();
    }
}

//function definition for displaying on-screen text
function PS_playerTextDisplay()
{
    //generating background image
    imageMode(CORNER);
    background(PS_backgroundImage);

    //generating on-screen text
    textAlign(CENTER,CENTER);
    textFont(PS_fontAccent);
    textSize(32);
    fill(PS_redShade);
    noStroke();
    text("PIECE SELECTION", width/2, height/12);

    textFont(PS_fontHeading);
    fill(255);
    
    //code to display text before player has entered name
    if(PS_playerNames[PS_playerCount-1] == undefined)
    {
        //resetting instructional overlay flag to base value to disable keypress toggling
        //instructional overlay will not work when player is typing their name
        PS_instOverlayFlag = 0;
        
        //text to generate during player name entry screen
        text("PLAYER "+PS_playerCount, width/2, height/7.5);
        textFont(PS_fontBody);
        textSize(30);
        text("Enter Player "+PS_playerCount+"'s Name", width/2, height/2.2);
        textSize(25);
        text("Press [ ENTER ] to continue once done", width/2, height-(height/7));
    }
    //code to display text after player has entered name
    else
    {
        text("PLAYER "+PS_playerCount+": "+PS_playerNames[PS_playerCount-1], width/2, height/7.5);

        //toggling instructional overlay only when player is not typing their name
        if(key == 'i' && keyIsPressed == true && PS_finalizeFlag == 0)
        {
            //prevents continuous keystrokes - registers keypress only once
            keyIsPressed = false;

            //toggling between mid & high flag state based on initial flag value
            if(PS_instOverlayFlag == 0.5)
            {
                PS_instOverlayFlag = 1;
            }
            else if(PS_instOverlayFlag == 1)
            {
                PS_instOverlayFlag = 0.5;
            }
        }

        //text to display on top depending on card selection status
        if(PS_finalizeFlag == 0)
        {
            rectMode(CORNER);
            fill(PS_redShade);
            rect(width/1.25, height/10, width, height/19);

            textAlign(RIGHT,CENTER);
            textFont(PS_fontBody);
            textSize(25);
            fill(255);
            text("Press [ i ] to view instructions", width/1.01, height/8.9);

            noStroke();
            textAlign(LEFT,CENTER);

            //displaying player card selected counter on-screen before finalization
            if((PS_cardCount-1) != (PS_totalCards-1))
            {
                text("CARDS SELECTED:", width/30, height/9.4);
                textFont(PS_fontHeading);
                text((PS_cardCount-1)+"/"+(PS_totalCards-1), width/6.5, height/8.7);
            }
            //displaying completion text on-screen before finalization
            else if((PS_cardCount-1) == (PS_totalCards-1))
            {
                text("Click a card to de-select and re-choose, OR", width/30, height/11);
                fill(PS_redShade);
                text("Press [ ENTER ] if you're done!", width/30, height/8.35);

                //generating top red bar
                rect(0, 0, width, height/75);
            }
        }
        //displaying final text on-screen for finalization
        else if(PS_finalizeFlag != 0)
        {
            textAlign(LEFT,CENTER);
            textFont(PS_fontBody);
            textSize(25);
            text("Press [ ENTER ] again to finalize your cards.", width/30, height/8.35);
            fill(PS_redShade);
            text("These are your cards for the round!", width/30, height/11);
            rectMode(CORNER);
            rect(0, 0, width, height/75);
        }
    }
}

//function to generate instructional overlay content based on whichever game module is active
function instructionContent(overlayFlagValue)
{
    imageMode(CORNER);
    background(PS_backgroundImage);

    //generating instructions heading
    textAlign(CENTER,CENTER);
    textFont(PS_fontAccent);
    textSize(32);
    fill(PS_redShade);
    noStroke();
    text("INSTRUCTIONS", width/2, height/12);

    //displaying side rectangle to close instructional overlay
    rectMode(CORNER);
    rect(width/1.17, height/10, width, height/19);
    textAlign(RIGHT,CENTER);
    textFont(PS_fontBody);
    textSize(25);
    fill(255);
    text("Press [ i ] to go back", width/1.01, height/8.9);

    textSize(18);
    textFont(PS_fontAccent);
    textAlign(CENTER,CENTER);

    //generating instructional text based on overlay flag value - depends on which game module it is called from
    switch(overlayFlagValue)
    {
        case 1:
            text("PIECE SELECTION", width/2, height/8);

            //setting values for image size and starting coordinate variables depending on screen-resolution
            if(height <= 800)
            {
                PS_instImg_size = width/1.5;
                PS_instImg_startPos = width/6;
            }
            else if(height > 800)
            {
                PS_instImg_size = width/1.3;
                PS_instImg_startPos = width/7.5;
            }

            //generating the instruction content image
            imageMode(CORNER);
            image(PS_instructionsImage, PS_instImg_startPos, height/5.25, PS_instImg_size, PS_instImg_size/1.84);
        break;
        case 2:
            text("PIECE PLACEMENT", width/2, height/8);

            //setting values for image size and starting coordinate variables depending on screen-resolution
            if(height <= 800)
            {
                PS_instImg_size = width/1.53;
                PS_instImg_startPos = width/6.5;
            }
            else if(height > 800)
            {
                PS_instImg_size = width/1.33;
                PS_instImg_startPos = width/9.5;
            }

            //generating the instruction content image
            imageMode(CORNER);
            image(PP_instructionsImage, PS_instImg_startPos, height/5.25, PS_instImg_size, PS_instImg_size/1.81);
        break;
        case 3:
            text("GAMEPLAY", width/2, height/8);

            //setting values for image size and starting coordinate variables depending on screen-resolution
            if(height <= 800)
            {
                PS_instImg_size = width/1.45;
                PS_instImg_startPos = width/6.75;
            }
            else if(height > 800)
            {
                PS_instImg_size = width/1.33;
                PS_instImg_startPos = width/9.5;
            }

            //generating the instruction content image
            imageMode(CORNER);
            image(GP_instructionsImage, PS_instImg_startPos, height/5.3, PS_instImg_size, PS_instImg_size/1.89);
        break;
    }
}

//function to return variable name of actual image card depending on letter value received from input field
function PS_showCardImage(letterValue)
{
    if(PS_playerCount == 1)
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
    else if(PS_playerCount == 2)
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