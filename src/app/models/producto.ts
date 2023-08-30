export class Producto {
    constructor(
        public id: number,
        public nombre: string,
        public proveedor: string,
        public categoria: string,
        public tipo: string,
        public cantidad: number,
        public precio: number,
        public fechaCaducidad: string,
        public bodega: string,
        public estatenria: string,
        public ubicacion: string,
        public usuario: string
    ){}
}