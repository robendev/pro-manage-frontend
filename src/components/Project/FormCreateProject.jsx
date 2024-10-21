const FormCreateProject = ({ register, errors }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return (
        <>
            <div>
                <label htmlFor="projectName" className='sr-only'>Nombre del Proyecto</label>
                <div className="relative flex items-center gap-2">
                    <i class="fa-solid fa-diagram-project w-5 text-center"></i>
                    <input type="text"
                        id='projectName'
                        name='projectName'
                        placeholder='Nombre del Proyecto'
                        /* autoFocus */
                        className='w-full outline-none bg-white rounded-3xl shadow py-1 px-4'
                        {...register("projectName", {
                            required: {
                                value: true,
                                message: "El nombre del proyecto es obligatorio.",
                            },
                            minLength: {
                                value: 3,
                                message: "El nombre del proyecto debe tener al menos 3 caracteres.",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_ .áéíóúÁÉÍÓÚüÜñÑ-]+$/,
                                message:
                                    "El nombre del proyecto solo puede contener letras, números, espacios, guiones, puntos, guiones bajos y caracteres acentuados.",
                            },
                        })} />
                    {errors.projectName && (
                        <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="projectDescription" className='sr-only'>Descripción del Proyecto</label>
                <div className="relative flex items-center gap-2">
                    <i class="fa-solid fa-comment-dots w-5 text-center"></i>
                    <textarea
                        id="projectDescription"
                        name="projectDescription"
                        placeholder='Descripción del Proyecto'
                        className='w-full outline-none bg-white rounded-sm shadow py-1 px-4 resize-none'
                        {
                        ...register("projectDescription", {
                            required: {
                                value: true,
                                message: "La descripción del proyecto es obligatoria."
                            },
                        })
                        }
                    />
                    {errors.projectDescription && (
                        <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
                    )}
                </div>
            </div>

            <details>
                <summary className="mb-1 cursor-pointer">Fecha de Inicio</summary>
                <div>
                    <label htmlFor="startDate" className="sr-only">Fecha de Inicio</label>
                    <div className="relative flex items-center gap-2">
                        <input type="date"
                            name="startDate"
                            id="startDate"
                            className='w-full outline-none bg-white rounded-3xl shadow py-1 px-4'
                            defaultValue={currentDate}
                            {...register("startDate", {
                                pattern: {
                                    value: /^\d{4}-\d{2}-\d{2}$/,
                                    message: "La fecha de inicio debe ser una fecha válida.",
                                },
                            })} />
                        {errors.startDate && (
                            <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
                        )}
                    </div>
                </div>
            </details>

            <details>
                <summary className="mb-1 cursor-pointer">Fecha de Finalización</summary>
                <div>
                    <label htmlFor="endDate" className="sr-only">Fecha de Finalización</label>
                    <div className="relative flex items-center gap-2">
                        <input type="date"
                            name="endDate"
                            id="endDate"
                            className='w-full outline-none bg-white rounded-3xl shadow py-1 px-4'
                            defaultValue={futureDate}
                            {...register("endDate", {
                                pattern: {
                                    value: /^\d{4}-\d{2}-\d{2}$/,
                                    message: "La fecha de finalización debe ser una fecha válida.",
                                },
                            })} />
                        {errors.endDate && (
                            <i className="absolute top-1/5 right-2 fa-solid fa-circle-exclamation text-center text-red-500"></i>
                        )}
                    </div>
                </div>
            </details>

            <details>
                <summary className="mb-1 cursor-pointer">Prioridad del Proyecto</summary>
                <div className="flex items-center gap-1"><input type="radio" name='priority' value="low" defaultChecked {...register("priority")} />Baja</div>
                <div className="flex items-center gap-1"><input type="radio" name='priority' value="medium" {...register("priority")} />Media</div>
                <div className="flex items-center gap-1"><input type="radio" name='priority' value="high" {...register("priority")} />Alta</div>
            </details>

            <details>
                <summary className="mb-1 cursor-pointer">Estado del Proyecto</summary>
                <div className='flex items-center gap-1'><input type="radio" name='status' value="pending" defaultChecked {...register("status")} />Pendiente</div>
                <div className='flex items-center gap-1'><input type="radio" name='status' value="in-progress" {...register("status")} />En Progreso</div>
                <div className='flex items-center gap-1'><input type="radio" name='status' value="completed" {...register("status")} />Completado</div>
            </details>
        </>
    )
}

export default FormCreateProject