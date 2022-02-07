var HistorialCompleto = [];
function calculadora(content){
    
    
    switch(content){
        case "C":   
            document.getElementById("resul").value = "";break;
        case "H": ObtenerLocalStorage();break;
        case "⌫": 
            let resul = document.getElementById("resul").value;
            let dividir = String(resul);
            document.getElementById("resul").value = dividir.substring(0,dividir.length-1);
            break;
        case "X": document.getElementById("resul").value += "*";break;
        case "÷": document.getElementById("resul").value += "÷";break;
        case "-": document.getElementById("resul").value += "-";break;
        case "+": document.getElementById("resul").value += "+";break;
        case ".": document.getElementById("resul").value += "."; break;
        case "=": Procedimiento();break;
        case 0: document.getElementById("resul").value += 0;break;
        case 1: document.getElementById("resul").value += 1;break;
        case 2: document.getElementById("resul").value += 2;break;
        case 3: document.getElementById("resul").value += 3;break;
        case 4: document.getElementById("resul").value += 4;break;
        case 5: document.getElementById("resul").value += 5;break;
        case 6: document.getElementById("resul").value += 6;break;
        case 7: document.getElementById("resul").value += 7;break;
        case 8: document.getElementById("resul").value += 8;break;
        case 9: document.getElementById("resul").value += 9;break;
    }
}

function Procedimiento(){
    var resul = document.getElementById("resul").value;
    var HistorialActual = [];
    HistorialActual[0] = 0;
    var contador = 0;
    var pasador = false;
    for(i = 0; i < resul.length; i++){
        
        console.log(resul[i]);
        if(isNaN(resul[i]) && (resul[i] != '.'))
        {
            contador++;
            HistorialActual[contador] = resul[i]; 
            pasador = true;
        }
        if(pasador==true){
            contador++;
            HistorialActual[contador] = 0;
            pasador = false;
        }
        else
        {
            HistorialActual[contador] += resul[i]; 
        }    
    }

    var numero1, numero2 = 0;
    var signo = "";
    for(i = 0; i < HistorialActual.length; i++){
        if(i==0){ numero1 = parseFloat(HistorialActual[0])}
        else
        {
            if((i%2) == 0)
            {
                numero2 = parseFloat(HistorialActual[i]);
                signo = HistorialActual[i-1];

                switch(signo)
                {
                    case "+": numero1 = (numero1 + numero2);break;
                    case "-": numero1 = (numero1 - numero2);break;
                    case "*": numero1 = (numero1 * numero2);break;
                    case "÷": numero1 = (numero1 / numero2);break;
                }
            }
        }

        
    }
    HistorialCompleto.push(resul+'='+numero1);
    console.log(HistorialCompleto);
    GuardarLocalStorage();
    document.getElementById("resul").value = numero1; 
}

function GuardarLocalStorage()
{
    localStorage.setItem("Historial",HistorialCompleto);
}
function ObtenerLocalStorage()
{
    if(localStorage.getItem("Historial") == null)
    {
        alert("Actualmente no hay cálculos guardados");
    }
    else
    {
        var historial = localStorage.getItem("Historial");
        const DividirH = historial.split(",");
        let contenido = "";
        for(let x of DividirH)
        {
            contenido += x + "<br>";
        }
        document.getElementById("resul").style.display = "none";
        document.getElementById("MostrarHistorial").style.display = "inherit";
        document.getElementById("ContenidoH").innerHTML = contenido;
    }
}
function BorrarHistorial()
{
    localStorage.clear();
    document.getElementById("MostrarHistorial").style.display = "none";
    document.getElementById("resul").style.display = "inherit";
    document.getElementById("resul").value = "";
}