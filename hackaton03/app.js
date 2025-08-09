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

const inputEjercicio3 = document.getElementById("inputEjercicio3");
const btnEjercicio3 = document.getElementById("btnEjercicio3");

btnEjercicio3.addEventListener("click", function() {

    let numero = Number(inputEjercicio3.value);

    if(isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        let valorAbsoluto = Math.abs(numero);

        if(valorAbsoluto % 10 === 4) {
            alert("El numero termina en 4.")
        } else {
            alert("El numero no termina en 4.")
        }
    }

})

const btnEjercicio34 = document.getElementById("btnEjercicio34");
const btnEjercicio342 = document.getElementById("btnEjercicio34_2");
const container = document.getElementById("container");

btnEjercicio34.addEventListener("click", function() {
    
    container.innerHTML = "";

    let multiplicando = 1;
    
    for(multiplicando; multiplicando <= 9; multiplicando++) {
        const card = document.createElement("div");
        const title = document.createElement("h2");

        card.className = "w-full h-auto p-2 flex flex-col items-center justify-center border-2 rounded-2xl relative pt-7 shadow-lg";
        title.className = "text-center absolute top-[-14px] w-auto bg-blue-600 text-white px-4 rounded-lg shadow-lg";
        title.textContent = `Tabla del ${multiplicando}`;

        card.appendChild(title);

        let multiplicador = 0;
        for(multiplicador; multiplicador <= 12; multiplicador++) {
            let producto = multiplicando * multiplicador;
            const p = document.createElement("p");
            p.textContent = `${multiplicando} X ${multiplicador} = ${producto}`;
            card.appendChild(p);
        }

        container.appendChild(card);
    }
})

btnEjercicio342.addEventListener("click", function() {
    container.innerHTML = "";
});

const inputEjercicio39 = document.getElementById("inputEjercicio39");
const btnEjercicio39 = document.getElementById("btnEjercicio39");

btnEjercicio39.addEventListener("click", function() {
    let numero = Number(inputEjercicio39.value);
    
    if(isNaN(numero)) {
        alert('El numero ingresado es incorrecto.')
    } else {
        
        let pi = 0;

        for(let i = 0; i< numero; i++) {
            let denominador = 2 * i + 1;
            let term = 4 / denominador;
            if (i % 2 === 0) {
                pi += term;
            } else {
                pi -= term;
            }
        }

        alert(`La aproximacion de pi es: ${pi}`)
    }

})