import * as util from './util';

function tests() {
  test_class();
}

tests();

function test_class() {
  console.log('TEST$_.class');

  const stu = new util.Student('paoqi');

  stu.name = '';
  stu.setGrade('medicine', 'A');

  console.log(stu.getGrade('medicine'));
  console.log(stu.getGrade('chemistry'));
}
