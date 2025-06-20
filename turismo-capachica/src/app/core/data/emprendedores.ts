export const EMPRENDEDORES = [
  {
    id: '1',
    nombre: 'María Quispe',
    descripcion: 'Emprendedora en turismo vivencial con hospedaje, talleres y experiencias culturales.',
    foto: 'https://images.unsplash.com/photo-1618773928121-c95f1f05aa86',
    categoria: 'Turismo Vivencial',
    galeria: [
      'https://images.unsplash.com/photo-1579445612380-9189e1675c55',
      'https://images.unsplash.com/photo-1597002355470-76b1c8ad893e'
    ],
    servicios: [
      {
        id: 's1',
        nombre: 'Hospedaje rural tradicional',
        descripcion: 'Incluye desayuno típico, cama cómoda y fogata nocturna con música andina.',
        imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e17b',
        precio: 40,
        categoria: 'Hospedaje',
        duracion: '1 noche',
        cupos: 5,
        tipo: 'servicio'
      },
      {
        id: 's2',
        nombre: 'Taller de tejido artesanal',
        descripcion: 'Aprende técnicas ancestrales de tejido con mujeres locales.',
        imagen: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
        precio: 25,
        categoria: 'Taller',
        duracion: '2 horas',
        cupos: 10,
        tipo: 'servicio'
      }
    ],
    paquetes: [
      {
        id: 'p1',
        nombre: 'Paquete Vivencial 2 días',
        descripcion: 'Incluye hospedaje, taller, alimentación típica y paseo en bote de totora.',
        incluye: [
          '1 noche de hospedaje',
          'Taller de tejido artesanal',
          'Cena típica andina',
          'Paseo en bote de totora'
        ],
        imagen: 'https://images.unsplash.com/photo-1617201651551-44118a9f101d',
        galeria: [
          'https://images.unsplash.com/photo-1561037404-61c107b22281',
          'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
          'https://images.unsplash.com/photo-1509838174234-8e883a3b107d'
        ],
        itinerario: [
          { hora: '08:30', actividad: 'Bienvenida con danzas tradicionales' },
          { hora: '10:00', actividad: 'Taller de tejido con artesanas' },
          { hora: '13:00', actividad: 'Almuerzo típico' },
          { hora: '15:00', actividad: 'Paseo en bote de totora' },
          { hora: '19:00', actividad: 'Cena comunitaria con fogata' }
        ],
        resenas: [
          {
            usuario: 'Lucía G.',
            fecha: new Date('2025-04-12'),
            calificacion: 5,
            comentario: 'Una experiencia maravillosa. Las actividades y el trato fueron excelentes.'
          },
          {
            usuario: 'Roberto H.',
            fecha: new Date('2025-05-05'),
            calificacion: 4,
            comentario: 'Muy recomendado para quienes buscan autenticidad y contacto humano.'
          }
        ],
        precio: 120,
        duracion: '2 días',
        maxPersonas: 8,
        tipo: 'paquete'
      }
    ]
  }
]; 
