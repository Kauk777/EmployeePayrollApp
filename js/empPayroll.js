class EmployeePayroll {
    // property
    id;
    salary;
    gender;

    // constructor
    constructor(...params) {
        this.id=params[0];
        this.name=params[1];
        this.salary=params[2];
        this.gender=params[3];
        this.startDate=params[4];
    }

    // getters and setters
    get name() { return this._name; }
    set name(name) {
        let nameReg=RegExp('^[A-Z]{1}[a-z]{3,}$');
        if(nameReg.test(name)) 
        this._name=name;
        else throw 'Invalid Name';
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        let joiningDate=startDate.split("/");
        let currentDate=new Date().getDate();
        let currentMonth=new Date().getMonth();
        let currentYear=new Date().getFullYear();
        if(joiningDate[0]<=currentDate && joiningDate[1]<=currentMonth && joiningDate[2]<=currentYear)
        this._startDate=startDate;
        else throw 'Invalid Joining date';
    }

     // method
     toString() {
         const options = { year: 'numeric', month: 'long', day: 'numeric'};
         const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
         return "id="+this.id+", name="+this.name+", salary="+this.salary+", "+"gender="+this.gender+", startDate="+empDate;
     }
}

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
