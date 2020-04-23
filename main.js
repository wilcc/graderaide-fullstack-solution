const Grade = (assignment, score) => {
    return {
    assignment,
    score,
    }
}

const Term = () => {
    return {
    grades: [],

    addGrade: function(assignment, score) {
        const grade = Grade(assignment, score);
        this.grades.push(grade);
    },
    }
}

const Course = (name) => {
    return {
    name,
    terms: [Term()],

    addTerm: function() {
        const term = Term();
        this.terms.push(term);
    }
    }
}

const Student = (name, course, term = 1,grade='none') => {
    return {
    name,
    course,
    term,
    grade,
    courses: [Course(course)],

    addCourse: function(course) {
        this.courses.push(Course(course));
        this.course = course;
    },

    getAverage: function(courseToFind = this.course, termIndex = this.term - 1) {
        let foundCourse;
        for (const course of this.courses) {
        if (course.name === courseToFind) {
            foundCourse = course;
        }
        }

        const grades = foundCourse.terms[termIndex].grades;
        if (grades.length === 0) {
        return 'No grades yet.'
        }

        let sum = 0;
        for (const grade of grades) {
        sum += grade.score;

        }

        return sum / grades.length;
    },
    }
}

const studentDisplay = document.querySelector('.student-display')


const stus = [
    
]

const addStu = function(stuInfo){
    stus.push(stuInfo)
}

const printStudent = function (Student){
    const studentInfo = document.createElement('ul');
    const nameItem = document.createElement('li');
    const courseItem = document.createElement('li');
    const termItem = document.createElement('li');
    const gradeItem = document.createElement('li');
    // const button = document.createElement('BUTTON')
    nameItem.innerText = `Name: ${Student.name}`;
    courseItem.innerText = `Course: ${Student.course}`;
    termItem.innerText = `Term: ${Student.term}`;
    gradeItem.innerText = `Grade: ${Student.grade}` ;
    // button.innerHTML = 'Add new course, term, or grade.';
    // button.classList.add('open-button')
    // button.addEventListener('click',openForm())
    studentInfo.classList.add('student-info');
    studentInfo.appendChild(nameItem);
    studentInfo.appendChild(courseItem);
    studentInfo.appendChild(termItem);
    studentInfo.appendChild(gradeItem)
    studentDisplay.appendChild(studentInfo);
    
}

const printList = function(stus){
    for (const stu of stus) {
        printStudent(stu);
    }
}
const clearList = function() {
    while(studentDisplay.hasChildNodes()) {
    studentDisplay.firstChild.remove();
    }
}

document.querySelector('.new-student-button').addEventListener('click', function(){
    const studentName = document.querySelector('.new-student-name').value
    const studentCourse = document.querySelector('.new-student-course').value
    const studentTerm = document.querySelector('.new-student-term').value
    printStudent(Student(studentName,studentCourse,studentTerm))
    addStu(Student(studentName,studentCourse,studentTerm))
})

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

document.querySelector('.changeBtn').addEventListener('click',function(){
    const searchName = document.querySelector('.searchVal').value
    const searchCourse = document.querySelector('.courseChoice').value
    const searchTerm = document.querySelector('.termChoice').value
    const assignment = document.querySelector('.assign').value
    const gradeEntered = document.querySelector('.enteredGrade').value
    let wrongName = 0
    for(const student of stus){
        if (searchName===student.name && searchCourse===student.course && searchTerm===student.term){
            let courseIndex = 0
            for(let i = 0;i<student.courses.length;i++){
                if(searchCourse===student.courses[i]){
                    courseIndex=i
                }
            }
            student.courses[courseIndex].terms[searchTerm-1].addGrade(assignment,Number(gradeEntered))
            student.grade = student.getAverage()
        }else if(searchName === student.name && searchCourse !== student.course){
            alert(`${student.name} is not enrolled in this course`)
            return
        }else if(searchName === student.name && searchTerm !== student.term){
            alert('Wrong Term')
            return
        }else if(searchName !== student.name){
            wrongName++
            if(wrongName===stus.length){
                alert('This student is not enroll, please go top to create new student')
            }
        }
    }
        clearList()
        printList(stus)
})
document.querySelector('.addTerm').addEventListener('click',function(){
    const searchName = document.querySelector('.searchVal').value
    const searchCourse = document.querySelector('.courseChoice').value
    for(const student of stus){
        if (searchName===student.name && searchCourse===student.course &&student.courses[0].terms.length<3){
            student.courses[0].addTerm()
        }
    }
})
document.querySelector('.addCourse').addEventListener('click',function(){
    const searchName = document.querySelector('.searchVal').value
    const searchCourse = document.querySelector('.courseChoice').value
    for(const student of stus){
        if (searchName===student.name && searchCourse !==student.course){
            student.addCourse(searchCourse)
        }
    }
})