
import Controlador from "../Controlador";
import Declaracion from "../Instrucciones/Declaracion";
import Ejecutar from "../Instrucciones/Ejecutar";
import Funcion from "../Instrucciones/Funcion";
import { Instruccion } from "../Interfaces.ts/Instruccion";
import Simbolos from "../TablaSimbolos/Simbolos";
import { TablaSimbolos } from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";
import Objeto from "../xml/objeto";
import obj from "../xml/objeto";
import acceso from "../xpath/acceso";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{

    public lista_instrucciones: Array <Instruccion>;

    constructor (lista_instrucciones){
        this.lista_instrucciones=lista_instrucciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
    console.log("vamos a compilar la entrada");
   
    for(let instruccion of this.lista_instrucciones){
        if(instruccion instanceof Objeto){
            let tipo=new Tipo("OBJETO");
            let sim=new Simbolos(1,tipo,instruccion.identificador,instruccion.texto,instruccion);
            ts.agregar(instruccion.identificador,sim);
            ts.agregarSiguiente(instruccion.identificador,instruccion.ejecutar(controlador,ts));
        }
    }
    this.graficar(controlador,ts); 
    console.log(ts);
    }
    ejecutarDescendente(controlador: Controlador, ts: TablaSimbolos) {
        console.log("vamos a compilar la entrada");
       
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Objeto){
                let tipo=new Tipo("OBJETO");
                let sim=new Simbolos(1,tipo,instruccion.identificador,instruccion.texto,instruccion);
                ts.agregar(instruccion.identificador,sim);
                ts.agregarSiguiente(instruccion.identificador,instruccion.ejecutar(controlador,ts));
            }
        }
        this.graficar(controlador,ts); 
        console.log(ts);
        }

    
    ejecutarXPath(controlador: Controlador, ts: TablaSimbolos,instruccion:Instruccion){
        instruccion.ejecutar(controlador,ts);
    }



    graficar(controlador: Controlador, ts: TablaSimbolos) {
        console.log("vamos a compilar xpaht");
        if(ts!=null){
            controlador.graficarEntornos(controlador,ts,ts.ambito);
            for (let tssig of ts.sig ){
                this.graficar(controlador,tssig.sig);
            } 
        }
    }

    recorrer(): Nodo {
        let raiz = new Nodo("INICIO","");

        for(let inst of this.lista_instrucciones){
            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }

}