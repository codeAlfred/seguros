import { Component, OnInit } from '@angular/core';
//importar el servicio
import { EmployeService} from '../../services/employe.service';
//importar la interface employee
import { Employe } from '../../models/employe';

@Component({
  selector: 'app-nawork-list',
  templateUrl: './nawork-list.component.html',
  styleUrls: ['./nawork-list.component.css']
})
export class NaworkListComponent implements OnInit {
  //variable para almacenar los trabajadores
  employe: Employe={
    dni: '',
    cui: '',
    apellido_paterno: '',
    apellido_materno: '',
    nombres: ''
  }; 
  
  worked: any=[];

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
  }

  //obtener un empleado del servidor
  getEmploye(dni:string){    
    this.employeService.getEmploye(dni).subscribe(
      res => {       
        this.employe = res;        
      },
      err => console.error(err)
    )
  }

  //agregar un empleado al arreglo empleados
  addEmployes(pater:string, mater:string, name: string, dni: string){

   
    let fullName1 = pater +" " + mater+ " " + name;

    let fullName="";
    if(fullName1.search("&Ntilde;")>0){
      fullName = fullName1.replace('&Ntilde;','Ñ');
      //console.log("reemplazando el &tilde por la ñ ::"+fullName);
    }
    else{
      fullName=fullName1;
    }
    //console.log("existe la frase con ñ  "+fullName);

    this.worked.push([fullName, dni]);    
    this.worked.sort();
    this.cleanEmployee();
  }
 
  //LIMPIAR CAMPOS DEL TRABAJADOR
  cleanEmployee(){

    this.employe.dni= '',
    this.employe.cui= '',
    this.employe.apellido_paterno= '',
    this.employe.apellido_materno= '',
    this.employe.nombres= ''

  }


}

