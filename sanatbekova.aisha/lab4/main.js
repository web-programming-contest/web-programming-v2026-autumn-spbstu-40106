import {Student} from './model.js';

const STORAGE_KEY = 'students';

const form = document.querySelector('[data-testid="entity-form"]');
const list = document.querySelector('[data-testid="entity-list"]');

let students = loadStudents();

function loadStudents() {
  const savedStudents = localStorage.getItem(STORAGE_KEY);

  if (!savedStudents) {
    return [];
  }

  const data = JSON.parse(savedStudents);

  return data.map(
    (student) => new Student(student.id, student.name, student.grades),
  );
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function renderStudents() {
  list.innerHTML = '';

  for (const student of students) {
    const card = document.createElement('article');
    card.dataset.testid = 'entity-card';

    const title = document.createElement('h2');
    title.textContent = student.name;

    const id = document.createElement('p');
    id.textContent = `ID: ${student.id}`;

    const average = document.createElement('p');
    average.textContent = `Средний балл: ${student.getAverageGrade()}`;

    const grades = document.createElement('ul');

    for (const [subject, grade] of Object.entries(student.grades)) {
      const item = document.createElement('li');

      const gradeText = document.createElement('span');
      gradeText.textContent = `${subject}: ${grade}`;

      const deleteGradeButton = document.createElement('button');
      deleteGradeButton.type = 'button';
      deleteGradeButton.textContent = 'Удалить оценку';

      deleteGradeButton.addEventListener('click', async () => {
        await deleteGrade(student, subject);
      });

      item.append(gradeText, deleteGradeButton);
      grades.append(item);
    }

    const gradeForm = document.createElement('form');

    const subjectInput = document.createElement('input');
    subjectInput.name = 'subject';
    subjectInput.placeholder = 'Предмет';
    subjectInput.required = true;

    const gradeInput = document.createElement('input');
    gradeInput.name = 'grade';
    gradeInput.type = 'number';
    gradeInput.placeholder = 'Оценка';
    gradeInput.required = true;

    const addGradeButton = document.createElement('button');
    addGradeButton.type = 'submit';
    addGradeButton.textContent = 'Добавить оценку';

    gradeForm.append(subjectInput, gradeInput, addGradeButton);

    gradeForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const subject = subjectInput.value.trim();
      const grade = Number(gradeInput.value);

      await addGrade(student, subject, grade);

      gradeForm.reset();
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.dataset.testid = 'delete-entity';
    deleteButton.textContent = 'Удалить студента';

    deleteButton.addEventListener('click', async () => {
      await deleteStudent(student.id);
    });

    card.append(title, id, average, grades, gradeForm, deleteButton);
    list.append(card);
  }
}

function addGrade(student, subject, grade) {
  return new Promise((resolve) => {
    setTimeout(() => {
      student.addGrade(subject, grade);
      saveStudents();
      renderStudents();
      resolve();
    }, 300);
  });
}

function deleteGrade(student, subject) {
  return new Promise((resolve) => {
    setTimeout(() => {
      delete student.grades[subject];
      saveStudents();
      renderStudents();
      resolve();
    }, 300);
  });
}

function addStudent(student) {
  return new Promise((resolve) => {
    setTimeout(() => {
      students.push(student);
      saveStudents();
      renderStudents();
      resolve();
    }, 300);
  });
}

function deleteStudent(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      students = students.filter((student) => student.id !== id);
      saveStudents();
      renderStudents();
      resolve();
    }, 300);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const id = Number(formData.get('id'));
  const name = formData.get('name').trim();

  const student = new Student(id, name);

  await addStudent(student);

  form.reset();
});

renderStudents();
