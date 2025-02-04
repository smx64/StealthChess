let PP_playerCount = 1;

function piecePlacement()
{    
    PP_playerTextDisplay();
}

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

    textFont(CS_fontAccent);
    text("IN PROGRESS", width/2, height/2);
}