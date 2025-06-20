import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface CarritoItem {
  uid: string; // Identificador único por ítem
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  tipo: 'servicio' | 'paquete';
  imagen?: string;
  descripcion?: string;
  cupos?: number;
  ref?: any;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly STORAGE_KEY = 'carrito_items';
  private carrito = new BehaviorSubject<CarritoItem[]>(this.cargarDesdeStorage());
  carrito$ = this.carrito.asObservable();

  // Carga del localStorage
  private cargarDesdeStorage(): CarritoItem[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Guardar en localStorage
  private guardarEnStorage(items: CarritoItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.carrito.next(items);
  }

  // Obtener lista actual
  obtenerItems(): CarritoItem[] {
    return this.carrito.value;
  }

  // Agregar nuevo ítem (con uid)
  agregar(item: Omit<CarritoItem, 'uid'>): void {
    const nuevoItem: CarritoItem = { ...item, uid: uuidv4() };
    const items = this.obtenerItems();
    items.push(nuevoItem);
    this.guardarEnStorage(items);
  }

  // Eliminar por UID único
  eliminarPorUid(uid: string): void {
    const items = this.obtenerItems().filter(item => item.uid !== uid);
    this.guardarEnStorage(items);
  }

  // Limpiar todo el carrito
  limpiar(): void {
    this.guardarEnStorage([]);
  }

  // Total acumulado
  obtenerTotal(): number {
    return this.obtenerItems().reduce((total, item) =>
      total + item.precio * item.cantidad, 0);
  }

  // Cantidad total de unidades
  obtenerCantidadTotal(): number {
    return this.obtenerItems().reduce((acc, item) => acc + item.cantidad, 0);
  }

  // ✅ Actualizar cantidad exacta por UID
 actualizarCantidadPorUid(uid: string, cantidad: number): void {
  const items = this.obtenerItems().map(item => {
    if (item.uid === uid) {
      return { ...item, cantidad };
    }
    return item;
  });
  this.guardarEnStorage(items);
}


  // Verificar si todos los ítems tienen cupos válidos
  tieneCuposSuficientes(): boolean {
    return this.obtenerItems().every(item =>
      item.ref?.cupos == null || item.cantidad <= item.ref.cupos);
  }

  // Cálculo de descuentos automáticos
  calcularDescuento(): number {
    const total = this.obtenerTotal();
    const cantidad = this.obtenerCantidadTotal();

    if (cantidad >= 5) return total * 0.15;
    if (cantidad >= 3) return total * 0.10;
    if (total >= 500) return 50;
    return 0;
  }
  



}
