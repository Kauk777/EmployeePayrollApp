let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList=getEmployeePayrollDataFromStorage();
    document.querySelector('.emp-count').textContent=empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');

});
const getEmployeePayrollDataFromStorage= () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) :[];
}
// template literal ES6
function createInnerHtml() {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>" +
        "<th>Start Date</th><th>Actions</th>";
    if(empPayrollList.length==0)
    return;
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
    <tr>
    <td><img src="${empPayrollData._profilePic}" alt="" class="profile"></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td>
    <td>${empPayrollData._salary}</td>
    <td>${stringifyDate(empPayrollData._startDate)}</td>
    <td>
        <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
        <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
    </td>
    </tr>
     `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove= (node) => {
    let empPayrollData=empPayrollList.find(empdata => empdata._id==node.id);
    if(!empPayrollData)
    return;
    const index=empPayrollList.map(empdata => empdata._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent=empPayrollList.length;
    createInnerHtml();
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

// Dummy Template literal ES6 (not needed if getting object from local storage)
const createEmployeepayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _name: 'Kaushal Yadav',
            _gender: 'Male',
            _department: ['Finance', 'Engineer'],
            _salary: '477777',
            _startDate: '17 Oct 2018',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Ellipse -2.png'
        },
        {
            _name: 'Vansikha Rajput',
            _gender: 'Female',
            _department: ['HR', 'Engineer'],
            _salary: '407777',
            _startDate: '11 Nov 2016',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/Ellipse -1.png'
        },
        {
            _name: 'Neeraj Kumar',
            _gender: 'Male',
            _department: ['Sales', 'Engineer', 'HR'],
            _salary: '500000',
            _startDate: '7 Dec 2016',
            _note: '',
            _id: new Date().getTime() + 2,
            _profilePic: '../assets/Ellipse -9.png'

        }
    ];
    return employeePayrollListLocal;
}