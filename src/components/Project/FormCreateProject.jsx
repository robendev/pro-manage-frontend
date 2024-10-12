const FormCreateProject = ({ register, errors }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    return (
        <>
            <fieldset className='border border-gray-800 p-4 rounded-lg mb-2'>
                <legend className='px-2 font-bold'>Datos del Proyecto - <span className='font-light'>Campos Requeridos</span></legend>
                <div className="mb-4">
                    <label htmlFor="projectName" className='sr-only'>Nombre del Proyecto</label>
                    <div className="relative flex items-center gap-2">
                        <i class="fa-solid fa-diagram-project"></i>
                        <input type="text"
                            id='projectName'
                            name='projectName'
                            placeholder='Nombre del Proyecto'
                            /* autoFocus */
                            className='w-full px-4 py-2 shadow-md rounded-lg outline-none bg-gray-50 hover:bg-white focus:bg-white'
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
                <div className="mb-4">
                    <label htmlFor="projectDescription" className='sr-only'>Nombre del Proyecto</label>

                    <div className="relative flex items-center gap-2">
                        <i class="fa-solid fa-comment-dots"></i>
                        <textarea
                            id="projectDescription"
                            name="projectDescription"
                            placeholder='Descripción del Proyecto'
                            className='w-full px-4 py-2 shadow-md rounded-lg outline-none bg-gray-50 hover:bg-white focus:bg-white'
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
            </fieldset>
            <fieldset className='border border-gray-800 p-4 rounded-lg mb-2'>
                <legend className='px-2 font-bold'>Fechas - <span className='font-light'>Campos Opcionales</span></legend>
                <div className='mb-4 space-y-1'>
                    <label htmlFor="startDate" className='font-bold'>Inicio del Proyecto</label>
                    <div className="relative flex items-center gap-2">
                        <input type="date"
                            name="startDate"
                            id="startDate"
                            className='w-full px-4 py-2 shadow-md rounded-lg outline-none bg-gray-50 hover:bg-white focus:bg-white'
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

                <div className='mb-4 space-y-1'>
                    <label htmlFor="endDate" className='font-bold'>Fin del Proyecto</label>
                    <div className="relative flex items-center gap-2">
                        <input type="date"
                            name="endDate"
                            id="endDate"
                            className='w-full px-4 py-2 shadow-md rounded-lg outline-none bg-gray-50 hover:bg-white focus:bg-white'
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
            </fieldset>
            <fieldset className='border border-gray-800 p-4 rounded-lg mb-4'>
                <legend className='px-2 font-bold'>Prioridad - <span className='font-light'>Campo Opcional</span></legend>
                <div className='mb-4 space-y-1'>
                    <label htmlFor="" className=' font-bold block'>Prioridad del Proyecto</label>
                    <div className='flex items-center gap-1'><input type="radio" name='priority' value="low" className='mr-1' defaultChecked {...register("priority")} />Baja</div>
                    <div className='flex items-center gap-1'><input type="radio" name='priority' value="medium" className='mr-1' {...register("priority")} />Media</div>
                    <div className='flex items-center gap-1'><input type="radio" name='priority' value="high" className='mr-1' {...register("priority")} />Alta</div>
                </div>
            </fieldset>
            <fieldset className='border border-gray-800 p-4 rounded-lg mb-4'>
                <legend className='px-2 font-bold'>Estado - <span className='font-light'>Campo Opcional</span></legend>
                <div className='mb-4 space-y-1'>
                    <label htmlFor="" className=' font-bold block'>Estado del Proyecto</label>
                    <div className='flex items-center gap-1'><input type="radio" name='status' value="pending" className='mr-1' defaultChecked {...register("status")} />Pendiente</div>
                    <div className='flex items-center gap-1'><input type="radio" name='status' value="in-progress" className='mr-1' {...register("status")} />En Progreso</div>
                    <div className='flex items-center gap-1'><input type="radio" name='status' value="completed" className='mr-1' {...register("status")} />Completado</div>
                </div>
            </fieldset>
        </>
    )
}

export default FormCreateProject