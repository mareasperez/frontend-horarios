
export class DepartamentoModel{
    constructor(
                private id: string,
                private nombre: string,
                private facultadId
    ){}

    getId(){return this.id;}

    getNombre(){return this.nombre;}
        
    getFacultadId(){return this.facultadId};
}