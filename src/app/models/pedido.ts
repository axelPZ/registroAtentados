export class Pedido {
    constructor(
        public id: number,
        public fecha: string,
        public total: number,
        public estado: string,
        public usuario: string,
        public cliente: string,
        public fechaPeticion: string,
        public fechaSalida: string,
        public descripcion: string
    ){

    }
}