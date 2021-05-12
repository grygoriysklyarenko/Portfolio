import {Student} from './student.js';
import {Admin} from './admin.js';
import {Lector} from './lector.js';

(async()=>{
    let response = await fetch(`data.json`),
        data = await response.json(),
        // console.log(data)
        gradation = data.gradation;    

    data.users.forEach(user => {
        let roleImg = data.roles[user.role];

        user.role === 'admin' &&  new Admin (user, roleImg, gradation);
        user.role === 'lector' &&  new Lector (user, roleImg, gradation);
        user.role === 'student' &&  new Student (user, roleImg, gradation);
    });
})();