const getDayRange=(fechaInicio)=> {
    const fechaInicioDate = new Date(fechaInicio); // Convertir la fecha de inicio a un objeto Date

    // Establecer el inicio del día (00:00:00)
    const inicioDia = new Date(fechaInicioDate);
    inicioDia.setHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a 0

    // Establecer el final del día (23:59:59)
    const finDia = new Date(fechaInicioDate);
    finDia.setHours(23, 59, 59, 999); // Establecer horas a 23, minutos a 59, segundos a 59 y milisegundos a 999

    const formatoFecha = (fecha) =>
        fecha.getFullYear() + '-' +
        String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
        String(fecha.getDate()).padStart(2, '0');

    return {
        inicio: formatoFecha(inicioDia),
        fin: formatoFecha(finDia)
    };
}

const getWeekRange=(fechaInicio)=>{
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaInicioDate);
    
    // Ajustar para encontrar el inicio (lunes) y fin (domingo) de la semana
    const diaDeLaSemana = fechaInicioDate.getDay(); // 0 (Domingo) - 6 (Sábado)
    const inicioSemana = new Date(fechaInicioDate);
    const finSemana = new Date(fechaInicioDate);
    
    // Ajustar el inicio al lunes (1)
    inicioSemana.setDate(fechaInicioDate.getDate() - (diaDeLaSemana === 0 ? 6 : diaDeLaSemana - 1));
    
    // Ajustar el fin al domingo (0)
    finSemana.setDate(fechaInicioDate.getDate() + (7 - diaDeLaSemana));

    const formatoFecha = (fecha) =>
        fecha.getFullYear() + '-' +
        String(fecha.getMonth() + 1).padStart(2, '0') + '-' +
        String(fecha.getDate()).padStart(2, '0');

    return {
        inicio: formatoFecha(inicioSemana),
        fin: formatoFecha(finSemana)
    };
}
const getMonthRange=(fechaInicio)=> {
const fechaInicioDate = new Date(fechaInicio); // Convertir la fecha de inicio a un objeto Date

// Establecer el primer día del mes
const inicioMes = new Date(fechaInicioDate.getFullYear(), fechaInicioDate.getMonth(), 1);

// Establecer el último día del mes
const finMes = new Date(fechaInicioDate.getFullYear(), fechaInicioDate.getMonth() + 1, 0);

const formatoFecha = (fecha) => 
    fecha.getFullYear() + '-' + 
    String(fecha.getMonth() + 1).padStart(2, '0') + '-' + 
    String(fecha.getDate()).padStart(2, '0');

return {
    inicio: formatoFecha(inicioMes),
    fin: formatoFecha(finMes)
};
}

const getYearRange=(fechaInicio)=> {
const fechaInicioDate = new Date(fechaInicio); // Convertir la fecha de inicio a un objeto Date

// Establecer el primer día del año
const inicioAnio = new Date(fechaInicioDate.getFullYear(), 0, 1); // Enero es el mes 0

// Establecer el último día del año
const finAnio = new Date(fechaInicioDate.getFullYear(), 11, 31); // Diciembre es el mes 11

const formatoFecha = (fecha) => 
    fecha.getFullYear() + '-' + 
    String(fecha.getMonth() + 1).padStart(2, '0') + '-' + 
    String(fecha.getDate()).padStart(2, '0');

return {
    inicio: formatoFecha(inicioAnio),
    fin: formatoFecha(finAnio)
};
}
export {
    getDayRange,
    getWeekRange,
    getMonthRange,
    getYearRange
}