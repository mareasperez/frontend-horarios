import { GrupoModel } from '../grupo.model';

export class HorarioViewModel{
    // tslint:disable: variable-name

    // 100% necesarios
    horario_dia: string;
    horario_hora: number;
    componente: string;
    horario_vacio: boolean;
    aula?: string;
    carrera?: string;
    grupo?: string;
    anyo?: number;
    docente?: string;
}