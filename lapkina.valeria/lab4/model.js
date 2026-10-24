export class Course {
  constructor(courseId, title, students = []) {
    this.courseId = courseId;
    this.title = title;
    this.students = students.map((student) => ({...student}));
  }

  addStudent(student) {
    const alreadyExists = this.students.some(
      (currentStudent) => currentStudent.id === student.id,
    );

    if (alreadyExists) {
      return false;
    }

    this.students.push({...student});
    return true;
  }

  removeStudent(studentId) {
    const previousCount = this.students.length;

    this.students = this.students.filter((student) => student.id !== studentId);

    return this.students.length < previousCount;
  }

  get studentCount() {
    return this.students.length;
  }
}

export function groupCoursesByStudentCount(courses) {
  const groups = new Map();

  for (const course of courses) {
    const count = course.students.length;

    if (!groups.has(count)) {
      groups.set(count, []);
    }

    groups.get(count).push(course);
  }

  return Object.fromEntries(groups);
}

export function getUniqueStudents(courses) {
  const studentsById = new Map();

  for (const course of courses) {
    for (const student of course.students) {
      if (!studentsById.has(student.id)) {
        studentsById.set(student.id, {...student});
      }
    }
  }

  return Array.from(studentsById.values());
}

export function findCoursesByStudent(courses, studentId) {
  return courses.filter((course) =>
    course.students.some((student) => student.id === studentId),
  );
}

export function groupStudentsByCourse(courses) {
  return Object.fromEntries(
    courses.map((course) => [
      course.courseId,
      course.students.map((student) => ({...student})),
    ]),
  );
}

export function findLargestCourses(courses) {
  if (courses.length === 0) {
    return [];
  }

  const maxCount = courses.reduce(
    (maximum, course) => Math.max(maximum, course.students.length),
    0,
  );

  return courses.filter((course) => course.students.length === maxCount);
}
