import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { abrirPdfEnNuevaVentana } from '../pdf.js';

describe('abrirPdfEnNuevaVentana', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:fake');
    globalThis.URL.revokeObjectURL = vi.fn();
    globalThis.open = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('crea un objectURL, abre nueva ventana y revoca a los 60s', () => {
    const blob = new Blob(['fake'], { type: 'application/pdf' });

    abrirPdfEnNuevaVentana(blob);

    expect(globalThis.URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(globalThis.open).toHaveBeenCalledWith('blob:fake', '_blank', 'noopener,noreferrer');
    expect(globalThis.URL.revokeObjectURL).not.toHaveBeenCalled();

    vi.advanceTimersByTime(60_000);
    expect(globalThis.URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake');
  });
});
