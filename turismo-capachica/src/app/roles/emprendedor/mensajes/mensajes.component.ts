import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Turista {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  estado: 'online' | 'ausente' | 'offline';
  ubicacion: string;
  esTurista: boolean;
  idioma: string;
  tiempoVisita: string;
  fechaLlegada: Date;
  fechaSalida: Date;
  numeroPersonas: number;
  intereses: string[];
  presupuesto?: string;
}

interface Mensaje {
  id: string;
  contenido: string;
  tipo: 'texto' | 'imagen' | 'ubicacion' | 'documento';
  fecha: Date;
  esPropio: boolean;
  leido: boolean;
  descripcion?: string;
}

interface Conversacion {
  id: string;
  turista: Turista;
  ultimoMensaje: Mensaje;
  mensajesSinLeer: number;
  fechaCreacion: Date;
}

interface MedioCompartido {
  id: string;
  nombre: string;
  tipo: 'imagen' | 'documento' | 'video';
  url: string;
  thumbnail: string;
  fecha: Date;
}

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit, AfterViewChecked {
  @ViewChild('mensajesContainer') mensajesContainer!: ElementRef;

  // Propiedades del componente
  busquedaTurista: string = '';
  filtroActivo: 'todos' | 'activos' | 'sin_leer' = 'todos';
  turistasEncontrados: Turista[] = [];
  conversaciones: Conversacion[] = [];
  conversacionActiva: Conversacion | null = null;
  mensajesConversacion: Mensaje[] = [];
  nuevoMensaje: string = '';
  usuarioEscribiendo: boolean = false;
  mostrarInfoPanel: boolean = false;
  mostrarModalArchivos: boolean = false;
  mediosCompartidos: MedioCompartido[] = [];

  // Variables para control de scroll y escritura
  private scrollTimeout: any;
  private escribiendoTimeout: any;
  private shouldScrollToBottom: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.cargarConversaciones();
    this.cargarMediosCompartidos();
    this.inicializarDatosMock();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  // Métodos de búsqueda y filtrado
  buscarTuristas(): void {
    if (this.busquedaTurista.trim()) {
      // Simular búsqueda de turistas
      this.turistasEncontrados = this.obtenerTuristasMock().filter(turista =>
        turista.nombre.toLowerCase().includes(this.busquedaTurista.toLowerCase()) ||
        turista.ubicacion.toLowerCase().includes(this.busquedaTurista.toLowerCase()) ||
        turista.idioma.toLowerCase().includes(this.busquedaTurista.toLowerCase())
      );
    } else {
      this.turistasEncontrados = [];
    }
  }

  cambiarFiltro(filtro: 'todos' | 'activos' | 'sin_leer'): void {
    this.filtroActivo = filtro;
  }

  get conversacionesFiltradas(): Conversacion[] {
    let conversaciones = this.conversaciones;

    switch (this.filtroActivo) {
      case 'activos':
        return conversaciones.filter(c => c.turista.estado === 'online');
      case 'sin_leer':
        return conversaciones.filter(c => c.mensajesSinLeer > 0);
      default:
        return conversaciones;
    }
  }

  // Métodos de conversación
  iniciarConversacion(turista: Turista): void {
    // Verificar si ya existe una conversación con este turista
    let conversacion = this.conversaciones.find(c => c.turista.id === turista.id);
    
    if (!conversacion) {
      // Crear nueva conversación
      conversacion = {
        id: this.generarId(),
        turista: turista,
        ultimoMensaje: {
          id: this.generarId(),
          contenido: 'Conversación iniciada',
          tipo: 'texto',
          fecha: new Date(),
          esPropio: false,
          leido: false
        },
        mensajesSinLeer: 0,
        fechaCreacion: new Date()
      };
      
      this.conversaciones.unshift(conversacion);
    }
    
    this.seleccionarConversacion(conversacion);
    this.busquedaTurista = '';
    this.turistasEncontrados = [];
  }

  seleccionarConversacion(conversacion: Conversacion): void {
    this.conversacionActiva = conversacion;
    this.cargarMensajesConversacion(conversacion.id);
    this.marcarComoLeido(conversacion);
    this.shouldScrollToBottom = true;
  }

  marcarComoLeido(conversacion: Conversacion): void {
    conversacion.mensajesSinLeer = 0;
    // Marcar todos los mensajes como leídos
    this.mensajesConversacion.forEach(mensaje => {
      if (!mensaje.esPropio) {
        mensaje.leido = true;
      }
    });
  }

  // Métodos de mensajes
  enviarMensaje(): void {
    if (!this.nuevoMensaje.trim() || !this.conversacionActiva) return;

    const mensaje: Mensaje = {
      id: this.generarId(),
      contenido: this.nuevoMensaje.trim(),
      tipo: 'texto',
      fecha: new Date(),
      esPropio: true,
      leido: false
    };

    this.mensajesConversacion.push(mensaje);
    this.actualizarUltimoMensaje(mensaje);
    this.nuevoMensaje = '';
    this.shouldScrollToBottom = true;

    // Simular respuesta del turista después de un delay
    setTimeout(() => {
      this.simularRespuestaTurista();
    }, 2000);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviarMensaje();
    }
  }

  onUsuarioEscribiendo(): void {
    // Simular que el usuario está escribiendo
    if (this.escribiendoTimeout) {
      clearTimeout(this.escribiendoTimeout);
    }
    
    this.escribiendoTimeout = setTimeout(() => {
      // Lógica para notificar que el usuario dejó de escribir
    }, 1000);
  }

  private simularRespuestaTurista(): void {
    if (!this.conversacionActiva) return;

    this.usuarioEscribiendo = true;

    setTimeout(() => {
      const respuestas = [
        '¡Hola! Gracias por contactarme.',
        'Estoy muy interesado en conocer más sobre los tours.',
        '¿Podrías contarme más detalles?',
        'Me parece perfecto, ¿cuándo podemos programar la visita?',
        'Estoy emocionado por explorar la zona.'
      ];

      const mensaje: Mensaje = {
        id: this.generarId(),
        contenido: respuestas[Math.floor(Math.random() * respuestas.length)],
        tipo: 'texto',
        fecha: new Date(),
        esPropio: false,
        leido: false
      };

      this.mensajesConversacion.push(mensaje);
      this.actualizarUltimoMensaje(mensaje);
      this.usuarioEscribiendo = false;
      this.shouldScrollToBottom = true;

      // Incrementar mensajes sin leer si la conversación no está activa
      if (this.conversacionActiva) {
        this.conversacionActiva.mensajesSinLeer++;
      }
    }, 3000);
  }

  private actualizarUltimoMensaje(mensaje: Mensaje): void {
    if (this.conversacionActiva) {
      this.conversacionActiva.ultimoMensaje = mensaje;
      
      // Mover la conversación al inicio de la lista
      const index = this.conversaciones.findIndex(c => c.id === this.conversacionActiva!.id);
      if (index > 0) {
        const conversacion = this.conversaciones.splice(index, 1)[0];
        this.conversaciones.unshift(conversacion);
      }
    }
  }

  // Métodos de archivos y multimedia
  adjuntarArchivo(): void {
    this.mostrarModalArchivos = true;
  }

  cerrarModalArchivos(): void {
    this.mostrarModalArchivos = false;
  }

  seleccionarImagen(): void {
    // Lógica para seleccionar imagen
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.procesarArchivo(file, 'imagen');
      }
    };
    input.click();
    this.cerrarModalArchivos();
  }

  seleccionarDocumento(): void {
    // Lógica para seleccionar documento
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.procesarArchivo(file, 'documento');
      }
    };
    input.click();
    this.cerrarModalArchivos();
  }

  tomarFoto(): void {
    // Lógica para tomar foto con la cámara
    console.log('Tomar foto');
    this.cerrarModalArchivos();
  }

  private procesarArchivo(file: File, tipo: 'imagen' | 'documento'): void {
    // Simular procesamiento de archivo
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const mensaje: Mensaje = {
        id: this.generarId(),
        contenido: e.target.result,
        tipo: tipo,
        fecha: new Date(),
        esPropio: true,
        leido: false,
        descripcion: file.name
      };

      this.mensajesConversacion.push(mensaje);
      this.actualizarUltimoMensaje(mensaje);
      this.shouldScrollToBottom = true;
    };
    reader.readAsDataURL(file);
  }

  enviarUbicacion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const mensaje: Mensaje = {
          id: this.generarId(),
          contenido: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`,
          tipo: 'ubicacion',
          fecha: new Date(),
          esPropio: true,
          leido: false
        };

        this.mensajesConversacion.push(mensaje);
        this.actualizarUltimoMensaje(mensaje);
        this.shouldScrollToBottom = true;
      });
    }
  }

  abrirEmojis(): void {
    // Lógica para abrir selector de emojis
    console.log('Abrir selector de emojis');
  }

  // Métodos del panel de información
  toggleInfoPanel(): void {
    this.mostrarInfoPanel = !this.mostrarInfoPanel;
  }

  // Métodos utilitarios
  getEstadoTexto(estado: string): string {
    switch (estado) {
      case 'online':
        return 'En línea';
      case 'ausente':
        return 'Ausente';
      default:
        return 'Desconectado';
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.mensajesContainer) {
        const element = this.mensajesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }

  private generarId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Métodos para cargar datos
  private cargarConversaciones(): void {
    // Simular carga de conversaciones desde un servicio
    this.conversaciones = this.obtenerConversacionesMock();
  }

  private cargarMensajesConversacion(conversacionId: string): void {
    // Simular carga de mensajes desde un servicio
    this.mensajesConversacion = this.obtenerMensajesMock(conversacionId);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  private cargarMediosCompartidos(): void {
    // Simular carga de medios compartidos
    this.mediosCompartidos = this.obtenerMediosCompartidosMock();
  }

  // Datos mock para desarrollo
  private inicializarDatosMock(): void {
    // Inicializar datos de prueba
  }

  private obtenerTuristasMock(): Turista[] {
    return [
      {
        id: '1',
        nombre: 'John Smith',
        email: 'john@example.com',
        avatar: '/assets/avatars/john.jpg',
        estado: 'online',
        ubicacion: 'Plaza de Armas, Cusco',
        esTurista: true,
        idioma: 'English',
        tiempoVisita: '5 días',
        fechaLlegada: new Date('2024-06-15'),
        fechaSalida: new Date('2024-06-20'),
        numeroPersonas: 2,
        intereses: ['Cultura', 'Historia', 'Fotografía'],
        presupuesto: '$500 - $1000'
      },
      {
        id: '2',
        nombre: 'Marie Dubois',
        email: 'marie@example.com',
        avatar: '/assets/avatars/marie.jpg',
        estado: 'ausente',
        ubicacion: 'Machu Picchu',
        esTurista: true,
        idioma: 'Français',
        tiempoVisita: '3 días',
        fechaLlegada: new Date('2024-06-18'),
        fechaSalida: new Date('2024-06-21'),
        numeroPersonas: 1,
        intereses: ['Aventura', 'Naturaleza'],
        presupuesto: '$300 - $600'
      }
    ];
  }

  private obtenerConversacionesMock(): Conversacion[] {
    const turistas = this.obtenerTuristasMock();
    return [
      {
        id: 'conv1',
        turista: turistas[0],
        ultimoMensaje: {
          id: 'msg1',
          contenido: 'Hola, me interesa conocer más sobre los tours a Machu Picchu',
          tipo: 'texto',
          fecha: new Date(Date.now() - 300000),
          esPropio: false,
          leido: false
        },
        mensajesSinLeer: 2,
        fechaCreacion: new Date(Date.now() - 3600000)
      },
      {
        id: 'conv2',
        turista: turistas[1],
        ultimoMensaje: {
          id: 'msg2',
          contenido: 'Merci beaucoup pour l\'information!',
          tipo: 'texto',
          fecha: new Date(Date.now() - 600000),
          esPropio: false,
          leido: true
        },
        mensajesSinLeer: 0,
        fechaCreacion: new Date(Date.now() - 7200000)
      }
    ];
  }

  private obtenerMensajesMock(conversacionId: string): Mensaje[] {
    return [
      {
        id: 'msg1',
        contenido: 'Hola, me interesa conocer más sobre los tours a Machu Picchu',
        tipo: 'texto',
        fecha: new Date(Date.now() - 1800000),
        esPropio: false,
        leido: true
      },
      {
        id: 'msg2',
        contenido: '¡Hola! Estaré encantado de ayudarte. Tenemos varios tours disponibles.',
        tipo: 'texto',
        fecha: new Date(Date.now() - 1500000),
        esPropio: true,
        leido: true
      },
      {
        id: 'msg3',
        contenido: '¿Podrías contarme más sobre los precios y horarios?',
        tipo: 'texto',
        fecha: new Date(Date.now() - 300000),
        esPropio: false,
        leido: false
      }
    ];
  }

  private obtenerMediosCompartidosMock(): MedioCompartido[] {
    return [
      {
        id: 'media1',
        nombre: 'machu-picchu-1.jpg',
        tipo: 'imagen',
        url: '/assets/images/machu-picchu-1.jpg',
        thumbnail: '/assets/images/thumbs/machu-picchu-1.jpg',
        fecha: new Date(Date.now() - 86400000)
      },
      {
        id: 'media2',
        nombre: 'cusco-tour.jpg',
        tipo: 'imagen',
        url: '/assets/images/cusco-tour.jpg',
        thumbnail: '/assets/images/thumbs/cusco-tour.jpg',
        fecha: new Date(Date.now() - 172800000)
      }
    ];
  }
}