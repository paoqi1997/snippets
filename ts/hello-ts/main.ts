import { Student } from './util';

const stu = new Student('paoqi');

stu.name = '';
stu.setGrade('medicine', 'A');

console.log(stu.getGrade('medicine'));
console.log(stu.getGrade('chemistry'));
