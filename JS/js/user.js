let users = document.createElement('div');
users.classList.add('users');
document.body.append(users);

export class User {

    setData(obj){
        for(let key in obj){
			this[key] = obj[key];
		}
        // console.log(this);
        this.renderInfo();
    }

    renderInfo(){
        let user = document.createElement('div');
        user.classList.add('user');
        user.innerHTML =`
        <div class="user__info">
            <div class="user__info--data">
                <img src=${this.img} alt=${this.name} height="50">
                <div class="user__naming">
                    <p>Name: <b>${this.name}</b></p>
                    <p>Age: <b>${this.age}</b></p>
                </div>
            </div>
            <div class="user__info--role ${this.role}">
                <img src=${this.roleImg} alt=${this.role} height="25">
                <p>${this.role}</p>
            </div>
        </div>`

        users.append(user);
        return (user);
	}
    
    getGradation(mark){

        let [[satisfactoryMin,satisfactoryMax], [goodMin,goodMax], [veryGoodMin,veryGoodMax], [excellentMin,excellentMax]] = this.gradation;
        
        if(mark >= satisfactoryMin && mark < satisfactoryMax){
            return ({mark:`Satisfactory`, class:`satisfactory`});
        } else if (mark >= goodMin && mark < goodMax){
            return ({mark:`Good`, class:`good`});
        } else if (mark >= veryGoodMin && mark < veryGoodMax){
            return ({mark:`Very Good`, class:`very-good`});
        } else if (mark >= excellentMin && mark <= excellentMax){
            return ({mark:`Excellent`, class:`excellent`});
        } else {
            return ({mark:`Incorrect Mark`, class:`mark-error`});
        }
    }
}