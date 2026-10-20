export class Travel {
  constructor(id, travelerName, visitedCountries = []) {
    this.id = id;
    this.travelerName = travelerName;
    this.visitedCountries = [...visitedCountries];
  }

  addCountry(country) {
    if (!this.visitedCountries.includes(country)) {
      this.visitedCountries.push(country);
    }
  }

  removeCountry(country) {
    this.visitedCountries = this.visitedCountries.filter((c) => c !== country);
  }

  get visitedCount() {
    return this.visitedCountries.length;
  }
}

export function groupTravelsByCountryCount(travels) {
  const result = {};
  for (const travel of travels) {
    const count = Array.isArray(travel.visitedCountries)
      ? travel.visitedCountries.length
      : 0;
    if (!result[count]) {
      result[count] = [];
    }
    result[count].push(travel);
  }
  return result;
}

export function getUniqueCountries(travels) {
  const set = new Set();
  for (const travel of travels) {
    if (Array.isArray(travel.visitedCountries)) {
      for (const country of travel.visitedCountries) {
        set.add(country);
      }
    }
  }
  return Array.from(set);
}

export function findTravelsByCountry(travels, country) {
  return travels.filter(
    (travel) =>
      Array.isArray(travel.visitedCountries) &&
      travel.visitedCountries.includes(country),
  );
}

export function groupTravelersByCountry(travels) {
  const result = {};
  for (const travel of travels) {
    if (Array.isArray(travel.visitedCountries)) {
      for (const country of travel.visitedCountries) {
        if (!result[country]) {
          result[country] = [];
        }
        result[country].push(travel.travelerName);
      }
    }
  }
  return result;
}

export function findTravelsAboveCountryCount(travels, n) {
  return travels.filter((travel) => {
    const count = Array.isArray(travel.visitedCountries)
      ? travel.visitedCountries.length
      : 0;
    return count > n;
  });
}
