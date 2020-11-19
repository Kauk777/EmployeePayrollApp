function displaySalary() {
    const salary=document.getElementById('salary');
    const output=document.querySelector('.salary-output')
    output.textContent=salary.value;

    // By eventListener
    /*salary.addEventListener('input', function() {
        output.textContent=salary.value;
    });*/
}