import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Evento {
  id: string;
  titulo: string;
  tipo: 'reserva' | 'disponibilidad' | 'bloqueado' | 'evento';
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  cliente?: string;
  telefono?: string;
  personas?: number;
  descripcion?: string;
  estado: 'confirmado' | 'pendiente' | 'cancelado';
}

interface DiaCalendario {
  fecha: Date;
  numero: number;
  esOtroMes: boolean;
  esHoy: boolean;
  esSeleccionado: boolean;
}

interface DiaSemana {
  fecha: Date;
  nombre: string;
  numero: number;
}

interface Vista {
  key: 'mes' | 'semana' | 'dia';
  label: string;
  icon: string;
}

interface Filtros {
  reserva: boolean;
  disponibilidad: boolean;
  bloqueado: boolean;
  evento: boolean;
}


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  
  
  // Propiedades principales
  fechaActual: Date = new Date();
  fechaSeleccionada: Date = new Date();
  mesActual: Date = new Date();
  vistaActual: 'mes' | 'semana' | 'dia' = 'mes';
  loading: boolean = false;

  // Configuración de vistas
  vistas: Vista[] = [
    { key: 'mes', label: 'Mes', icon: 'fas fa-calendar' },
    { key: 'semana', label: 'Semana', icon: 'fas fa-calendar-week' },
    { key: 'dia', label: 'Día', icon: 'fas fa-calendar-day' }
  ];

  // Días de la semana
  diasSemana: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  // Horas del día para vista semanal y diaria
  horasDelDia: string[] = [];

  // Arrays para las diferentes vistas
  diasMes: DiaCalendario[] = [];
  diasSemanaActual: DiaSemana[] = [];
  
  // Fechas calculadas
  inicioSemana: Date = new Date();
  finSemana: Date = new Date();

  // Eventos y filtros
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  eventosHoy: Evento[] = [];
  proximosEventos: Evento[] = [];
  proximasReservas: Evento[] = [];

  filtros: Filtros = {
  reserva: true,
  disponibilidad: true,
  bloqueado: true,
  evento: true
};


  // Modal y formulario
  mostrarModalEvento: boolean = false;
  mostrarModalDetalle: boolean = false;
  eventoEditando: Evento | null = null;
  eventoSeleccionado: Evento | null = null;
  
  nuevoEvento: Partial<Evento> = {
    titulo: '',
    tipo: 'reserva',
    fecha: new Date(),
    horaInicio: '09:00',
    horaFin: '10:00',
    estado: 'pendiente'
  };

  constructor() {
    this.inicializarHoras();
  }

  ngOnInit(): void {
    this.cargarEventos();
    this.actualizarCalendario();
    this.calcularEventosHoy();
    this.calcularProximosEventos();
  }

  // Inicialización
  private inicializarHoras(): void {
    for (let i = 0; i < 24; i++) {
      const hora = i.toString().padStart(2, '0') + ':00';
      this.horasDelDia.push(hora);
    }
  }

  private cargarEventos(): void {
    this.loading = true;
    
    // Simulación de datos - aquí conectarías con tu servicio
    setTimeout(() => {
      this.eventos = this.generarEventosEjemplo();
      this.aplicarFiltros();
      this.loading = false;
    }, 1000);
  }

  private generarEventosEjemplo(): Evento[] {
    const eventos: Evento[] = [];
    const hoy = new Date();
    
    // Generar eventos de ejemplo
    for (let i = 0; i < 20; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + (i - 10));
      
      eventos.push({
        id: `evento-${i}`,
        titulo: `Evento ${i + 1}`,
        tipo: ['reserva', 'disponibilidad', 'bloqueado', 'evento'][Math.floor(Math.random() * 4)] as any,
        fecha: fecha,
        horaInicio: `${9 + Math.floor(Math.random() * 8)}:00`,
        horaFin: `${10 + Math.floor(Math.random() * 8)}:00`,
        cliente: i % 3 === 0 ? `Cliente ${i + 1}` : undefined,
        telefono: i % 3 === 0 ? `123-456-78${i % 10}${(i + 1) % 10}` : undefined,
        personas: i % 3 === 0 ? Math.floor(Math.random() * 6) + 1 : undefined,
        descripcion: `Descripción del evento ${i + 1}`,
        estado: ['confirmado', 'pendiente', 'cancelado'][Math.floor(Math.random() * 3)] as any
      });
    }
    
    return eventos;
  }

  // Navegación y vistas
  cambiarVista(vista: 'mes' | 'semana' | 'dia'): void {
    this.vistaActual = vista;
    this.actualizarCalendario();
  }

  navegarFecha(direccion: number): void {
    const fecha = new Date(this.fechaSeleccionada);
    
    switch (this.vistaActual) {
      case 'mes':
        fecha.setMonth(fecha.getMonth() + direccion);
        break;
      case 'semana':
        fecha.setDate(fecha.getDate() + (direccion * 7));
        break;
      case 'dia':
        fecha.setDate(fecha.getDate() + direccion);
        break;
    }
    
    this.fechaSeleccionada = fecha;
    this.mesActual = new Date(fecha);
    this.actualizarCalendario();
  }

  irAHoy(): void {
    this.fechaActual = new Date();
    this.fechaSeleccionada = new Date();
    this.mesActual = new Date();
    this.actualizarCalendario();
  }

  seleccionarDia(fecha: Date): void {
    this.fechaSeleccionada = new Date(fecha);
    if (this.vistaActual === 'mes') {
      this.vistaActual = 'dia';
    }
    this.actualizarCalendario();
  }

  // Actualización del calendario
  private actualizarCalendario(): void {
    switch (this.vistaActual) {
      case 'mes':
        this.generarDiasMes();
        break;
      case 'semana':
        this.generarDiasSemana();
        break;
      case 'dia':
        // No necesita generación especial
        break;
    }
    
    this.calcularEventosHoy();
    this.calcularProximosEventos();
  }

  private generarDiasMes(): void {
    const inicio = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth(), 1);
    const fin = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth() + 1, 0);
    
    // Ajustar al inicio de la semana
    const primerDia = new Date(inicio);
    primerDia.setDate(primerDia.getDate() - (primerDia.getDay() || 7) + 1);
    
    this.diasMes = [];
    const fechaIteracion = new Date(primerDia);
    
    // Generar 42 días (6 semanas)
    for (let i = 0; i < 42; i++) {
      this.diasMes.push({
        fecha: new Date(fechaIteracion),
        numero: fechaIteracion.getDate(),
        esOtroMes: fechaIteracion.getMonth() !== this.mesActual.getMonth(),
        esHoy: this.esMismaFecha(fechaIteracion, this.fechaActual),
        esSeleccionado: this.esMismaFecha(fechaIteracion, this.fechaSeleccionada)
      });
      
      fechaIteracion.setDate(fechaIteracion.getDate() + 1);
    }
  }

  private generarDiasSemana(): void {
    const inicioSemana = new Date(this.fechaSeleccionada);
    inicioSemana.setDate(inicioSemana.getDate() - (inicioSemana.getDay() || 7) + 1);
    
    this.inicioSemana = new Date(inicioSemana);
    this.finSemana = new Date(inicioSemana);
    this.finSemana.setDate(this.finSemana.getDate() + 6);
    
    this.diasSemanaActual = [];
    const fechaIteracion = new Date(inicioSemana);
    
    for (let i = 0; i < 7; i++) {
      this.diasSemanaActual.push({
        fecha: new Date(fechaIteracion),
        nombre: this.diasSemana[i],
        numero: fechaIteracion.getDate()
      });
      
      fechaIteracion.setDate(fechaIteracion.getDate() + 1);
    }
  }

  // Eventos y filtros
aplicarFiltros(): void {
  this.eventosFiltrados = this.eventos.filter(evento =>
    this.filtros[evento.tipo]
  );
  this.calcularEventosHoy();
  this.calcularProximosEventos();
}


  private calcularEventosHoy(): void {
    this.eventosHoy = this.eventosFiltrados.filter(evento =>
      this.esMismaFecha(evento.fecha, this.fechaActual)
    );
  }

  private calcularProximosEventos(): void {
    const ahora = new Date();
    this.proximosEventos = this.eventosFiltrados
      .filter(evento => evento.fecha >= ahora)
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    
    this.proximasReservas = this.proximosEventos
      .filter(evento => evento.tipo === 'reserva')
      .slice(0, 5);
  }

  getEventosDia(fecha: Date): Evento[] {
    return this.eventosFiltrados.filter(evento =>
      this.esMismaFecha(evento.fecha, fecha)
    );
  }

  // Utilidades de fecha
  private esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    return fecha1.getDate() === fecha2.getDate() &&
           fecha1.getMonth() === fecha2.getMonth() &&
           fecha1.getFullYear() === fecha2.getFullYear();
  }

  esHoy(fecha: Date): boolean {
    return this.esMismaFecha(fecha, this.fechaActual);
  }

  esDiaSeleccionado(fecha: Date): boolean {
    return this.esMismaFecha(fecha, this.fechaSeleccionada);
  }

  // Clases CSS dinámicas
  getDiaClasses(dia: DiaCalendario): string {
    let clases = '';
    if (dia.esOtroMes) clases += 'otro-mes ';
    if (dia.esHoy) clases += 'hoy ';
    if (dia.esSeleccionado) clases += 'seleccionado ';
    return clases.trim();
  }

  // Posicionamiento de eventos
  getEventoTop(horaInicio: string): number {
    const [hora, minuto] = horaInicio.split(':').map(Number);
    return (hora * 60 + minuto) * 1; // 1px por minuto
  }

  getEventoHeight(horaInicio: string, horaFin: string): number {
    const [horaIni, minutoIni] = horaInicio.split(':').map(Number);
    const [horaFinal, minutoFinal] = horaFin.split(':').map(Number);
    
    const minutosInicio = horaIni * 60 + minutoIni;
    const minutosFin = horaFinal * 60 + minutoFinal;
    
    return Math.max((minutosFin - minutosInicio) * 1, 30); // Mínimo 30px
  }

  // Modal y formulario
  abrirModalNuevoEvento(): void {
    this.nuevoEvento = {
      titulo: '',
      tipo: 'reserva',
      fecha: new Date(this.fechaSeleccionada),
      horaInicio: '09:00',
      horaFin: '10:00',
      estado: 'pendiente'
    };
    this.eventoEditando = null;
    this.mostrarModalEvento = true;
  }

  verEvento(evento: Evento, event: Event): void {
    event.stopPropagation();
    this.eventoSeleccionado = evento;
    this.mostrarModalDetalle = true;
  }

  editarEvento(evento: Evento): void {
    this.nuevoEvento = { ...evento };
    this.eventoEditando = evento;
    this.mostrarModalDetalle = false;
    this.mostrarModalEvento = true;
  }

  guardarEvento(): void {
    if (this.validarEvento()) {
      if (this.eventoEditando) {
        // Actualizar evento existente
        const indice = this.eventos.findIndex(e => e.id === this.eventoEditando!.id);
        if (indice !== -1) {
          this.eventos[indice] = { ...this.nuevoEvento as Evento, id: this.eventoEditando.id };
        }
      } else {
        // Crear nuevo evento
        const nuevoEvento: Evento = {
          ...this.nuevoEvento as Evento,
          id: this.generarId()
        };
        this.eventos.push(nuevoEvento);
      }
      
      this.aplicarFiltros();
      this.cerrarModal();
    }
  }

  eliminarEvento(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      this.eventos = this.eventos.filter(e => e.id !== id);
      this.aplicarFiltros();
      this.cerrarModalDetalle();
    }
  }

  private validarEvento(): boolean {
    if (!this.nuevoEvento.titulo || !this.nuevoEvento.fecha || 
        !this.nuevoEvento.horaInicio || !this.nuevoEvento.horaFin) {
      alert('Por favor completa todos los campos obligatorios');
      return false;
    }
    
    if (this.nuevoEvento.horaInicio >= this.nuevoEvento.horaFin) {
      alert('La hora de fin debe ser posterior a la hora de inicio');
      return false;
    }
    
    return true;
  }

  private generarId(): string {
    return 'evento-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  cerrarModal(): void {
    this.mostrarModalEvento = false;
    this.eventoEditando = null;
  }

  cerrarModalDetalle(): void {
    this.mostrarModalDetalle = false;
    this.eventoSeleccionado = null;
  }

  // Utilidades
  getEstadoTexto(estado: string): string {
    const estados: { [key: string]: string } = {
      'confirmado': 'Confirmado',
      'pendiente': 'Pendiente',
      'cancelado': 'Cancelado'
    };
    return estados[estado] || estado;
  }
}