import { describe, it, expect } from 'vitest';
import { construirValoresIniciales } from '../contratos.js';

const contratoEntrega = {
  entidad: 'entrega',
  secciones: [
    {
      id: 'cliente',
      titulo: 'Cliente',
      campos: [
        { clave: 'nombre_cliente', entrada: 'text', valor_inicial: '' },
        { clave: 'horario', entrada: 'select', valor_inicial: 'INDIFERENTE' },
      ],
    },
  ],
  campos_ocultos: [
    { clave: 'fuente', entrada: 'hidden', valor_inicial: 'local' },
  ],
};

describe('construirValoresIniciales', () => {
  it('toma valor_inicial de cada campo cuando no hay valores actuales', () => {
    const valores = construirValoresIniciales(contratoEntrega);

    expect(valores).toEqual({
      fuente: 'local',
      nombre_cliente: '',
      horario: 'INDIFERENTE',
    });
  });

  it('da prioridad a los valores actuales sobre los iniciales del contrato', () => {
    const valores = construirValoresIniciales(contratoEntrega, {
      nombre_cliente: 'Pepita',
      horario: 'TARDE',
    });

    expect(valores.nombre_cliente).toBe('Pepita');
    expect(valores.horario).toBe('TARDE');
    expect(valores.fuente).toBe('local');
  });

  it('incluye campos ocultos en el resultado', () => {
    const valores = construirValoresIniciales(contratoEntrega);
    expect(Object.keys(valores)).toContain('fuente');
  });

  it('devuelve un objeto vacio si no hay contrato', () => {
    expect(construirValoresIniciales(null)).toEqual({});
    expect(construirValoresIniciales(undefined)).toEqual({});
  });
});
