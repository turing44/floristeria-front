
export default function FormPedidos({
    form,
    setField,
    title,
    campoMensaje = false
}) {
    return (
        <>
            <header className="ef-header">
                <div className="ef-titlewrap">
                    <h1 className="ef-title">{title}</h1>
                </div>

                <div className="ef-actions ef-actions--top">
                    <button type="submit" className="ef-btn ef-btn--primary">
                        Guardar
                    </button>
                </div>
            </header>

            <section className="ef-section">
                <h2 className="ef-sectionTitle">Cliente</h2>

                <div className="ef-grid">
                    <div className="ef-field">
                        <label className="ef-label" htmlFor="cliente">
                            Cliente <span className="ef-req">*</span>
                        </label>
                        <input
                            id="cliente"
                            className="ef-input"
                            type="text"
                            value={form.cliente}
                            onChange={(e) => setField("cliente", e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="ef-field">
                        <label className="ef-label" htmlFor="telf_cliente">
                            Teléfono cliente <span className="ef-req">*</span>
                        </label>
                        <input
                            id="telf_cliente"
                            className="ef-input"
                            type="tel"
                            value={form.telf_cliente}
                            onChange={(e) => setField("telf_cliente", e.target.value)}
                            autoComplete="tel"
                            inputMode="tel"
                            required
                        />
                    </div>
                </div>
            </section>

            <section className="ef-section">
                <h2 className="ef-sectionTitle">Entrega</h2>

                <div className="ef-grid">
                    <div className="ef-field">
                        <label className="ef-label" htmlFor="fecha_entrega">
                            Fecha de entrega
                        </label>
                        <input
                            id="fecha_entrega"
                            className="ef-input"
                            type="date"
                            value={form.fecha_entrega}
                            onChange={(e) => setField("fecha_entrega", e.target.value)}
                            required
                        />
                    </div>

                    <div className="ef-field">
                        <label className="ef-label" htmlFor="horario">
                            Horario
                        </label>
                        <select
                            id="horario"
                            className="ef-input"
                            value={form.horario}
                            onChange={(e) => setField("horario", e.target.value)}
                        >
                            <option value="INDIFERENTE">INDIFERENTE</option>
                            <option value="MAÑANA">MAÑANA</option>
                            <option value="TARDE">TARDE</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="ef-section">
                <h2 className="ef-sectionTitle">Producto</h2>

                <div className="ef-grid">
                    <div className="ef-field">
                        <label className="ef-label" htmlFor="producto">
                            Producto
                        </label>
                        <input
                            id="producto"
                            className="ef-input"
                            type="text"
                            value={form.producto}
                            onChange={(e) => setField("producto", e.target.value)}
                            required
                        />
                    </div>

                    <div className="ef-field">
                        <label className="ef-label" htmlFor="precio">
                            Precio (€)
                        </label>
                        <input
                            id="precio"
                            className="ef-input"
                            type="text"
                            value={form.precio}
                            onChange={(e) => setField("precio", e.target.value)}
                            inputMode="decimal"
                            placeholder="0.00"

                        />
                    </div>
                </div>
            </section>

            <section className="ef-section">
                <h2 className="ef-sectionTitle">Notas</h2>
                <div className="ef-grid">
                    <div className="ef-field ef-field--full">
                        <label className="ef-label" htmlFor="observaciones">
                            Observaciones
                        </label>
                        <textarea
                            id="observaciones"
                            className="ef-input ef-textarea"
                            value={form.observaciones}
                            onChange={(e) => setField("observaciones", e.target.value)}
                            rows={4}
                        />
                    </div>
                    {campoMensaje && (
                    <div className="ef-field ef-field--full">
                        <label className="ef-label" htmlFor="mensaje">
                            Mensaje (opcional)
                        </label>
                        <textarea
                            id="mensaje"
                            className="ef-input ef-textarea"
                            value={form.mensaje ?? ""}
                            onChange={(e) => setField("mensaje", e.target.value === "" ? null : e.target.value)}
                            rows={3}
                        />
                    </div>
                    )}
                </div>
            </section>
        </>
    )
}   