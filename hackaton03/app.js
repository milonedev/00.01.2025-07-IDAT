const inputEjercicio1 = document.getElementById("inputEjercicio1");
const btnEjercicio1 = document.getElementById("btnEjercicio1");

btnEjercicio1.addEventListener("click", function() {
    let numero = Number(inputEjercicio1.value);
    
    if(isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        if(Math.abs(numero) >= 100 && Math.abs(numero) <= 999) {
            alert("El numero tiene 3 digitos.")
        } else {
            alert("El numero no tiene 3 digitos.")
        }
    }

})

const inputEjercicio2 = document.getElementById("inputEjercicio2");
const btnEjercicio2 = document.getElementById("btnEjercicio2");

btnEjercicio2.addEventListener("click", function() {

    let numero = Number(inputEjercicio2.value);

    if(isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        if(numero > 0) {
            alert("El numero No es negetivo.")
        } else {
            alert("El numero es negativo.")
        }
    }

})