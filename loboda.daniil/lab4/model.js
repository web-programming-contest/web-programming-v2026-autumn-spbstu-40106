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
    this.visitedCountries = this.visitedCountries.filter(
      (visitedCountry) => visitedCountry !== country,
    );
  }

  get visitedCount() {
    return this.visitedCountries.length;
  }
}

// Количество стран → массив объектов Travel.
export function groupTravelsByCountryCount(travels) {
  const groups = new Map();

  for (const travel of travels) {
    const count = travel.visitedCount;

    if (!groups.has(count)) {
      groups.set(count, []);
    }

    groups.get(count).push(travel);
  }

  return groups;
}

// Общий список стран без повторов.
export function getUniqueCountries(travels) {
  const countries = new Set();

  for (const travel of travels) {
    for (const country of travel.visitedCountries) {
      countries.add(country);
    }
  }

  return [...countries];
}

// Путешествия, включающие заданную страну.
export function findTravelsByCountry(travels, country) {
  return travels.filter((travel) => travel.visitedCountries.includes(country));
}

// Страна → массив объектов Travel.
export function groupTravelersByCountry(travels) {
  const groups = new Map();

  for (const travel of travels) {
    for (const country of travel.visitedCountries) {
      if (!groups.has(country)) {
        groups.set(country, []);
      }

      groups.get(country).push(travel);
    }
  }

  return groups;
}

// Путешественники, посетившие строго больше n стран.
export function findTravelsAboveCountryCount(travels, n) {
  return travels.filter((travel) => travel.visitedCount > n);
}
