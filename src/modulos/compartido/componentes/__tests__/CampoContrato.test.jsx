import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CampoContrato } from '../CampoContrato.jsx';

function renderCampo(props) {
  return render(
    <CampoContrato
      campo={props.campo}
      valor={props.valor ?? ''}
      valores={props.valores ?? {}}
      alCambiar={props.alCambiar ?? (() => {})}
      error={props.error}
    />
  );
}

const campoTexto = {
  clave: 'nombre_cliente',
  entrada: 'text',
  requerido: true,
  restricciones: { maxLength: 40, placeholder: 'Cliente' },
};

const campoSelect = {
  clave: 'horario',
  entrada: 'select',
  requerido: false,
  restricciones: {
    options: [
      { value: 'INDIFERENTE', label: 'INDIFERENTE' },
      { value: 'MAÑANA', label: 'MAÑANA' },
      { value: 'TARDE', label: 'TARDE' },
    ],
  },
};

const campoOculto = {
  clave: 'fuente',
  entrada: 'hidden',
  restricciones: {},
};

describe('CampoContrato', () => {
  it('renderiza un input de texto con maxLength y contador', () => {
    renderCampo({ campo: campoTexto, valor: 'Pepita' });

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxlength', '40');
    expect(input).toHaveValue('Pepita');
    expect(screen.getByText('6 / 40')).toBeInTheDocument();
  });

  it('llama a alCambiar al escribir', async () => {
    const user = userEvent.setup();
    const cambio = vi.fn();
    renderCampo({ campo: campoTexto, valor: '', alCambiar: cambio });

    await user.type(screen.getByRole('textbox'), 'A');
    expect(cambio).toHaveBeenCalled();
  });

  it('muestra error y aria-invalid cuando hay error', () => {
    renderCampo({ campo: campoTexto, error: 'Es obligatorio' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Es obligatorio')).toBeInTheDocument();
  });

  it('renderiza un select con sus opciones', () => {
    renderCampo({ campo: campoSelect, valor: 'TARDE' });
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('TARDE');
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('aplica max dinamico desde maximoCampo', () => {
    const campo = {
      clave: 'dinero_pendiente',
      entrada: 'number',
      requerido: false,
      restricciones: { min: 0, maximoCampo: 'precio' },
    };

    renderCampo({ campo, valor: '', valores: { precio: 50 } });
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('max', '50');
  });

  it('renderiza un input hidden sin contador ni error visible', () => {
    const { container } = renderCampo({ campo: campoOculto, valor: 'local' });
    const input = container.querySelector('input[type="hidden"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('local');
  });
});
