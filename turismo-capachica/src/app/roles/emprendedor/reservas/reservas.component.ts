import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Turista {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  pais?: string;
  avatar?: string;
}

interface Servicio {
  id: string;
  nombre: string;
  tipo: string;
}

interface Reserva {
  id: string;
  turista: Turista;
  servicio: Servicio;
  fechaReserva: Date;
  fechaServicio: Date;
  horaInicio: string;
  horaFin: string;
  numeroPersonas: number;
  precioTotal: number;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  comentarios?: string;
}

interface Estadisticas {
  pendientes: number;
  confirmadas: number;
  completadas: number;
  canceladas: number;
}

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class ReservasComponent implements OnInit {
   
  // Propiedades principales
  reservas: Reserva[] = [];
  reservasFiltradas: Reserva[] = [];
  serviciosDisponibles: Servicio[] = [];
  estadisticas: Estadisticas = {
    pendientes: 0,
    confirmadas: 0,
    completadas: 0,
    canceladas: 0
  };
  
  // Filtros
  filtroEstado: string = '';
  filtroFecha: string = '';
  filtroServicio: string = '';
  
  // Estados de la aplicación
  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  // Simular carga de datos desde API
  async cargarDatos(): Promise<void> {
    this.loading = true;
    
    try {
      // Simular delay de API
      await this.delay(1000);
      
      // Datos de ejemplo
      this.serviciosDisponibles = [
        { id: '1', nombre: 'Tour Machupicchu', tipo: 'tour' },
        { id: '2', nombre: 'Caminata Salkantay', tipo: 'aventura' },
        { id: '3', nombre: 'Tour Laguna Humantay', tipo: 'tour' },
        { id: '4', nombre: 'Rafting Urubamba', tipo: 'aventura' },
        { id: '5', nombre: 'City Tour Cusco', tipo: 'cultural' }
      ];

      this.reservas = [
        {
          id: 'RES001',
          turista: {
            id: 'TUR001',
            nombre: 'Carlos',
            apellido: 'Rodriguez',
            email: 'carlos.rodriguez@email.com',
            telefono: '+51 987654321',
            pais: 'Perú',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
          },
          servicio: this.serviciosDisponibles[0],
          fechaReserva: new Date('2024-06-15T10:30:00'),
          fechaServicio: new Date('2024-06-25'),
          horaInicio: '08:00',
          horaFin: '18:00',
          numeroPersonas: 2,
          precioTotal: 450,
          estado: 'pendiente',
          comentarios: 'Preferimos el tour en español'
        },
        {
          id: 'RES002',
          turista: {
            id: 'TUR002',
            nombre: 'María',
            apellido: 'González',
            email: 'maria.gonzalez@email.com',
            telefono: '+34 612345678',
            pais: 'España'
          },
          servicio: this.serviciosDisponibles[1],
          fechaReserva: new Date('2024-06-16T14:20:00'),
          fechaServicio: new Date('2024-06-28'),
          horaInicio: '06:00',
          horaFin: '17:00',
          numeroPersonas: 4,
          precioTotal: 800,
          estado: 'confirmada'
        },
        {
          id: 'RES003',
          turista: {
            id: 'TUR003',
            nombre: 'John',
            apellido: 'Smith',
            email: 'john.smith@email.com',
            telefono: '+1 555-0123',
            pais: 'Estados Unidos',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          },
          servicio: this.serviciosDisponibles[2],
          fechaReserva: new Date('2024-06-14T09:15:00'),
          fechaServicio: new Date('2024-06-22'),
          horaInicio: '07:30',
          horaFin: '16:30',
          numeroPersonas: 3,
          precioTotal: 375,
          estado: 'completada'
        },
        {
          id: 'RES004',
          turista: {
            id: 'TUR004',
            nombre: 'Ana',
            apellido: 'Silva',
            email: 'ana.silva@email.com',
            telefono: '+55 11 98765-4321',
            pais: 'Brasil'
          },
          servicio: this.serviciosDisponibles[3],
          fechaReserva: new Date('2024-06-17T16:45:00'),
          fechaServicio: new Date('2024-06-30'),
          horaInicio: '09:00',
          horaFin: '15:00',
          numeroPersonas: 2,
          precioTotal: 220,
          estado: 'cancelada',
          comentarios: 'Cancelado por condiciones climáticas'
        },
        {
          id: 'RES005',
          turista: {
            id: 'TUR005',
            nombre: 'Pierre',
            apellido: 'Dubois',
            email: 'pierre.dubois@email.com',
            telefono: '+33 1 23 45 67 89',
            pais: 'Francia',
            avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150'
          },
          servicio: this.serviciosDisponibles[4],
          fechaReserva: new Date('2024-06-18T11:30:00'),
          fechaServicio: new Date('2024-06-26'),
          horaInicio: '10:00',
          horaFin: '14:00',
          numeroPersonas: 1,
          precioTotal: 80,
          estado: 'confirmada'
        }
      ];

      this.reservasFiltradas = [...this.reservas];
      this.calcularEstadisticas();
      
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
    } finally {
      this.loading = false;
    }
  }

  // Calcular estadísticas
  calcularEstadisticas(): void {
    this.estadisticas = {
      pendientes: this.reservas.filter(r => r.estado === 'pendiente').length,
      confirmadas: this.reservas.filter(r => r.estado === 'confirmada').length,
      completadas: this.reservas.filter(r => r.estado === 'completada').length,
      canceladas: this.reservas.filter(r => r.estado === 'cancelada').length
    };
  }

  // Aplicar filtros
  aplicarFiltros(): void {
    this.reservasFiltradas = this.reservas.filter(reserva => {
      let cumpleEstado = true;
      let cumpleFecha = true;
      let cumpleServicio = true;

      // Filtro por estado
      if (this.filtroEstado) {
        cumpleEstado = reserva.estado === this.filtroEstado;
      }

      // Filtro por fecha
      if (this.filtroFecha) {
        const fechaFiltro = new Date(this.filtroFecha);
        const fechaServicio = new Date(reserva.fechaServicio);
        cumpleFecha = fechaServicio.toDateString() === fechaFiltro.toDateString();
      }

      // Filtro por servicio
      if (this.filtroServicio) {
        cumpleServicio = reserva.servicio.id === this.filtroServicio;
      }

      return cumpleEstado && cumpleFecha && cumpleServicio;
    });
  }

  // Limpiar filtros
  limpiarFiltros(): void {
    this.filtroEstado = '';
    this.filtroFecha = '';
    this.filtroServicio = '';
    this.reservasFiltradas = [...this.reservas];
  }

  // Confirmar reserva
  async confirmarReserva(reservaId: string): Promise<void> {
    try {
      const reserva = this.reservas.find(r => r.id === reservaId);
      if (reserva) {
        reserva.estado = 'confirmada';
        this.calcularEstadisticas();
        this.aplicarFiltros();
        
        // Simular API call
        console.log(`Reserva ${reservaId} confirmada`);
        
        // Aquí enviarías una notificación al turista
        await this.enviarNotificacion(reserva.turista.email, 'confirmacion');
      }
    } catch (error) {
      console.error('Error al confirmar reserva:', error);
    }
  }

  // Completar reserva
  async completarReserva(reservaId: string): Promise<void> {
    try {
      const reserva = this.reservas.find(r => r.id === reservaId);
      if (reserva) {
        reserva.estado = 'completada';
        this.calcularEstadisticas();
        this.aplicarFiltros();
        
        console.log(`Reserva ${reservaId} completada`);
        
        // Solicitar calificación al turista
        await this.solicitarCalificacion(reserva.turista.email, reservaId);
      }
    } catch (error) {
      console.error('Error al completar reserva:', error);
    }
  }

  // Cancelar reserva
  async cancelarReserva(reservaId: string): Promise<void> {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      try {
        const reserva = this.reservas.find(r => r.id === reservaId);
        if (reserva) {
          reserva.estado = 'cancelada';
          this.calcularEstadisticas();
          this.aplicarFiltros();
          
          console.log(`Reserva ${reservaId} cancelada`);
          
          // Notificar al turista
          await this.enviarNotificacion(reserva.turista.email, 'cancelacion');
        }
      } catch (error) {
        console.error('Error al cancelar reserva:', error);
      }
    }
  }

  // Ver detalles
  verDetalles(reservaId: string): void {
    console.log(`Ver detalles de reserva ${reservaId}`);
    // Aquí podrías abrir un modal con más detalles o navegar a otra página
    // this.router.navigate(['/reservas', reservaId]);
  }

  // Contactar turista
  contactarTurista(turista: Turista): void {
    console.log(`Contactar a ${turista.nombre} ${turista.apellido}`);
    // Aquí podrías abrir un modal de chat o iniciar una conversación
    // this.chatService.iniciarConversacion(turista.id);
  }

  // Obtener texto del estado
  getEstadoTexto(estado: string): string {
    const estados = {
      'pendiente': 'Pendiente',
      'confirmada': 'Confirmada',
      'completada': 'Completada',
      'cancelada': 'Cancelada'
    };
    return estados[estado as keyof typeof estados] || estado;
  }

  // Enviar notificación (simulado)
  private async enviarNotificacion(email: string, tipo: string): Promise<void> {
    console.log(`Enviando notificación de ${tipo} a ${email}`);
    // Simular delay de envío
    await this.delay(500);
    
    // Aquí integrarías con tu servicio de notificaciones
    // await this.notificationService.enviar({
    //   email,
    //   tipo,
    //   template: `${tipo}_reserva`
    // });
  }

  // Solicitar calificación (simulado)
  private async solicitarCalificacion(email: string, reservaId: string): Promise<void> {
    console.log(`Solicitando calificación para reserva ${reservaId} a ${email}`);
    await this.delay(300);
    
    // Aquí enviarías un email con el link para calificar
    // await this.emailService.enviarSolicitudCalificacion({
    //   email,
    //   reservaId,
    //   enlaceCalificacion: `${this.baseUrl}/calificar/${reservaId}`
    // });
  }

  // Helper para simular delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Exportar reservas (opcional)
  exportarReservas(): void {
    const datos = this.reservasFiltradas.map(reserva => ({
      ID: reserva.id,
      'Nombre Turista': `${reserva.turista.nombre} ${reserva.turista.apellido}`,
      'Email': reserva.turista.email,
      'Servicio': reserva.servicio.nombre,
      'Fecha Servicio': reserva.fechaServicio.toLocaleDateString(),
      'Hora': `${reserva.horaInicio} - ${reserva.horaFin}`,
      'Personas': reserva.numeroPersonas,
      'Precio Total': reserva.precioTotal,
      'Estado': this.getEstadoTexto(reserva.estado),
      'Fecha Reserva': reserva.fechaReserva.toLocaleDateString()
    }));

    // Convertir a CSV
    const csv = this.convertirACSV(datos);
    this.descargarCSV(csv, 'reservas.csv');
  }

  // Convertir datos a CSV
  private convertirACSV(datos: any[]): string {
    if (datos.length === 0) return '';
    
    const headers = Object.keys(datos[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = datos.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escapar valores que contienen comas o comillas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  }

  // Descargar archivo CSV
  private descargarCSV(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Filtrar por rango de fechas
  filtrarPorRangoFechas(fechaInicio: string, fechaFin: string): void {
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      
      this.reservasFiltradas = this.reservas.filter(reserva => {
        const fechaServicio = new Date(reserva.fechaServicio);
        return fechaServicio >= inicio && fechaServicio <= fin;
      });
    }
  }

  // Buscar por texto
  buscarTexto(texto: string): void {
    if (!texto.trim()) {
      this.aplicarFiltros();
      return;
    }

    const terminoBusqueda = texto.toLowerCase();
    
    this.reservasFiltradas = this.reservas.filter(reserva => {
      return (
        reserva.id.toLowerCase().includes(terminoBusqueda) ||
        reserva.turista.nombre.toLowerCase().includes(terminoBusqueda) ||
        reserva.turista.apellido.toLowerCase().includes(terminoBusqueda) ||
        reserva.turista.email.toLowerCase().includes(terminoBusqueda) ||
        reserva.servicio.nombre.toLowerCase().includes(terminoBusqueda) ||
        (reserva.comentarios && reserva.comentarios.toLowerCase().includes(terminoBusqueda))
      );
    });
  }

  // Obtener resumen financiero
  getResumenFinanciero() {
    const confirmadas = this.reservas.filter(r => r.estado === 'confirmada');
    const completadas = this.reservas.filter(r => r.estado === 'completada');
    
    return {
      ingresosPendientes: confirmadas.reduce((sum, r) => sum + r.precioTotal, 0),
      ingresosCompletados: completadas.reduce((sum, r) => sum + r.precioTotal, 0),
      totalReservas: confirmadas.length + completadas.length
    };
  }

  // Obtener próximas reservas (hoy y mañana)
  getProximasReservas(): Reserva[] {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);
    
    return this.reservas.filter(reserva => {
      if (reserva.estado !== 'confirmada') return false;
      
      const fechaServicio = new Date(reserva.fechaServicio);
      return fechaServicio.toDateString() === hoy.toDateString() || 
             fechaServicio.toDateString() === manana.toDateString();
    }).sort((a, b) => new Date(a.fechaServicio).getTime() - new Date(b.fechaServicio).getTime());
  }

  // Marcar como no show (no se presentó)
  async marcarNoShow(reservaId: string): Promise<void> {
    if (confirm('¿Confirmas que el turista no se presentó al servicio?')) {
      try {
        const reserva = this.reservas.find(r => r.id === reservaId);
        if (reserva) {
          reserva.estado = 'cancelada';
          reserva.comentarios = (reserva.comentarios || '') + ' [NO SHOW - Cliente no se presentó]';
          
          this.calcularEstadisticas();
          this.aplicarFiltros();
          
          console.log(`Reserva ${reservaId} marcada como No Show`);
          
          // Aquí implementarías la lógica de penalización o políticas de cancelación
          // await this.aplicarPoliticaNoShow(reserva);
        }
      } catch (error) {
        console.error('Error al marcar como No Show:', error);
      }
    }
  }

  // Reactivar reserva cancelada
  async reactivarReserva(reservaId: string): Promise<void> {
    if (confirm('¿Deseas reactivar esta reserva?')) {
      try {
        const reserva = this.reservas.find(r => r.id === reservaId);
        if (reserva && reserva.estado === 'cancelada') {
          reserva.estado = 'pendiente';
          
          this.calcularEstadisticas();
          this.aplicarFiltros();
          
          console.log(`Reserva ${reservaId} reactivada`);
          
          await this.enviarNotificacion(reserva.turista.email, 'reactivacion');
        }
      } catch (error) {
        console.error('Error al reactivar reserva:', error);
      }
    }
  }
}
