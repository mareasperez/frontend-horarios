

export class DocenteModel{
    constructor(
                private id: string,
                private nombre: string,
                private inss: string,
                private departamnetoId: string
    ){}

    getId(){return this.id;}

    getNombre(){return this.nombre;}

    getInss(){return this.inss;}

    getDepartamentoId(){this.departamnetoId;}
    
}