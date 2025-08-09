const inputEjercicio1 = document.getElementById("inputEjercicio1");
const btnEjercicio1 = document.getElementById("btnEjercicio1");

btnEjercicio1.addEventListener("click", function() {

    // con length
    // if(inputEjercicio1.value.length === 3 ) {
    //     alert("El numero tiene 3 digitos")
    // } else {
    //     alert("El numero no tiene 3 digitos")
    // }
    
    let numero = parseInt(inputEjercicio1.value);
    
    if(!isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        if(Math.abs(numero) >= 100 && Math.abs(numero) <= 999) {
            alert("El numero tiene 3 digitos.")
        } else {
            alert("El numero no tiene 3 digitos.")
        }
    }

})
