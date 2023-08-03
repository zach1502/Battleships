const listOfAllAchievements = [
  {
    "name": "Welcome!",
    "description": "Wow! Thanks for playing our game!",
    "condition": (stats) => {
      return true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "Lost In The Void",
    "description": "You 404'd!",
    "condition": (stats) => {
      return stats.lostInTheVoid;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": true,
  },
  {
    "name": "Who reads the damn credits?",
    "description": "Whoa! Someone actually reads these things? You've painstakingly scrolled through the entire credits page. Here's a digital high-five for appreciating the hard work that goes into making a game.",
    "condition": (stats) => {
      return stats.credits;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": true,
  },
  {
    "name": "First Blood",
    "description": "You got your first hit!",
    "condition": (stats) => {
      return stats.hits === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "First Victory",
    "description": "You got your first Win!",
    "condition": (stats) => {
      return stats.wins === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "We'll Get 'em Next Time",
    "description": "You lost your first game!",
    "condition": (stats) => {
      return stats.losses === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "Are you even Trying?",
    "description": "These ships are so big, how are you missing?\n (miss 10 times in a row)",
    "condition": (stats) => {
      return stats.areYouEvenTrying === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "Stormtrooper",
    "description": "You couldn't hit the broadside of a Star Destroyer.\n (miss 20 times in a row)",
    "condition": (stats) => {
      return stats.stormtrooper === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "Can't Stop, Won't Stop",
    "description": "You're on fire! Literally, their ships are on fire because of you.\n (hit 10 times in a row)",
    "condition": (stats) => {
      return stats.cantStopWontStop === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "Hawkeye",
    "description": "Did you borrow your accuracy from a certain Avenger?\n (hit all ships without missing once)",
    "condition": (stats) => {
      return stats.hawkeye === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
  },
  {
    "name": "Can't Touch This",
    "description": "Because your ships are too legit to hit.",
    "condition": (stats) => {
      return stats.cantTouchThis === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": true,
  },
  {
    "name": "Battleship? More like Battle-isn't!",
    "description": "You know you're supposed to hit the enemy's ships, right?",
    "condition": (stats) => {
      return stats.battleIsnt === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": true,
  },
  {
    "name": "I Thought This Was Chess?",
    "description": "Next you'll tell me the rooks aren't supposed to jump over other pieces...",
    "condition": (stats) => {
      return stats.iThoughtThisWasChess === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": true,
  },
  {
    "name": "Patience is a Virtue",
    "description": "You and your opponent are evenly matched. (win a game that lasted 140 turns)",
    "condition": (stats) => {
      return stats.longestGame === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "I'm just here for the boats",
    "description": "Beat the game on easy difficulty.",
    "condition": (stats) => {
      return stats.easyWins === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "It's all fun and games until someone loses a ship.",
    "description": "Beat the game on medium difficulty.",
    "condition": (stats) => {
      return stats.mediumWins === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "I didn't choose the ship life, the ship life chose me.",
    "description": "Beat the game on hard difficulty.",
    "condition": (stats) => {
      return stats.hardWins === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "I'm not in danger, I am the danger.",
    "description": "Beat the game on impossible difficulty. I let you cook.",
    "condition": (stats) => {
      return stats.impossibleWins === 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "Couch Potato to Admiral",
    "description": "Congrats! You've climbed the ladder from lounging in PJs to commanding the high seas. Who knew being a master strategist was this easy?",
    "condition": (stats) => {
      return stats.easyWins >= 1 && stats.mediumWins >= 1 && stats.hardWins >= 1 && stats.impossibleWins >= 1;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
  {
    "name": "Touching Tips",
    "description": "Curiosity pays off, and now you're part of an elite group of players in the know. Always remember to explore every nook and cranny, for hidden treasures might just be lurking around the corner!",
    "condition": (stats) => {
      return stats.tipEasterEggFound === true;
    },
    "image": "https://i.imgur.com/JsDd8CZ.png",
    "isHidden": false,
  },
];

export {
  listOfAllAchievements,
};