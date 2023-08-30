export class Usuario {
    constructor(
        public id: number,
        public nombres: string,
        public apellidos: string,
        public edad: number,
        public direccion: string,
        public correo: string,
        public rol: string,
        public pass: string
    ){

    }
}