import {Course} from './model.js';

const STORAGE_KEY = 'lapkina.valeria.lab4.courses';
const OPERATION_DELAY = 300;

const courseForm = document.querySelector('form[data-testid="entity-form"]');
const courseList = document.querySelector('[data-testid="entity-list"]');
const emptyMessage = document.querySelector('.empty-message');
const statusMessage = document.querySelector('.status');

let courses = [];
let isBusy = false;

// Показываем сообщение об операции или ошибке.
function showStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle('status-error', isError);
}

// Проверяем ID, введённый пользователем.
function readId(value) {
  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('ID должен быть положительным целым числом.');
  }

  return id;
}

// Убираем пробелы по краям и не допускаем пустые названия.
function readText(value, fieldName) {
  const text = String(value).trim();

  if (text.length === 0) {
    throw new Error(`Заполни поле «${fieldName}».`);
  }

  return text;
}

// JSON содержит обычные объекты.
// Восстанавливаем экземпляры Course с методами и getter.
function restoreCourses(data) {
  if (!Array.isArray(data)) {
    throw new Error('В хранилище ожидался массив курсов.');
  }

  const courseIds = new Set();

  return data.map((item) => {
    if (item === null || typeof item !== 'object') {
      throw new Error('Некорректные данные курса.');
    }

    const courseId = readId(item.courseId);
    const title = readText(item.title ?? '', 'Название курса');

    if (courseIds.has(courseId)) {
      throw new Error('В хранилище повторяется ID курса.');
    }

    courseIds.add(courseId);

    if (!Array.isArray(item.students)) {
      throw new Error('Некорректный список студентов.');
    }

    const studentIds = new Set();

    const students = item.students.map((student) => {
      if (student === null || typeof student !== 'object') {
        throw new Error('Некорректные данные студента.');
      }

      const id = readId(student.id);
      const name = readText(student.name ?? '', 'Имя студента');

      if (studentIds.has(id)) {
        throw new Error('В курсе повторяется ID студента.');
      }

      studentIds.add(id);

      return {id, name};
    });

    return new Course(courseId, title, students);
  });
}

// Загружаем сохранённое состояние при открытии страницы.
function loadCourses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved !== null) {
      courses = restoreCourses(JSON.parse(saved));
    }
  } catch {
    showStatus(
      'Не удалось восстановить данные. Проверь хранилище браузера.',
      true,
    );
  }
}

// localStorage хранит строки, поэтому сериализуем массив в JSON.
function saveCourses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

// На время операции блокируем кнопки.
// Это предотвращает повторные нажатия до завершения изменения.
function setBusy(value) {
  isBusy = value;
  courseForm.setAttribute('aria-busy', String(value));
  courseList.setAttribute('aria-busy', String(value));

  document.querySelectorAll('button').forEach((button) => {
    button.disabled = value;
  });
}

// Общая асинхронная операция.
// Изменение данных произойдёт внутри callback таймера.
function performAsyncChange(change) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Копия состояния позволяет откатить изменение,
      // если сохранение в localStorage завершится ошибкой.
      const previousCourses = courses.map(
        (course) => new Course(course.courseId, course.title, course.students),
      );

      try {
        change();
        saveCourses();
        renderCourses();
        resolve();
      } catch (error) {
        courses = previousCourses;
        renderCourses();
        reject(error);
      }
    }, OPERATION_DELAY);
  });
}

// Обрабатываем результат Promise и всегда разблокируем кнопки.
async function runOperation(change, successMessage, onSuccess) {
  if (isBusy) {
    return;
  }

  setBusy(true);
  showStatus('Выполняется операция…');

  try {
    await performAsyncChange(change);

    if (onSuccess) {
      onSuccess();
    }

    showStatus(successMessage);
  } catch (error) {
    showStatus(
      error instanceof Error ? error.message : 'Не удалось выполнить операцию.',
      true,
    );
  } finally {
    setBusy(false);
  }
}

// Создаём DOM-элемент.
// Пользовательские данные вставляем через textContent,
// поэтому они отображаются как текст, а не исполняются как HTML.
function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createButton(text, className = '') {
  const button = createElement('button', className, text);
  button.type = 'button';
  button.disabled = isBusy;
  return button;
}

// Создаём поле с видимой подписью.
// Вложенность input в label связывает подпись с полем.
function createField(labelText, name, type) {
  const label = createElement('label', '', labelText);
  const input = document.createElement('input');

  input.name = name;
  input.type = type;
  input.required = true;

  if (type === 'number') {
    input.min = '1';
    input.step = '1';
  }

  label.append(input);
  return label;
}

// Строка студента с собственной кнопкой удаления.
function createStudentRow(course, student) {
  const row = createElement('li', 'student-row');

  const name = createElement(
    'span',
    'student-name',
    `${student.name} · ID: ${student.id}`,
  );

  const deleteButton = createButton('Удалить студента', 'delete-button');

  deleteButton.addEventListener('click', () => {
    void runOperation(() => {
      if (!course.removeStudent(student.id)) {
        throw new Error('Студент уже отсутствует в курсе.');
      }
    }, 'Студент удалён.');
  });

  row.append(name, deleteButton);
  return row;
}

// У каждого курса своя форма добавления студента.
function createStudentForm(course) {
  const form = createElement('form', 'student-form');
  form.setAttribute(
    'aria-label',
    `Добавить студента на курс «${course.title}»`,
  );

  const idField = createField('ID студента', 'studentId', 'number');
  const nameField = createField('Имя студента', 'studentName', 'text');

  const submitButton = createButton('Добавить студента');
  submitButton.type = 'submit';

  form.append(idField, nameField, submitButton);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    void runOperation(() => {
      const student = {
        id: readId(formData.get('studentId')),
        name: readText(formData.get('studentName'), 'Имя студента'),
      };

      if (!course.addStudent(student)) {
        throw new Error('Студент с таким ID уже есть в этом курсе.');
      }
    }, 'Студент добавлен.');
  });

  return form;
}

// Создаём карточку курса и наполняем её элементами.
function createCourseCard(course) {
  const card = createElement('article', 'course-card');
  card.dataset.testid = 'entity-card';

  const header = createElement('div', 'course-header');
  const title = createElement('h3', 'course-title', course.title);

  const deleteButton = createButton('Удалить курс', 'delete-button');
  deleteButton.dataset.testid = 'delete-entity';

  deleteButton.addEventListener('click', () => {
    void runOperation(() => {
      courses = courses.filter(
        (currentCourse) => currentCourse.courseId !== course.courseId,
      );
    }, 'Курс удалён.');
  });

  header.append(title, deleteButton);

  const info = createElement(
    'p',
    'course-meta',
    `ID курса: ${course.courseId} · Студентов: ${course.studentCount}`,
  );

  const studentList = createElement('ul', 'student-list');

  for (const student of course.students) {
    studentList.append(createStudentRow(course, student));
  }

  card.append(header, info);

  if (course.studentCount === 0) {
    card.append(createElement('p', 'empty-message', 'Студентов пока нет.'));
  }

  card.append(studentList, createStudentForm(course));
  return card;
}

// Перестраиваем список по текущему состоянию массива courses.
// Страница целиком при этом не перезагружается.
function renderCourses() {
  courseList.replaceChildren();
  emptyMessage.hidden = courses.length > 0;

  for (const course of courses) {
    courseList.append(createCourseCard(course));
  }
}

// Обрабатываем основную форму создания курса.
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(courseForm);

  void runOperation(
    () => {
      const courseId = readId(formData.get('courseId'));
      const title = readText(formData.get('title'), 'Название курса');

      const alreadyExists = courses.some(
        (course) => course.courseId === courseId,
      );

      if (alreadyExists) {
        throw new Error('Курс с таким ID уже существует.');
      }

      courses.push(new Course(courseId, title));
    },
    'Курс добавлен.',
    () => courseForm.reset(),
  );
});

// Первоначальная загрузка.
loadCourses();
renderCourses();
