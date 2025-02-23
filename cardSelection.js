//initializing base variables
let PS_totalPlayers = 2;
let PS_playerNames = [];
let PS_totalCards = 5;

//initializing card placeholder position variables
let PS_cards_initxPos;
let PS_cards_separation;
let PS_cards_size;

//initializing aesthetic variables - red color, fonts, card & background images
let PS_backgroundImage;
let PS_redShade = "#FF0000";
let PS_fontHeading, PS_fontBody, PS_fontAccent;
let PS_P1_cardImage_K, PS_P1_cardImage_Q, PS_P1_cardImage_B, PS_P1_cardImage_N, PS_P1_cardImage_R, PS_P1_cardImage_P;
let PS_P2_cardImage_K, PS_P2_cardImage_Q, PS_P2_cardImage_B, PS_P2_cardImage_N, PS_P2_cardImage_R, PS_P2_cardImage_P;

//initializing input field variables
let PS_nameField, PS_cardLetterField;

//initializing card counter and empty arrays for storing players' card values
let PS_playerCount = 1;
let PS_cardCount = 1;
let PS_P1_Cards = ['K'];
let PS_P2_Cards = ['K'];

function preload()
{
    PS_backgroundImage = loadImage("./Assets/BG_Image.png");
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

    //pre-loading player 1 card thumbnails - used in piecePlacement.js
    PP_P1_cardThumb_K = loadImage("./Assets/Player1_Thumbnail_King.png");
    PP_P1_cardThumb_Q = loadImage("./Assets/Player1_Thumbnail_Queen.png");
    PP_P1_cardThumb_B = loadImage("./Assets/Player1_Thumbnail_Bishop.png");
    PP_P1_cardThumb_N = loadImage("./Assets/Player1_Thumbnail_Knight.png");
    PP_P1_cardThumb_R = loadImage("./Assets/Player1_Thumbnail_Rook.png");
    PP_P1_cardThumb_P = loadImage("./Assets/Player1_Thumbnail_Pawn.png");

    //pre-loading player 2 card thumbnails - used in piecePlacement.js
    PP_P2_cardThumb_K = loadImage("./Assets/Player2_Thumbnail_King.png");
    PP_P2_cardThumb_Q = loadImage("./Assets/Player2_Thumbnail_Queen.png");
    PP_P2_cardThumb_B = loadImage("./Assets/Player2_Thumbnail_Bishop.png");
    PP_P2_cardThumb_N = loadImage("./Assets/Player2_Thumbnail_Knight.png");
    PP_P2_cardThumb_R = loadImage("./Assets/Player2_Thumbnail_Rook.png");
    PP_P2_cardThumb_P = loadImage("./Assets/Player2_Thumbnail_Pawn.png");
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(PS_backgroundImage);

    //creating name input field
    PS_nameField = createInput();
    PS_nameField.size(300, 30);
    PS_nameField.position(width/2.5, height/2);

    //creating card letter input field
    PS_cardLetterField = createInput();
    PS_cardLetterField.hide();
    PS_cardLetterField.size(30, 30);
    PS_cardLetterField.position(width/1.9, height-(height/8.5));

    //setting card height to scale according to screen-height
    PS_cards_size = height/3;
    PS_cards_separation = width/4.75;

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

    //generating chessboard for gameplay segment -- runs in gamePlay.js file
    let GP_init_block_yPos = int(height/4.3);
    for(let GP_blockRow=0; GP_blockRow<PP_chessboardSize; GP_blockRow++)
    {
        let GP_init_block_xPos = int(width/3.05);
        GP_blocksArray.push([]);

        for(let GP_blockCol=0; GP_blockCol<PP_chessboardSize; GP_blockCol++)
        {
            let GP_Chessboard_object = new GP_Chessboard(GP_init_block_xPos, GP_init_block_yPos, GP_blockRow, GP_blockCol);
            GP_blocksArray[GP_blockRow].push(GP_Chessboard_object);
            GP_init_block_xPos += GP_blocksArray[GP_blockRow][GP_blockCol].GP_block_separation;
        }
        GP_init_block_yPos += GP_blocksArray[GP_blockRow][GP_blockRow].GP_block_separation;
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

            //generating card placeholder shapes
            background(PS_backgroundImage);
            rectMode(CENTER);
            fill(255);
            noStroke();

            PS_cards_initxPos = width/5.5;
            for(let i=1; i<PS_totalCards; i++)
            {
                rect(PS_cards_initxPos, height/1.8, PS_cards_size, PS_cards_size/0.64, 15);
                PS_cards_initxPos += PS_cards_separation;
            }

            //resetting cards' initial position for superimposing actual card images on card selection
            PS_cards_initxPos = width/5.5;
        }

        //condition to check card values entered in input field
        if(keyCode == ENTER && PS_cardCount < PS_totalCards && (PS_cardLetterField.value() == 'Q' || PS_cardLetterField.value() == 'B' || PS_cardLetterField.value() == 'N' || PS_cardLetterField.value() == 'R' || PS_cardLetterField.value() == 'P'))
        {
            if(PS_playerCount == 1)
            {
                //pushing letter values onto players' card value array, and resetting input field to blank
                PS_P1_Cards.push(PS_cardLetterField.value());
                PS_cardLetterField.value("");

                //generating actual card images for the values entered
                //function decides which image to generate depending on value passed from letter input field
                imageMode(CENTER);
                image(PS_showCardImage(PS_P1_Cards[PS_cardCount]), PS_cards_initxPos, height/1.8, PS_cards_size, PS_cards_size/0.64);
                PS_cards_initxPos += PS_cards_separation;
            }
            //same thing as above, but for player 2
            else if(PS_playerCount == 2)
            {
                PS_P2_Cards.push(PS_cardLetterField.value());
                PS_cardLetterField.value("");

                imageMode(CENTER);
                image(PS_showCardImage(PS_P2_Cards[PS_cardCount]), PS_cards_initxPos, height/1.8, PS_cards_size, PS_cards_size/0.64);
                PS_cards_initxPos += PS_cards_separation;
            }
            //counter to check total cards picked by each player
            PS_cardCount++;
        }
        //once all cards picked, increment player count variable and restart process for next player
        else if(PS_cardCount >= PS_totalCards && PS_playerCount <= PS_totalPlayers)
        {
            //hide the input field box after all cards picked
            PS_cardLetterField.hide();

            //continue to another by pressing spacebar
            if(keyCode == 32)
            {
                //reset card counter for next player & bring up input field for entering player name
                PS_playerCount++;
                PS_cardCount = 1;
                PS_nameField.show();

                //resetting image mode so that the background comes fullscreen
                imageMode(CORNER);
                background(PS_backgroundImage);
            }
        }
    }
    //if all players done with their card selections, move onto piece placement file
    else
    {
        PS_nameField.hide();

        //function to proceed to piece placement step
        piecePlacement();
    }
}

//function definition for displaying on-screen text
function PS_playerTextDisplay()
{
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
        text("PLAYER "+PS_playerCount, width/2, height/7.5);
        
        textFont(PS_fontBody);
        textSize(30);
        text("Enter Player "+PS_playerCount+"'s Name", width/2, height/2.2);
    }
    //code to display text after player has entered name
    else
    {
        //code to display text for the piece picking process
        if(PS_cardCount < PS_totalCards)
        {
            text("PLAYER "+PS_playerCount+": "+PS_playerNames[PS_playerCount-1], width/2, height/7.5);

            textFont(PS_fontBody);
            textSize(30);
            text("Pieces Picked From Deck", width/2, height/4.5);
            text("Piece Letter: ", width/2.1, height-(height/9));
            PS_cardLetterField.show();
        }
        //code to hide text after all pieces picked for a player
        else
        {
            rectMode(CORNER);
            fill(PS_redShade);
            noStroke();
            rect(0, height-(height/9), width, height);
            
            fill(255);
            textFont(PS_fontBody);
            textSize(25);
            text("Done! Press [SPACE] to continue.", width/2, height-(height/15));
        }
    }
}

// function to return variable name of actual image card depending on letter value received from input field
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