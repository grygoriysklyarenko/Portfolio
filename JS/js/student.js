import * as User from './user.js';

export class Student extends User.User {
    constructor(obj, roleImg, gradation){
        super();
        this.roleImg = roleImg;
        this.gradation = gradation;
        this.setData(obj);
    }

    renderInfo(){

        if(this.courses){
            let userCourses = document.createElement(`div`);
            userCourses.classList.add('user__courses');

            this.courses.map(course =>
                userCourses.innerHTML +=
                `<p class="user__courses--course ${this.role}">
                ${course.title} <span class=${this.getGradation(course.mark).class}>${this.getGradation(course.mark).mark}</span>`);

            super.renderInfo().append(userCourses);
        } else {
            super.renderInfo();
        }
    }
}