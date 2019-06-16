

export class CarreraModel{
    constructor(
        private id:string, 
        private nombre:string,
        private departamentoId
    ){}

    getId(){return this.id;}

    getNombre(){return this.nombre;}

    getDepartamentoId(){return this.departamentoId;}

}