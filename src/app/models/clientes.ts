export class Cliente {
    constructor(
        public id: number,
        public nombres: string,
        public apellidos: string,
        public edad: number,
        public direccion: string,
        public pass: string,
        public correo: string,
        public descripcion: string,
        public departamento: string,
        public municipio: string,
        public empresa: string
    ){}
}