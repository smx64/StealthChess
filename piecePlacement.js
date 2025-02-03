let x=125;

function piecePlacement()
{
    background(0);
    fill(CS_redShade);
    noStroke();

    textAlign(CENTER,CENTER);
    textSize(30);
    textFont(CS_fontHeading);
    text(CS_playerNames[0], width/2, height/2);
    text(CS_playerNames[1], width/2, height/2+20);
    
    for(let i=0;i<CS_totalCards;i++)
    {
        text(CS_P1_Cards[i], width/2, height/2+50)
    }

    text(x,width/2,height/4);
}