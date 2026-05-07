import { describe, it, expect } from 'vitest';
import { escaparHtml, bloque, cabecera } from '../htmlDetalle.js';

describe('escaparHtml', () => {
  it('escapa caracteres especiales', () => {
    expect(escaparHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('escapa amperisand', () => {
    expect(escaparHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('devuelve cadena vacia con null o undefined', () => {
    expect(escaparHtml(null)).toBe('');
    expect(escaparHtml(undefined)).toBe('');
  });

  it('convierte numeros a cadenas', () => {
    expect(escaparHtml(42)).toBe('42');
  });
});

describe('bloque', () => {
  it('omite filas con valor vacio o nulo', () => {
    const html = bloque([
      { etiqueta: 'Cliente', valor: 'Pepita' },
      { etiqueta: 'Email', valor: '' },
      { etiqueta: 'Telefono', valor: null },
      { etiqueta: 'Direccion', valor: 'Calle 1' },
    ]);

    expect(html).toContain('Pepita');
    expect(html).toContain('Direccion');
    expect(html).not.toContain('Email');
    expect(html).not.toContain('Telefono');
  });

  it('escapa el valor por defecto pero respeta html=true', () => {
    const escapado = bloque([{ etiqueta: 'X', valor: '<b>raw</b>' }]);
    expect(escapado).toContain('&lt;b&gt;raw&lt;/b&gt;');

    const sinEscapar = bloque([{ etiqueta: 'X', valor: '<a>ok</a>', html: true }]);
    expect(sinEscapar).toContain('<a>ok</a>');
  });
});

describe('cabecera', () => {
  it('renderiza titulo y eyebrow escapados', () => {
    const html = cabecera({ eyebrow: 'Entrega', titulo: 'Pedido <#1>' });
    expect(html).toContain('Entrega');
    expect(html).toContain('Pedido &lt;#1&gt;');
  });

  it('incluye badge solo cuando se proporciona', () => {
    const conBadge = cabecera({ eyebrow: 'A', titulo: 'B', badge: 'Archivado' });
    expect(conBadge).toContain('Archivado');

    const sinBadge = cabecera({ eyebrow: 'A', titulo: 'B' });
    expect(sinBadge).not.toContain('swal-detalle__badge');
  });
});
