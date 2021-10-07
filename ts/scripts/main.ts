import * as util from './util';

let stu = new util.Student('paoqi');

stu.name = '';
stu.setGrade('math', 'A');

console.log(stu.getGrade('math'));
console.log(stu.getGrade('chemistry'));
