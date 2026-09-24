export class Game {
  constructor(title, platforms = [], releaseYear) {
    this.title = title;
    this.platforms = platforms;
    this.releaseYear = releaseYear;
  }

  addPlatform(platform) {
    if (!this.platforms.includes(platform)) {
      this.platforms.push(platform);
    }
  }

  removePlatform(platform) {
    this.platforms = this.platforms.filter((item) => item !== platform);
  }

  get platformCount() {
    return this.platforms.length;
  }
}

export function groupGamesByReleaseYear(games) {
  return games.reduce((result, game) => {
    if (!result[game.releaseYear]) {
      result[game.releaseYear] = [];
    }

    result[game.releaseYear].push(game);
    return result;
  }, {});
}

export function getUniquePlatforms(games) {
  const platforms = new Set();

  games.forEach((game) => {
    game.platforms.forEach((platform) => {
      platforms.add(platform);
    });
  });

  return [...platforms];
}

export function findGamesByPlatform(games, platform) {
  return games.filter((game) => game.platforms.includes(platform));
}

export function groupGamesByPlatformCount(games) {
  const groups = new Map();

  games.forEach((game) => {
    const count = game.platformCount;

    if (!groups.has(count)) {
      groups.set(count, []);
    }

    groups.get(count).push(game);
  });

  return groups;
}

export function findGamesReleasedAfter(games, year) {
  return games.filter((game) => game.releaseYear > year);
}
