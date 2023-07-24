const listOfAllAchievements = [
    {
        "name": "test",
        "description": "This is a test achievement",
        "condition": (stats) => {
            return stats.test === undefined;
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
    }
];

export {
    listOfAllAchievements,
};