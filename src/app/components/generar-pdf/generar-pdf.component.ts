import { Component, Input, OnInit } from '@angular/core';

import { Utils } from 'src/app/utils/Utils';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//agregando la fuente arial al pdf make
pdfMake.fonts = {
  arial: {
    normal: 'arial.ttf',
    bold: 'arial.ttf',
    italics: 'arial.ttf',
    bolditalics: 'arial.ttf'
  }
}

pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-generar-pdf',
  templateUrl: './generar-pdf.component.html',
  styleUrls: ['./generar-pdf.component.css']
})
export class GenerarPdfComponent implements OnInit {
//obteniendo 
  @Input() work: any;

  body: any = [];

  logoDataUrl: string;
  firmaUrl: string;

  hoy = new Date();
  
  aumentarCorrelativo: number;
 

  constructor() { }

  ngOnInit(): void {
    // C:\Users\CLERQUE CONSTRUCTORA\Desktop\proyecto sctr\client\src\assets\logo.jpg
    Utils.getImageDataUrlFromLocalPath1('assets/logo.jpg').then(
    result => this.logoDataUrl = result
    )

    Utils.getImageDataUrlFromLocalPath1('assets/firma2.png').then(
      result => this.firmaUrl = result
      )

  }

  obtenerFecha(){   

    // var dia: string[] = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    // const day = dia[this.hoy.getDay()];

    var mesok: string[]=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];  
    const mes = mesok[this.hoy.getMonth()]

    let day="";
    if (this.hoy.getDate()<10){
      day = "0"+this.hoy.getDate();
   }
   else{
     day=""+this.hoy.getDate();
   }

    let fecha: string = "Miraflores, "+ day+ " de "+ mes+ " del " + this.hoy.getFullYear();
  
    return fecha;
  }

  obtenerHora(sctr: string){
    
    let hora="";
    let minute="";
    let tempo="";

    if(this.hoy.getHours()<12){
      tempo=" AM";
    }else{
      tempo=" PM";  
    }
    //trabajando con el tipo de sctr obtenido

    if(sctr == "salud"){
          //agregando un 0 delante del minuto
      if (this.hoy.getMinutes()<10){
        minute = "0"+this.hoy.getMinutes();
      }
      else{
        minute = ""+this.hoy.getMinutes(); 
      }
      

    }
    if(sctr == "pension"){
        //agregando un 0 delante del minuto
      
      
      if ((this.hoy.getMinutes()+2)<10){
        minute = "0"+(this.hoy.getMinutes()+2);
      }
      else{
        minute = ""+(this.hoy.getMinutes()+2); 
      }

      
    }

    //agregando un cero delante de la hora
    if (this.hoy.getHours() < 10){
      hora = "0"+this.hoy.getHours();
   }
   else{
     hora = ""+this.hoy.getHours();
   }
   let horaCompleta: string = hora+ ":" + minute + tempo;

    return horaCompleta;
  }

  obtenerFechaVencimiento(){   

    var mesok: string[]=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    var mes31: string[]=["Enero","Marzo","Mayo","Julio","Agosto","Octubre","Diciembre"];
    var mes30: string[]=["Abril","Junio","Septiembre","Noviembre"];
    var mes28: string[]=["Febrero"];

    var mesObjetivo = mesok[this.hoy.getMonth()];
    
    let day="";

    if (mes31.includes(mesObjetivo)){
      day="31";
    }
    if(mes30.includes(mesObjetivo)){
      day="30";
    }if(mes28.includes(mesObjetivo)){
      day="28";
    }

    //agregando 0 al mes
    let mes="";
    if (this.hoy.getMonth()<10){
      mes = "0"+(this.hoy.getMonth()+1);
   }
   else{
     mes=""+(this.hoy.getMonth()+1);
   }
  let fechaVencimiento: string =  day+ "."+ mes+ "." + this.hoy.getFullYear()+".";
  
    return fechaVencimiento;
  }
/* *********************************************************************************************************************/
  /***********************este numero correlativo debe ser llenado manualmente despues de obtener el********************/
  /**********************************************************************************************************************/
  //primer sctr oficial
  correlativoMes: number = 5463105;

  obteniendoCorrelativo(sctr: string){
    //'SCTR5361933-S0237129-SALUD'
    // const correlativo = "5361933";
    let correlativo="";
    if(sctr == "salud"){
      correlativo=""+(this.correlativoMes + this.aumentarCorrelativo);
    }
    if(sctr == "pension"){
      correlativo=""+(this.correlativoMes + this.aumentarCorrelativo + 1);
    }
    


    return correlativo;
  }

  //obteniendo el nombre del archivo pdf que se descargara
  nameDownload(sctr:string){
    const correlativo = this.obteniendoCorrelativo(sctr);
      //ReporteConst_SCTR5183351-S0237129-SALUD_20201119160207477
      if(sctr == "salud"){
        var name="ReporteConst_SCTR"+correlativo+"-S0237129-SALUD_"+this.hoy.getFullYear()+this.hoy.getMonth()+"19160207477";
      }
      //ReporteConst_SCTR4901640-P0230693-PENSION_20200629221001482
      if(sctr == "pension"){
        var name="ReporteConst_SCTR"+correlativo+"-P0230693-PENSION_"+this.hoy.getFullYear()+this.hoy.getMonth()+"19160156988";
      }

    return name;
  }

  //metodo para crear el pdf de sctr Salud
  sctrSaludPdf(){
    
    let tipoSctr = "salud";

    const title = [ 
      {text: 'N°', alignment: 'center', fontSize: 10, margin: [ 0 , 2, 0 , 2 ]}, 
      {text: 'APELLIDOS Y NOMBRES',alignment: 'center', fontSize: 10, margin: [ 0 , 2, 0 , 2 ]},
      {text: 'C.E/DNI/PAS/RUC', colSpan: 2, alignment: 'left', fontSize: 10, margin: [ 12 , 2, 0 , 2 ]}, 
      {}
    ]
    const subhead= [{text: 'SEDE : CONSTRUCCIÓN', colSpan: 4, alignment: 'left', fontSize: 12, margin: [ 9 , 4, 0 , 4 ] }, {}, {},{}]

    this.body.push(title, subhead);
    let val = 0;
    for (let i=val; i<this.work.length; i++){    
      this.body.push([
        {text: i+1 ,alignment: 'center', fontSize: 11},
        {text: this.work[i][0] ,margin: [ 2 , 2, 0 , 2 ], fontSize: 11},
        {text: 'DNI' ,margin: [ 2 , 2, 0 , 2 ], fontSize: 11},
        {text: this.work[i][1] , alignment: 'left', fontSize: 11,margin: [ 15 , 0, 0 , 0 ]}
      ]);        
    }


    const documentDefinition = {
      content: [   
        {
          stack: [
              {            
                image: this.logoDataUrl, width:190, height: 35, margin: [ 10 , 0, 0 , 0 ] ,     
              },
              { text: 'SCTR'+this.obteniendoCorrelativo(tipoSctr)+'-S0237129-SALUD', fontSize: 9, alignment: 'left', margin: [ 0 , 17 , 10 , 0 ]},
              { text: this.obtenerFecha() , fontSize: 9,alignment: 'right', margin: [ 0 , 0 , 0 , 10 ]},
              { text: this.obtenerHora(tipoSctr), fontSize: 9, decoration:'underline', alignment: 'right', margin: [ 0 , 3 , 0 , 10 ]},

              { text: 'CONSTANCIA', fontSize: 11, decoration:'underline', alignment: 'center', margin: [ 5 , 2 , 10 , 0 ]},
              { text:'Por medio de la presente, dejamos constancia que los Señores:', fontSize:9, alignment: 'left', margin: [ 0 , 8 , 0 , 5 ]},
              { text:'C & R CLERQUE CONSTRUCTORA PERU SOCIEDAD ANONIMA CERRADA', fontSize:12, alignment: 'center', margin: [ 0 , 7 , 0 , 8 ]},
              { text:'De acuerdo a lo establecido en el Decreto Supremo 003-98-SA – Normas Técnicas del Seguro Complementario de Trabajo de Riesgo, a la fecha han contratado con Rimac S.A. Entidad Prestadora de Salud la(s) póliza(s) de Seguro Complementario de Trabajo de Riesgo siguiente(s):', fontSize:9, alignment: 'justify'},
              { text: 'SCTR SALUD  N° S0237129', fontSize: 11, alignment: 'center', margin: [ 0 , 8 , 0 , 2 ]},
              { text: 'La constancia es de vigencia mensual y es renovable', fontSize: 9,alignment: 'center', margin: [ 0 , 1 , 0 , 13 ]},
              { text: 'La presente constancia tiene vigencia hasta el '+this.obtenerFechaVencimiento() +' A solicitud de la empresa contratante se emite la presente Constancia detallando a continuación el personal que se encuentra afiliado a la(s) póliza(s) antes mencionada(s).', fontSize: 9, alignment: 'justify'},

              { text: 'RELACION DE PERSONAL:', fontSize: 11, alignment: 'left', margin: [ 0 , 27.5 , 0 , 0 ]},

              {
                margin: [-5, 0, 0, 0], 
                font: 'arial',               
                table: {
                  // heights: 40,
                  font: 'arial',
                  widths: [30, 260, 65 ,65],                       
                  body: this.body                            
                  
                }
              },
              { text: 'Se expide la presente a solicitud del Asegurado/Contratante para los fines que estime convenientes.', fontSize: 9,alignment: 'left', margin: [ 2 , 10 , 0 , 6 ]},
              
              {image: this.firmaUrl, margin: [ 10 , 7 , -10 , 0 ], alignment: 'right', width: 120, height: 60},
              { text: 'Mark Andrés Reyes Ploog', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , -4 , 0]},
              { text: 'Rimac EPS S.A. Entidad Prestadora ', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , -24 , 0]},
              { text: 'Usuario :  CR1RZAMUDM', fontSize: 8, alignment: 'left', margin: [ 0 , 0 , 0 , 0]},
              { text: 'de Salud', fontSize: 10, alignment: 'right', margin: [ 0 , -10 , 35 , 0]},
              
              
          ],
          margin: [33, -10, 33, 0],
          font: 'arial', 
        },

      ],
      //cambiando de fuente a Arial	
      defaultStyle: {
        font: 'arial'
      }
      
  };  

    //metodo para descargar el pdf - con su nombre definido.
    pdfMake.createPdf(documentDefinition).download(this.nameDownload(tipoSctr));
    //metodo para abrir el pdf en una ventana nueva
    //pdfMake.createPdf(documentDefinition).open();

    this.body= [];

  }

  //metodo para crear el pdf de sctr Salud
  sctrPensionPdf(){
    
    let tipoSctr = "pension";

    const title = [ 
      {text: 'N°', alignment: 'center', fontSize: 10, margin: [ 0 , 2, 0 , 2 ]}, 
      {text: 'APELLIDOS Y NOMBRES',alignment: 'center', fontSize: 10, margin: [ 0 , 2, 0 , 2 ]},
      {text: 'C.E/DNI/PAS/RUC', colSpan: 2, alignment: 'left', fontSize: 10, margin: [ 12 , 2, 0 , 2 ]}, 
      {}
    ];

    const subhead= [{text: 'SEDE : CONSTRUCCIÓN', colSpan: 4, alignment: 'left', fontSize: 12, margin: [ 9 , 4, 0 , 4 ] }, {}, {},{}];

    this.body.push(title, subhead);
    let val = 0;
    for (let i=val; i<this.work.length; i++){    
      this.body.push([
        {text: i+1 ,alignment: 'center', fontSize: 11},
        {text: this.work[i][0] ,margin: [ 2 , 2, 0 , 2 ], fontSize: 11},
        {text: 'DNI' ,margin: [ 2 , 2, 0 , 2 ], fontSize: 11},
        {text: this.work[i][1] , alignment: 'left', fontSize: 11,margin: [ 15 , 2, 0 , 2 ]}
      ]);        
    }


    const documentDefinition = {
      content: [   
        {
          stack: [
              {            
                image: this.logoDataUrl, width:190, height: 35, margin: [ 10 , 0, 0 , 0 ] ,     
              },
              { text: 'SCTR'+this.obteniendoCorrelativo(tipoSctr)+'-P0230693-PENSION', fontSize: 9, alignment: 'left', margin: [ 0 , 17 , 10 , 0 ]},
              { text: this.obtenerFecha() , fontSize: 9,alignment: 'right', margin: [ 0 , 0 , 0 , 10 ]},
              { text: this.obtenerHora(tipoSctr), fontSize: 9, decoration:'underline', alignment: 'right', margin: [ 0 , 3 , 0 , 10 ]},

              { text: 'CONSTANCIA', fontSize: 11, decoration:'underline', alignment: 'center', margin: [ 5 , 2 , 10 , 0 ]},
              { text:'Por medio de la presente, dejamos constancia que los Señores:', fontSize:9, alignment: 'left', margin: [ 0 , 8 , 0 , 5 ]},
              { text:'C & R CLERQUE CONSTRUCTORA PERU SOCIEDAD ANONIMA CERRADA', fontSize:12, alignment: 'center', margin: [ 0 , 7 , 0 , 8 ]},
              { text:'De acuerdo a lo establecido en el Decreto Supremo 003-98-SA – Normas Técnicas del Seguro Complementario de Trabajo de Riesgo, a la fecha han contratado con Rimac Seguros y Reaseguros, la(s) póliza(s) de Seguro Complementario de Trabajo de Riesgo siguiente(s):', fontSize:9, alignment: 'justify'},
              { text: 'SCTR PENSIÓN  N° P0230693', fontSize: 11, alignment: 'center', margin: [ 0 , 8 , 0 , 2 ]},
              { text: 'La constancia es de vigencia mensual y es renovable', fontSize: 9,alignment: 'center', margin: [ 0 , 1 , 0 , 13 ]},
              { text: 'La presente constancia tiene vigencia hasta el '+this.obtenerFechaVencimiento() +' A solicitud de la empresa contratante se emite la presente Constancia detallando a continuación el personal que se encuentra afiliado a la(s) póliza(s) antes mencionada(s).', fontSize: 9, alignment: 'justify'},

              { text: 'RELACION DE PERSONAL:', fontSize: 11, alignment: 'left', margin: [ 0 , 27.5 , 0 , 0 ]},

              {
                margin: [-5, 0, 0, 0], 
                font: 'arial',               
                table: {
                  // heights: 40,
                  font: 'arial',
                  widths: [30, 260, 65 ,65],                       
                  body: this.body                        
                  
                }
              },
              { text: 'Se expide la presente a solicitud del Asegurado/Contratante para los fines que estime convenientes.', fontSize: 9,alignment: 'left', margin: [ 2 , 10 , 0 , 6 ]},
              
              {image: this.firmaUrl, margin: [ 10 , 7 , -10 , 0 ], alignment: 'right', width: 120, height: 60},
              { text: 'Mark Andrés Reyes Ploog', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , -8 , 0]},
              { text: 'Rimac Seguros y Reaseguros', fontSize: 10, alignment: 'right', margin: [ 0 , 5 , -18 , 0]},
              { text: 'Usuario :  CR1RZAMUDM', fontSize: 8, alignment: 'left', margin: [ 0 , 0 , 0 , 0]},
                
              
          ],
          margin: [33, -10, 33, 0],
          font: 'arial',
          
        },

      ],
      //cambiando de fuente a Arial	
      defaultStyle: {
        font: 'arial'
      }
  };  

    //metodo para descargar el pdf - con su nombre definido.
    pdfMake.createPdf(documentDefinition).download(this.nameDownload(tipoSctr));
    //metodo para abrir el pdf en una ventana nueva
    //pdfMake.createPdf(documentDefinition).open();

    this.body= []

  }

  generarSctrPdf(){
    this.sctrSaludPdf();
    this.sctrPensionPdf();
  }



}