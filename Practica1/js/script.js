function calculaActualizacion() {
    var sueldoAnual = (document.getElementById('sueldoAnual').value).replace(/\./g,'');
    document.getElementById('sueldoAnual').className='form-control';
    if (!isNaN(sueldoAnual)) {
            sueldoAnual = parseFloat(sueldoAnual);
    } else {
        sueldoAnual = 0;
    }
    
    var sexo = (document.getElementById('sexo').value).toUpperCase();
    var nHijos = parseInt(document.getElementById('nHijos').value);
    
   console.log(sueldoAnual, sexo, nHijos);

   var incrementoSueldo = 0;
   var incrementoHijos = 0;
   var incrementoSexo = 0;
        if (sueldoAnual > '0' && sueldoAnual<='15000') {
            incrementoSueldo = parseFloat(sueldoAnual*(1.5/100));
        } else {
            incrementoSueldo = parseFloat(sueldoAnual*(0.5/100));
        }
        if (sexo=='MUJER') {
            incrementoSexo = parseFloat(sueldoAnual*(0.1/100));
        } 
        if (nHijos >0) {
            incrementoHijos = parseFloat((sueldoAnual*(0.2/100))*nHijos);
        } 
        
    

    console.log(incrementoSueldo, incrementoSexo, incrementoHijos);
    var incrementoTotal = (sueldoAnual  + incrementoSueldo + incrementoHijos + incrementoSexo);

    if (!sueldoAnual || sueldoAnual == '0') {  
        document.getElementById('sueldoAnual').className='form-control is-invalid'; 
    }
    else {
        document.getElementById('result').innerHTML=
        '<span class="error">Tu sueldo anual actualizado será de: <strong>'+ incrementoTotal + '€</strong></span>';
        console.log(incrementoTotal);

        document.getElementById('reset').style.display="block";
        document.getElementById('calculate').style.display="none";
        document.getElementById('resultWrapper').className='calculator-ouput--active';
     }
    
}

function cleaner() {
    // no funciona ('myform').reset()
    document.getElementById('sueldoAnual').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('nHijos').value = '';

    document.getElementById('reset').style.display="none";
    document.getElementById('resultWrapper').className='calculator-ouput';
    document.getElementById('calculate').style.display="block";
    document.getElementById('sueldoAnual').className='form-control';
}
