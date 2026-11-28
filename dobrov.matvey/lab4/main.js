import {Team} from './model.js';

const storageKey = 'dobrov.matvey.lab4.teams';
const teamForm = document.querySelector('[data-testid="entity-form"]');
const teamList = document.querySelector('[data-testid="entity-list"]');
const emptyList = document.querySelector('#empty-list');
const status = document.querySelector('#status');
const template = document.querySelector('#team-template');
const teams = loadTeams();

function loadTeams() {
  try {
    const savedTeams = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return savedTeams.map(({name, members}) => new Team(name, members));
  } catch {
    status.textContent = 'Не удалось загрузить сохранённые команды.';
    return [];
  }
}

async function update(button, change, message) {
  button.disabled = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 150));
    change();
    localStorage.setItem(storageKey, JSON.stringify(teams));
    status.textContent = message;
  } catch {
    status.textContent = 'Не удалось сохранить изменения в браузере.';
  } finally {
    button.disabled = false;
  }
}

function readField(form, name) {
  const input = form.elements.namedItem(name);
  const value = input.value.trim();

  if (!value) {
    input.value = '';
    input.reportValidity();
  }
  return value;
}

function createTeamCard(team) {
  const card = template.content.firstElementChild.cloneNode(true);
  const members = card.querySelector('.members');
  const count = card.querySelector('.team-count');
  const emptyMembers = card.querySelector('.empty-members');
  const memberForm = card.querySelector('.member-form');
  const addMember = memberForm.querySelector('button');
  const deleteTeam = card.querySelector('[data-testid="delete-entity"]');
  card.querySelector('.team-name').textContent = team.name;

  function renderMembers() {
    count.textContent = `Участников: ${team.memberCount}`;
    emptyMembers.hidden = team.memberCount > 0;
    members.replaceChildren(...team.members.map(createMemberRow));
  }

  function createMemberRow(member) {
    const row = document.createElement('li');
    const details = document.createElement('div');
    const name = document.createElement('strong');
    const role = document.createElement('span');
    const remove = document.createElement('button');

    name.textContent = member.name;
    role.textContent = member.role;
    details.append(name, role);
    remove.type = 'button';
    remove.className = 'danger';
    remove.textContent = 'Удалить участника';
    remove.setAttribute('aria-label', `Удалить участника: ${member.name}`);
    row.append(details, remove);

    remove.addEventListener('click', () => {
      void update(
        remove,
        () => {
          team.removeMember(member.name);
          renderMembers();
          memberForm.elements.namedItem('name').focus();
        },
        'Участник удалён.',
      );
    });

    return row;
  }

  memberForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (addMember.disabled) {
      return;
    }

    const name = readField(memberForm, 'name');
    if (!name) {
      return;
    }
    const role = readField(memberForm, 'role');
    if (!role) {
      return;
    }
    if (team.members.some((member) => member.name === name)) {
      status.textContent = 'Участник с таким именем уже есть в этой команде.';
      memberForm.elements.namedItem('name').focus();
      return;
    }

    void update(
      addMember,
      () => {
        team.addMember({name, role});
        memberForm.reset();
        renderMembers();
        memberForm.elements.namedItem('name').focus();
      },
      'Участник добавлен.',
    );
  });

  deleteTeam.addEventListener('click', () => {
    void update(
      deleteTeam,
      () => {
        teams.splice(teams.indexOf(team), 1);
        card.remove();
        emptyList.hidden = teams.length > 0;
        teamForm.elements.namedItem('name').focus();
      },
      'Команда удалена.',
    );
  });

  renderMembers();
  return card;
}

teamList.append(...teams.map(createTeamCard));
emptyList.hidden = teams.length > 0;

const addTeam = teamForm.querySelector('button');
teamForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (addTeam.disabled) {
    return;
  }

  const name = readField(teamForm, 'name');
  if (!name) {
    return;
  }

  void update(
    addTeam,
    () => {
      const team = new Team(name);
      teams.push(team);
      teamList.append(createTeamCard(team));
      emptyList.hidden = true;
      teamForm.reset();
      teamForm.elements.namedItem('name').focus();
    },
    'Команда добавлена.',
  );
});
