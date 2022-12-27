//Constructor
function Seguro(marca,year,tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}
//Realiza la cotizacion de los datos
Seguro.prototype.cotizarSeguro=function(){
    let cantidad;
    const base = 2000;
    
    switch(this.marca){ 
        case '1':
            cantidad = base*1.15;
            textoMarca='Americano';
            break;
        case '2':
            cantidad = base*1.05;
            textoMarca='Asiatico';
            break;
        case '3':
            cantidad = base*1.35;
            textoMarca='Europeo';
            break;
        default:
            break;
    }
    //Leer el año
    const diferencia = new Date().getFullYear()-this.year;
    //Cada año que la diferencia es mayor, el costo reducira un 3%
    cantidad -= ((diferencia*3)*cantidad/100);
    //Si el seguro es basico se le agrega un 30% mas si es completo se le agrega un 50%
    if(this.tipo==='basico'){
        cantidad *=1.30;

    }else{
        cantidad*=1.50;
    }
    return cantidad;
}

function UI(){
      
}



// Prototype que llena las opciones de los años
UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear();
    const min = max-22;

    const selectYear = document.querySelector('#año');
    for(let i=max; i>min; i--){
        let option = document.createElement('option');
        option.value=i;
        option.textContent=i;
        selectYear.appendChild(option);
    }
}

UI.prototype.mostrarError = (error,tipo)=>{
    const ContenedorError = document.querySelector('.error');
    const pe = document.createElement('p');
    pe.classList.add('mensaje-error');
    pe.textContent=error;
    ContenedorError.appendChild(pe)
    setTimeout(()=>{
        ContenedorError.remove(pe);
    },2000);
}

UI.prototype.mostrarResultado=(seguro,total)=>{
    const contenedorResultado = document.querySelector('.render');
    let textoMarca;
    switch(seguro.marca){
        case '1':
            textoMarca='Americano';
            break;
        case '2':
            textoMarca='Asiatico';
            break;
        case '3':
            textoMarca='Europeo';
            break;
        default:
            break;                
    }

    const div = document.createElement('div');
    div.classList.add('resultado');
    div.innerHTML=`
    <P class="resumen" ><span>TU RESUMEN</span></P>
    <p><span>Marca:</span>${textoMarca}</p>
    <p><span>Año:</span>${seguro.year}</p>
    <p><span>Tipo:</span>${seguro.tipo}</p>
    <p><span>Total:</span>${total}</p>
    
    
    `;
    contenedorResultado.appendChild(div);

}



//Instancia que llena el select año
const ui = new UI();


document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();//Llena el select con los años 

});

eventListener();
function eventListener(){
    const form = document.querySelector('.form');
    
    form.addEventListener('submit',cotizarSeguro);
}


function cotizarSeguro(e){
    e.preventDefault();
    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    //Leer año selecionado
    const year = document.querySelector('#año').value;
    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value  ;
    
    if(marca===''|| year===''|| tipo===''){
        ui.mostrarError('Debe llenar todos los campos');
        return
    }
    //Ocultar el render de antiguas cotizaciones
    const resultados  = document.querySelector('.resultado');
    if(resultados!=null){
        resultados.remove();
    } 

    //Instancia del seguro
    const seguro = new Seguro(marca,year,tipo);
    const total= seguro.cotizarSeguro();
    
    //Utiliza el prototype que va a cotizar
    ui.mostrarResultado(seguro,total);
    resetearForm();
}
function resetearForm(){
    const form = document.querySelector('.form');
    form.reset();
}