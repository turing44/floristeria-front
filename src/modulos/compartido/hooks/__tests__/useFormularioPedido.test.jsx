import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useFormularioPedido } from '../useFormularioPedido.js';

const contratoFake = {
  entidad: 'entrega',
  secciones: [
    {
      id: 'cliente',
      titulo: 'Cliente',
      campos: [
        { clave: 'nombre_cliente', entrada: 'text', valor_inicial: '' },
        { clave: 'precio', entrada: 'number', valor_inicial: '' },
      ],
    },
  ],
  campos_ocultos: [
    { clave: 'fuente', entrada: 'hidden', valor_inicial: 'local' },
  ],
};

function montarHook({ idEditar = null, obtenerContrato, obtenerRegistro, alGuardar }) {
  // Hoisted refs para que las dependencias del useEffect del hook sean estables.
  return renderHook(() => useFormularioPedido({
    idEditar,
    obtenerContrato,
    obtenerRegistro,
    alGuardar,
  }));
}

describe('useFormularioPedido', () => {
  it('carga contrato y deja valores iniciales en alta', async () => {
    const obtenerContrato = vi.fn().mockResolvedValue(contratoFake);
    const obtenerRegistro = vi.fn();
    const alGuardar = vi.fn();

    const { result } = montarHook({ obtenerContrato, obtenerRegistro, alGuardar });

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(obtenerContrato).toHaveBeenCalledWith('crear');
    expect(obtenerRegistro).not.toHaveBeenCalled();
    expect(result.current.valores).toEqual({ fuente: 'local', nombre_cliente: '', precio: '' });
    expect(result.current.sucio).toBe(false);
  });

  it('carga registro existente cuando se edita y mezcla con el contrato', async () => {
    const obtenerContrato = vi.fn().mockResolvedValue(contratoFake);
    const obtenerRegistro = vi.fn().mockResolvedValue({ data: { nombre_cliente: 'Pepita', precio: 30 } });

    const { result } = montarHook({
      idEditar: 7,
      obtenerContrato,
      obtenerRegistro,
      alGuardar: vi.fn(),
    });

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(obtenerContrato).toHaveBeenCalledWith('actualizar');
    expect(obtenerRegistro).toHaveBeenCalledWith(7);
    expect(result.current.valores).toEqual({
      fuente: 'local',
      nombre_cliente: 'Pepita',
      precio: 30,
    });
  });

  it('cambiarValor actualiza valores y marca el formulario como sucio', async () => {
    const obtenerContrato = vi.fn().mockResolvedValue(contratoFake);
    const obtenerRegistro = vi.fn();
    const alGuardar = vi.fn();

    const { result } = montarHook({ obtenerContrato, obtenerRegistro, alGuardar });

    await waitFor(() => expect(result.current.cargando).toBe(false));

    act(() => {
      result.current.cambiarValor({ target: { name: 'nombre_cliente', value: 'Maria' } });
    });

    expect(result.current.valores.nombre_cliente).toBe('Maria');
    expect(result.current.sucio).toBe(true);
  });

  it('captura errores 422 en errores y devuelve null', async () => {
    const obtenerContrato = vi.fn().mockResolvedValue(contratoFake);
    const obtenerRegistro = vi.fn();
    const errorValidacion = { status: 422, fields: { precio: ['Es obligatorio'] } };
    const alGuardar = vi.fn().mockRejectedValueOnce(errorValidacion);

    const { result } = montarHook({ obtenerContrato, obtenerRegistro, alGuardar });

    await waitFor(() => expect(result.current.cargando).toBe(false));

    let resultado;
    await act(async () => {
      resultado = await result.current.enviar();
    });

    expect(resultado).toBeNull();
    expect(result.current.errores).toEqual({ precio: ['Es obligatorio'] });
  });

  it('deja errorCarga cuando obtenerContrato falla', async () => {
    const fallo = new Error('contrato roto');
    const obtenerContrato = vi.fn().mockRejectedValue(fallo);
    const obtenerRegistro = vi.fn();
    const alGuardar = vi.fn();

    const { result } = montarHook({ obtenerContrato, obtenerRegistro, alGuardar });

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.contrato).toBeNull();
    expect(result.current.errorCarga).toBe(fallo);
  });
});
