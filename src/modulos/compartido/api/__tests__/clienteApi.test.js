import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const URL_API = 'http://test.local/api';
import.meta.env.VITE_API_URL = URL_API;

const { getJson, postJson, putJson, deleteJson, getBlob, normalizarEnvelope } = await import('../clienteApi.js');

function respuestaJson(data, { status = 200, ok = true } = {}) {
  return {
    ok,
    status,
    headers: { get: (clave) => clave === 'content-type' ? 'application/json' : null },
    json: async () => data,
    text: async () => JSON.stringify(data),
  };
}

function respuestaTexto(texto, { status = 500, ok = false } = {}) {
  return {
    ok,
    status,
    headers: { get: () => 'text/plain' },
    json: async () => null,
    text: async () => texto,
  };
}

describe('clienteApi', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getJson construye la URL con el path y devuelve JSON', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaJson({ data: [] }));

    const resultado = await getJson('/entregas');

    expect(globalThis.fetch).toHaveBeenCalledWith(`${URL_API}/entregas`, expect.objectContaining({ method: 'GET' }));
    expect(resultado).toEqual({ data: [] });
  });

  it('getJson serializa query params y omite vacios', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaJson({ data: [] }));

    await getJson('/entregas', { query: { buscar: 'maria', archivados: false, fecha: '' } });

    const url = globalThis.fetch.mock.calls[0][0];
    expect(url).toContain('buscar=maria');
    expect(url).not.toContain('archivados=');
    expect(url).not.toContain('fecha=');
  });

  it('postJson manda body JSON y header Content-Type', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaJson({ data: { id: 1 } }, { status: 201 }));

    await postJson('/entregas', { nombre_cliente: 'Pepita' });

    const init = globalThis.fetch.mock.calls[0][1];
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(init.body).toBe(JSON.stringify({ nombre_cliente: 'Pepita' }));
  });

  it('putJson y deleteJson usan el metodo correcto', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaJson({ data: {} }));
    await putJson('/entregas/1', { nombre_cliente: 'X' });
    expect(globalThis.fetch.mock.calls[0][1].method).toBe('PUT');

    globalThis.fetch.mockResolvedValueOnce({ ok: true, status: 204, headers: { get: () => null } });
    await deleteJson('/entregas/1');
    expect(globalThis.fetch.mock.calls[1][1].method).toBe('DELETE');
  });

  it('lanza error con campos cuando la API responde 422', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaJson(
      { message: 'Datos invalidos', errors: { precio: ['El precio es obligatorio.'] } },
      { status: 422, ok: false }
    ));

    await expect(postJson('/entregas', {})).rejects.toMatchObject({
      status: 422,
      message: 'Datos invalidos',
      fields: { precio: ['El precio es obligatorio.'] },
    });
  });

  it('extrae mensaje de validacion si no hay message explicito', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaJson(
      { errors: { fecha: ['La fecha no es valida.'] } },
      { status: 422, ok: false }
    ));

    await expect(postJson('/entregas', {})).rejects.toMatchObject({
      message: 'La fecha no es valida.',
    });
  });

  it('soporta respuestas no JSON en errores', async () => {
    globalThis.fetch.mockResolvedValueOnce(respuestaTexto('Error 500 interno'));

    await expect(getJson('/entregas')).rejects.toMatchObject({
      status: 500,
      message: 'Error 500 interno',
    });
  });

  it('getBlob devuelve un Blob', async () => {
    const fakeBlob = new Blob(['pdf'], { type: 'application/pdf' });
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: { get: () => 'application/pdf' },
      blob: async () => fakeBlob,
    });

    const resultado = await getBlob('/entregas/pdf/1');
    expect(resultado).toBe(fakeBlob);
  });

  it('normalizarEnvelope acepta tanto envelope como respuesta plana', () => {
    expect(normalizarEnvelope({ data: [1], meta: { total: 1 } })).toEqual({ data: [1], meta: { total: 1 } });
    expect(normalizarEnvelope([1, 2, 3])).toEqual({ data: [1, 2, 3], meta: null });
    expect(normalizarEnvelope(null)).toEqual({ data: null, meta: null });
  });
});
