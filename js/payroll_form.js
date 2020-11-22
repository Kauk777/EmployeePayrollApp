let isUpdate = false;
let employeePayrollObj={};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const date=document.querySelector('#date');
    date.addEventListener('input', function() {
        const startDate=new Date(Date.parse(getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year')));
        try {
            (new EmployeePayroll()).startDate=startDate;
            setTextvalue('.date-error',"");
        } catch(e) {
            setTextvalue('.date-error',e);
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    checkForUpdate();
});

const checkForUpdate= () => {
    const employeePayrollJson=localStorage.getItem('editEmp');
    isUpdate=employeePayrollJson?true:false;
    if(!isUpdate)
    return;
    employeePayrollObj=JSON.parse(employeePayrollJson);
    setForm();
}

const setForm= () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]').employeePayrollObj._department;
    setValue('#salary',employeePayrollObj._salary);
    setTextvalue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

const save= (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
        //let employeePayrollData=createEmployeePayroll();
        //createAndUpdateStorage(employeePayrollData);
    } catch(e) {
        return;
    }
}

const setEmployeePayrollObject= () => {
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender=getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department=getSelectedValues('[name=department]');
    employeePayrollObj._salary=getInputValueById('#salary');
    employeePayrollObj._note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate=date;

}

function createAndUpdateStorage() {
    //localStorage.clear();
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList) {
        let employeePayrollData=employeePayrollList.find(empData => empData._id==employeePayrollObj._id);
        if(!employeePayrollData){
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index=employeePayrollList.map(empData => empData._id).indexOf(employeePayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(employeePayrollData._id));
        }
        
    } else {
        employeePayrollList=[createEmployeePayrollData()];
    }
    //alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData= (id) => {
    let employeePayrollData=new EmployeePayroll();
    if(!id)
    employeePayrollData.id=createNewEmployeeId();
    else
    employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData= (employeePayrollData) => {
    try {
        employeePayrollData.name=employeePayrollObj._name;
    } catch(e) {
        setTextvalue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=employeePayrollObj._profilePic;
    employeePayrollData.gender=employeePayrollObj._gender;
    employeePayrollData.department=employeePayrollObj._department;
    employeePayrollData.salary=employeePayrollObj._salary;
    employeePayrollData.note=employeePayrollObj._note;
    try {
        employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
    } catch(e) {
        setTextvalue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId= () => {
    let empId=localStorage.getItem('EmployeeID');
    empId=!empId ? 1: (parseInt(empId)+1).toString();
    localStorage.setItem('EmployeeID',empId);
    return empId;
}
const createEmployeePayroll= () => {
    let employeePayrollData=new EmployeePayroll();
    //employeePayrollData.id=new Date().getTime()+1;
    try {
        employeePayrollData.name=getInputValueById('#name');
    } catch(e) {
        setTextvalue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate=new Date(Date.parse(date));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getInputValueById= (id) => {
    let value=document.querySelector(id).value;
    return value;
}
const getSelectedValues= (propertyValue) => {
    let allItems=document.querySelectorAll(propertyValue);
    let setItems=[];
    allItems.forEach(item => {
        if(item.checked)
        setItems.push(item.value);
    });
    return setItems;
}
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setSelectedIndex('#day','0');
    setSelectedIndex('#month','0');
    setSelectedIndex('#year','0');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked=false;
    });
}
const setValue = (id,value) => {
    const element=document.querySelector(id);
    element.value=value;
}
const setTextvalue = (classElem,value) => {
    const element=document.querySelector(classElem);
    element.textContent=value;

}
const setSelectedValues = (propertyValue,value) => {
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if(value.includes(item.value))
            item.checked=true;
        }
        else if(item.value==value)
        item.checked=true;
    });

}
const setSelectedIndex = (id,index) => {
    const element=document.querySelector(id);
    element.selectedIndex=index;
}




