import * as User from './user.js';

export class Admin extends User.User {
    constructor(obj, roleImg, gradation){
        super();
        this.roleImg = roleImg;
        this.gradation = gradation;
        this.setData(obj);
    }

    renderInfo(){

        if(this.courses){
            let userCourses = document.createElement(`div`);
            userCourses.classList.add(`user__courses`, `${this.role}--info`);

            this.courses.map(course =>
                userCourses.innerHTML +=
                `<div class="user__courses--course ${this.role}">
                <p>Title: <b>${course.title}</b></p>
                <p>Admin's score: <span class=${this.getGradation(course.score).class}>${this.getGradation(course.score).mark}</span></p>
                <p>Lector: <b>${course.lector}</b></p>
                </div>`);

            super.renderInfo().append(userCourses);
        } else {
            super.renderInfo();
        }
    }
}