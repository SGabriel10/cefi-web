import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcularIngresosLoading, calcularEgresosLoading } from '../../actions/balance';
import {getDayRange,getWeekRange,getMonthRange,getYearRange} from '../../helpers/date';
const BalanceDetails = () => {
    const { entrada, salida, diferencia } = useSelector(state => state.balance);
    const [entries, setEntradas] = useState(0);
    const [outs, setSalidas] = useState(0);
    const [diff, setDiff] = useState(0);
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();

    // Inicializa el rango de fecha solo al montar el componente
    useEffect(() => {
        const fecha = getDayRange(new Date(Date.now()));
        setInicio(fecha.inicio);
        setFin(fecha.fin);
    }, []);

    // Efecto para despachar acciones cuando 'inicio' o 'fin' cambian
    useEffect(() => {
        if (inicio && fin) {
            console.log("Rango de fechas:", inicio, fin);
            dispatch(calcularIngresosLoading(inicio, fin));
            dispatch(calcularEgresosLoading(inicio, fin));
        }
    }, [inicio, fin, dispatch]);

    // Actualiza los valores de entradas, salidas y diferencia
    useEffect(() => {
        setEntradas(entrada.total);
        setSalidas(salida.total);
        setDiff(diferencia.total);
    }, [entrada, salida, diferencia]);

    const handleSelect = (period) => {
        const fechaActual = new Date(Date.now());
        setSelected(period);
        let fecha = null;
        switch (period) {
            case "day":
                fecha = getDayRange(fechaActual);
                break;
            case "week":
                fecha = getWeekRange(fechaActual);
                break;
            case "month":
                fecha = getMonthRange(fechaActual);
                break;
            case "year":
                fecha = getYearRange(fechaActual);
                break;
            default:
                console.log("No existe otro tipo de rango");
                return;
        }
        setInicio(fecha.inicio);
        setFin(fecha.fin);
    };

    // Funciones getDayRange, getWeekRange, getMonthRange y getYearRange

    return (
        <div>
            <div className="col-5">
                <div className="btn-group mt-3" role="group" aria-label="Periodos de tiempo">
                    <button
                        type="button"
                        className={`btn ${selected === 'day' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleSelect('day')}
                    >
                        Día
                    </button>
                    <button
                        type="button"
                        className={`btn ${selected === 'week' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleSelect('week')}
                    >
                        Semana
                    </button>
                    <button
                        type="button"
                        className={`btn ${selected === 'month' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleSelect('month')}
                    >
                        Mes
                    </button>
                    <button
                        type="button"
                        className={`btn ${selected === 'year' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => handleSelect('year')}
                    >
                        Año
                    </button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">INGRESO</th>
                        <th scope="col">EGRESO</th>
                        <th scope="col">DIFERENCIA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key="1">
                        <th scope="row"></th>
                        <td>{entries}</td>
                        <td>{outs}</td>
                        <td>{diff}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BalanceDetails;
