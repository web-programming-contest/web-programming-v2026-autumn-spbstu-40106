export class Student {
  constructor(id, name, grades = {}) {
    this.id = id;
    this.name = name;
    this.grades = {...grades};
  }

  addGrade(subject, grade) {
    this.grades[subject] = grade;
  }

  getAverageGrade() {
    const grades = Object.values(this.grades);

    if (grades.length === 0) {
      return 0;
    }

    const sum = grades.reduce((total, grade) => total + grade, 0);

    return sum / grades.length;
  }

  get summary() {
    return `Студент ${this.name} (id: ${this.id}) — средний балл: ${this.getAverageGrade().toFixed(2)}`;
  }
}

export function groupStudentsByAverageGrade(students) {
  const groups = {};

  for (const student of students) {
    const average = student.getAverageGrade();

    if (!groups[average]) {
      groups[average] = [];
    }

    groups[average].push(student);
  }

  return groups;
}

export function getUniqueSubjects(students) {
  const subjects = new Set();

  for (const student of students) {
    for (const subject of Object.keys(student.grades)) {
      subjects.add(subject);
    }
  }

  return [...subjects];
}

export function groupStudentsBySubject(students) {
  const groups = new Map();

  for (const student of students) {
    for (const subject of Object.keys(student.grades)) {
      if (!groups.has(subject)) {
        groups.set(subject, []);
      }

      groups.get(subject).push(student);
    }
  }

  return groups;
}

export function getTopStudents(students) {
  if (students.length === 0) {
    return [];
  }

  const maxAverage = Math.max(
    ...students.map((student) => student.getAverageGrade()),
  );

  return students.filter((student) => student.getAverageGrade() === maxAverage);
}

export function findStudentsBySubject(students, subject) {
  return students.filter((student) =>
    Object.prototype.hasOwnProperty.call(student.grades, subject),
  );
}
