export class HorarioModel{
    // tslint:disable: variable-name
    horario_id: string;
    horario_dia: string;
    horario_hora: number;
    horario_aula: string;
    horario_grupo: string;
    horario_vacio: boolean;
    horario_choque: 'd' | 'c' | 'a' | '';//variable del front
    horario_infochoque: HorarioModel[];//variable del front
    horario_ciclo: string;//variable del front
}