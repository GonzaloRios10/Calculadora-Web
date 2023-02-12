/*defino las variables en donde voy a almacenar las clases nombradas en el archivo HTML para asi utilizarlo en el archivo js*/
var display_valor_anterior = document.getElementById('valor-anterior'); /*seleccionamos la clase nombrada del archivo HTML con el nombre 'valor-anterior'*/
var display_valor_actual = document.getElementById('valor-actual'); /*seleccionamos la clase nombrada del archivo HTML con el nombre 'valor-actual'*/

var botones_numeros = document.querySelectorAll('.numero'); /*seleccionamos las clases nombradas del archivo HTML con el nombre 'numero'*/
var botones_operadores = document.querySelectorAll('.operador'); /*seleccionamos las clases nombradas del archivo HTML con el nombre 'operador'*/

var memoria = []; /*array en donde guardaremos las operaciones realizadas*/

botones_numeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML))
});

botones_operadores.forEach(boton => {
    boton.addEventListener('click', () => display.ejecutar(boton.value))
});

/*---------------------------------------------------------------------------------------*/

/*aqui defino los metodos a utilizar (sumar,restar,dividir y multiplicar)*/
class Calculadora{
    sumar = (num1, num2) => {
        memoria.push(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`); /*con el metodo push almacenamos los datos en un array*/
        document.getElementById('historial').innerHTML += memoria[memoria.length-1] + '<br>'; /*escribimos dentro del div id="historial" la suma. */
        return Number(num1) + Number(num2); 
    }

    restar = (num1, num2) => {
        memoria.push(`${num1} - ${num2} = ${Number(num1) - Number(num2)}`);
        document.getElementById('historial').innerHTML += memoria[memoria.length-1] + '<br>'; /*escribimos dentro del div id="historial" la resta. */
        return Number(num1) - Number(num2);
    }

    dividir = (num1, num2) => {
        memoria.push(`${num1} / ${num2} = ${Number(num1) / Number(num2)}`);
        document.getElementById('historial').innerHTML += memoria[memoria.length-1] + '<br>'; /*escribimos dentro del div id="historial" la division. */
        return Number(num1) / Number(num2);
    }

    multiplicar = (num1, num2) => {
        memoria.push(`${num1} * ${num2} = ${Number(num1) * Number(num2)}`);
        document.getElementById('historial').innerHTML += memoria[memoria.length-1] + '<br>';/*escribimos dentro del div id="historial" la multiplicacion. */
        return Number(num1) * Number(num2);
    }

}

/*---------------------------------------------------------------------------------------*/

/*Control de la calculadora e interaccion con los botones*/
class Display {
    constructor(display_valor_anterior, display_valor_actual) {
        this.display_valor_actual = display_valor_actual;
        this.display_valor_anterior = display_valor_anterior;

        this.calculador = new Calculadora();
        this.tipo_operacion = undefined;

        this.valor_actual = ''; /*valor en blanco (vacio)*/
        this.valor_anterior = ''; /*valor en blanco (vacio)*/
        
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    borrar() {
        this.valor_actual = this.valor_actual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valor_actual = '';
        this.valor_anterior = '';
        this.tipo_operacion = undefined;
        this.imprimirValores();
    }

    ejecutar(tipo) {
        this.tipo_operacion !== 'igual' && this.calcular();
        this.tipo_operacion = tipo;
        this.valor_anterior = this.valor_actual || this.valor_anterior;
        this.valor_actual = '';
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valor_actual.includes('.')) return
        this.valor_actual = this.valor_actual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.display_valor_actual.textContent = this.valor_actual;
        this.display_valor_anterior.textContent = `${this.valor_anterior} ${this.signos[this.tipo_operacion] || ''}`;
    }

    calcular() {
        const valor_anterior = parseFloat(this.valor_anterior);
        const valor_actual = parseFloat(this.valor_actual);

        if(isNaN(valor_actual)  || isNaN(valor_anterior) ) return
        this.valor_actual = this.calculador[this.tipo_operacion](valor_anterior, valor_actual);
    }

}

/*---------------------------------------------------------------------------------------*/

var display = new Display(display_valor_anterior, display_valor_actual); /*Llamamos a la clase display*/
