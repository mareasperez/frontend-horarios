

export class PensumModel{
    constructor(
        private id:string, 
        private nombre:string,
        private anyo: string,
        private  carreraId: string
    ){}

    getId(){return this.id;}

    getNombre(){return this.nombre;}

    getAnyo(){return this.anyo;}

    getCarreraId(){return this.carreraId;}
}