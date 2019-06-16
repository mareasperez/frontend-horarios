
export class RecintoModel{

    constructor(
                private id:string, 
                private nombre:string,
                private ubicacion:string,
                private facultadId:string
    ){}

    getId(){return this.id;}

    getNombre(){return this.nombre;}
    
    getUbicacion(){return this.ubicacion;}
    
    getFacultadId(){return this.facultadId};
}