

export class AulaModel{
    constructor(
                private id: string,
                private nombre: string,
                private capacidad: number,
                private tipo: string,
                private recintoId: string
    ){}

    getId(){return this.id;}

    getNombre(){return this.nombre;}

    getCapacidad(){return this.capacidad;}

    getTipo(){return this.tipo;}

    getIdRecinto(){return this.recintoId;}
}