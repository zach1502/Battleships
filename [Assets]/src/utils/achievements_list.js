const listOfAllAchievements = [
    {
        "name": "test",
        "description": "This is a test achievement",
        "condition": (stats) => {
            return stats.test === undefined;
        },
        "image": "https://i.imgur.com/JsDd8CZ.png",
    }
];

export {
    listOfAllAchievements,
};