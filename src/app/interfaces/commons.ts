
//interfaz de vehiculo
export interface Vehiculo {
    tipoVehiculo: string;
    placa: string;
    imagen: string;
    horaIngreso: string;
    color: string;
    valorPagado?: number;
    horaSalida?: string;
}