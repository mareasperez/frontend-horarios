import { GrupoModel } from './grupo.model';

export class HorarioViewModel{
    // tslint:disable: variable-name
    horario_id: number;
    horario_dia: string;
    horario_hora: number;
    horario_aula: string;
    horario_grupo?: GrupoModel;
    horario_vacio: boolean;
}