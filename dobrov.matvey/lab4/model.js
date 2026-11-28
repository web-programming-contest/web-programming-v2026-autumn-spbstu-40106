export class Team {
  constructor(name, members = []) {
    this.name = name;
    this.members = [...members];
  }

  addMember(member) {
    this.members.push(member);
  }

  removeMember(name) {
    this.members = this.members.filter((member) => member.name !== name);
  }

  get memberCount() {
    return this.members.length;
  }
}

export function groupMembersByRole(teams) {
  return Map.groupBy(
    teams.flatMap((team) => team.members),
    (member) => member.role,
  );
}

export function getUniqueRoles(teams) {
  return [...groupMembersByRole(teams).keys()];
}

export function groupTeamsByMemberCount(teams) {
  return Map.groupBy(teams, (team) => team.members.length);
}

export function findTeamsByMember(teams, name) {
  return teams.filter((team) =>
    team.members.some((member) => member.name === name),
  );
}

export function getUniqueMembers(teams) {
  const membersByName = Map.groupBy(
    teams.flatMap((team) => team.members),
    (member) => member.name,
  );
  return Array.from(membersByName.values(), ([member]) => member);
}
