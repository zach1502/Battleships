import React from "react";
import { Button, Typography } from '@mui/material';

const Help = (props) => {
    return (
        <>
            <p>
                <Typography variant="h2" component="div" gutterBottom>
                    Game Objective
                </Typography>

                <Typography variant="body1" component="div" gutterBottom>
                The object of Battleship is to try and sink all of the other player's before they sink all of your ships. 
                All of the other player's ships are somewhere on their board.  You try and hit them by selecting the coordinates 
                of one of the squares on the grid on the right-hand side. The other player also tries to hit your ships by 
                guessing coordinates.  Neither you nor the other player can see the other's board so you must try to guess where they are. 
                There are two grids:  the left grid for the player's ships and the right grid for recording the player's guesses.

                </Typography>
            </p>

            <br />
            
            <p>
                <Typography variant="h2" component="div" gutterBottom>
                    Starting a New Game
                </Typography>

                <Typography variant="body1" component="div" gutterBottom>
                Each player places the 5 ships somewhere on their board.  The ships can only be placed vertically or horizontally. 
                Diagonal placement is not allowed. No part of a ship may hang off the edge of the board.  Ships may not overlap each other.
                No ships may be placed on another ship. Once the guessing begins, the players may not move the ships. The 5 ships are:  
                Carrier (occupies 5 spaces), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).  
                </Typography>
            </p>

            <br />

            <p>
                <Typography variant="h2" component="div" gutterBottom>
                    Playing the Game
                </Typography>

                <Typography variant="body1" component="div" gutterBottom>
                    Player's take turns guessing by selecting coordinates. The game responds with "hit" or "miss" as appropriate.  Markers 
                    indicate the result of a shot:  red for hit, white for miss. When all of the squares that one your ships occupies have 
                    been hit, the ship will be sunk. As soon as all of one player's ships have been sunk, the game ends.
                </Typography>
            </p>
        
            <Button variant="contained" href="/game">back</Button>
        </>
    );
};

export default Help;