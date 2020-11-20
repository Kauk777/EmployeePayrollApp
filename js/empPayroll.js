class EmployeePayroll {

    // getters and setters
    get id() { return this._id; }
    set id(id) {
        this._id=id;
    }
    get name() { return this._name; }
    set name(name) {
        let nameReg=RegExp('^[A-Z]{1}[a-z]{3,}$');
        if(nameReg.test(name)) 
        this._name=name;
        else throw 'Invalid Name';
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic=profilePic;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender=gender;
    }
    get department() { return this._department; }
    set department(department) {
        this._department=department;
    }
    get salary() { return this._salary; }
    set salary(salary) {
        this._salary=salary;
    }
    get note() { return this._note; }
    set note(note) {
        this._note=note;
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        this._startDate=startDate;
    }


    /*get startDate() { return this._startDate; }
    set startDate(startDate) {
        let joiningDate=startDate.split("/");
        let currentDate=new Date().getDate();
        let currentMonth=new Date().getMonth();
        let currentYear=new Date().getFullYear();
        if(joiningDate[0]<=currentDate && joiningDate[1]<=(currentMonth+1) && joiningDate[2]<=currentYear)
        this._startDate=startDate;
        else throw 'Invalid Joining date';
    }*/

     // method
     toString() {
         //const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
         //const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
         return "id="+this.id+", name="+this.name+", gender="+this.gender+
         ", profilePic="+this.profilePic+", department="+this.department+", salary="+
         this.salary+", "+", startDate="+this.startDate+", note="+this.note;
     }
}

/*function save() {
try {
let empData=new Array();
const formElement = document.querySelector('.form');
let data=new FormData(formElement);
let idVal=1,startDate;
function save() {
    startDate=data.get('Day')+"/"+data.get('Month')+"/"+data.get('Year');
    empData.push(new EmployeePayroll(idVal,data.get('name'),data.get('salary'),data.get('gender'),startDate));
    id++;
}
empData.forEach(e => console.log(e.toString()));
}
catch (e) {
    console.error(e);
}
}*/

/*let empData=new EmployeePayroll(1,'Mark',700000);
console.log(empData.toString());
try {
    empData.name='Clark';
    console.log(empData.toString());
}
catch (e) {
    console.error(e);
}
let newEmpData=new EmployeePayroll(1,'Mason',700000,'M',new Date());
console.log(newEmpData.toString());*/
