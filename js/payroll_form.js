const salary = document.getElementById('salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});