class Person {
    private name_: string;

    constructor(name: string) {
        this.name_ = name;
    }

    get name(): string {
        return this.name_;
    }

    set name(newName: string) {
        if (newName.length === 0) {
            console.log('The new name can not be empty!');
        } else {
            this.name_ = newName;
        }
    }
}

export class Student extends Person {
    private grades: { [subject: string]: string };

    constructor(name: string) {
        super(name);
        this.grades = {};
    }

    getGrade(subject: string): string {
        if (subject in this.grades) {
            return this.grades[subject];
        } else {
            return '';
        }
    }

    setGrade(subject: string, grade: string) {
        this.grades[subject] = grade;
    }
}
