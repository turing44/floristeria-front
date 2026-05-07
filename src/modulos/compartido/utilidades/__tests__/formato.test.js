import { describe, it, expect } from 'vitest';
import { formatearFecha, formatearMoneda, obtenerFechaHoy } from '../formato.js';

describe('formato', () => {
  describe('formatearFecha', () => {
    it('formatea una fecha ISO en formato es-ES', () => {
      expect(formatearFecha('2026-03-15')).toBe('15/3/2026');
    });

    it('devuelve la cadena original si la fecha no es valida', () => {
      expect(formatearFecha('no-valida')).toBe('no-valida');
    });

    it('devuelve cadena vacia cuando no se pasa fecha', () => {
      expect(formatearFecha(undefined)).toBe('');
    });
  });

  describe('formatearMoneda', () => {
    it('aplica dos decimales y simbolo euro', () => {
      expect(formatearMoneda(35.5)).toBe('35.50 €');
      expect(formatearMoneda('60')).toBe('60.00 €');
    });

    it('trata null o undefined como cero', () => {
      expect(formatearMoneda(null)).toBe('0.00 €');
      expect(formatearMoneda(undefined)).toBe('0.00 €');
    });
  });

  describe('obtenerFechaHoy', () => {
    it('devuelve fecha en formato YYYY-MM-DD', () => {
      const hoy = obtenerFechaHoy();
      expect(hoy).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
