import * as util from './util';

function tests() {
  test_class();
  test_enum();
  test_function();
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

function test_enum() {
  console.log('TEST$_.enum');

  enum LOG_LEVEL {
    DEBUG = 1,
    INFO,
    WARN,
  };

  const level = LOG_LEVEL['INFO'];

  switch (<any> level as any) {
    case LOG_LEVEL.DEBUG:
      console.log('pass DEBUG');
    case LOG_LEVEL.INFO: {
      console.log('pass INFO');
    }
    case LOG_LEVEL.WARN:
      console.log('pass WARN');
      break;
    default:
      console.log('END');
  }

  if ([LOG_LEVEL.INFO, LOG_LEVEL.WARN].includes(level)) {
    console.log('YES!');
  }
}

function test_function() {
  console.log('TEST$_.function');

  let fn: any = (x: any, y: any) => {
    console.log(x, y);
  };

  fn(1, 2, 3);
}
