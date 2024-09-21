import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import Ticket from './Ticket';
import jsPDF from 'jspdf';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {priceStartLoading} from "../../actions/price";
import {uiOpenModal} from "../../actions/ui";
import { carCreate, carSetActive,carStartLoading} from '../../actions/parking';
import Pagination from "../ui/Pagination";
import AddCar from './AddCar';
const now = moment();
const CalculateHours = () => {
    let results=[];
    const dispatch= useDispatch();
    const {prices} = useSelector(state=> state.price);
    const {cars} = useSelector(state=>state.parking);
    const {modalOpen} = useSelector(state=>state.ui );
    const [timeEnd, setTime] = useState(new Date());
    const [start, setHours] = useState("");
    const [date , setDay] = useState(new Date());
    const [search, setSearch]= useState("")
    const [currentPage, setCurrentPage] =useState(1);
    const [userPerPage]=useState(5);

    const indexLastUser = currentPage* userPerPage;
    const indexOfFirstUser = indexLastUser - userPerPage;
    const currentCategories= cars.slice(indexOfFirstUser,indexLastUser);
    useEffect(() => {
        dispatch(carStartLoading());
    }, [dispatch]);
    useEffect(() => {
        dispatch(priceStartLoading());
    }, [dispatch]);
    useEffect(()=> {
        setInterval(()=>{setTime(new Date())},1000);
    },[]);
    useEffect(()=> {
        setDay(new Date());
    },[]);
    const passHour =(x)=>{
        const a = x.split(':');
        a[0] = parseInt(a[0])+12;
        return a;
    } 
    const passHourAm=(x)=>{
        const a = x.split(':');
        return a;    
    }
    const convertToTime=(time)=>{
        const x = time.substring(9,13);
        const t = time.substring(0,8);
        console.log(x);
        if (x==="a.m."){ 
            return passHourAm(t);
        }
        else{
            return passHour(t);
        }
    }
    const handleUpdate=(car)=>{
        dispatch(uiOpenModal());
        dispatch(carSetActive(car));
    }
    const paginate =(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const handleHours=(e)=>{
        setHours(e.target.value);
    }
 
    const handleCalculate=()=>{
        const nro_chapa = start.substring(24,start.length);
        const fecha_inicio = start.substring(14,23); 
        const fecha_fin = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear(); 
        const end = timeEnd.toLocaleTimeString('en-GB');
        const hms= convertToTime(start);
        const hora_inicio = hms[0] + ":"+hms[1]+":"+hms[2]; 
        const endTo= end.split(":");
        var datos = {};
        //const diffTotal = diffH+','+diffM;
        var total = 0;
        var total_final= 0.0;
        var total2 = 0.0;
        const [dia,mes,anho] = fecha_inicio.split("/");
        const fecha1 = new Date(anho,mes,dia,hms[0],parseInt(hms[1]),parseInt(hms[2])); // Fecha de inicio
        const fecha2 = new Date(); // Fecha de fin
        // Calcular la diferencia en milisegundos
        const diferenciaMs = fecha2 - fecha1;
        // Convertir la diferencia a horas
        const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
        const arreglo =diferenciaHoras.toString().split(".") ;
        const diffH = arreglo[0];
        const diffM = arreglo[1].slice(0,2);
        const porcentaje = (diffM * 60) / 100
        const porcentaje_calculado = porcentaje/100;
        for(var i = 0; i < prices.length;i ++){
            if(diffH <= 24){
                if(prices[i].descripcion == "hora"){
                    total = parseInt(diffH)*parseInt(prices[i].precio);
                    total2 = parseFloat(porcentaje_calculado) *parseFloat(prices[i].precio);
                    total_final = total + total2;
                }
            }
            if(diffH == 0){
                total_final=prices[i].precio;
            }
        }
       
        datos = {
            fecha_inicio: fecha_inicio,
            hora_inicio: hora_inicio,
            fecha_fin: fecha_fin,
            hora_fin: end,
            nro_chapa: nro_chapa,
            total_hs: diferenciaHoras.toFixed(2),
            total: total_final    
        }
        dispatch(carCreate(datos));
    }
    const handleSearch=(e)=>{
        setSearch(e.target.value);
    }

    if(!search){
        results= currentCategories
    }else{
        results= cars.filter((x)=>
            x.nro_chapa.toLowerCase().includes(search.toLowerCase())
        )
    }

  return (
    <div className="content-wrapper">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title">Venta</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="form-group col-xs-4 col-md-3">
                            <label className="control-label">
                                Hora y Fecha de entrada:
                            </label>
                            <input type="text" value={start} onChange={handleHours} className="form-control pt-1 pb-1"/>
                        </div>
                        <div className="form-group col-xs-4 col-md-3">
                            <button
                                onClick={handleCalculate}
                                type="submit"
                                className="btn btn-primary mtop"
                            >
                                <span> Calcular</span>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
        <div>
            <div className="col-5">
                <input value={search} onChange={handleSearch} type="text" placeholder="Buscar chapa" className="mb-3 form-control"/>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">HORA INICIO</th>
                    <th scope="col">HORA FIN</th>
                    <th scope="col">NRO. CHAPA</th>
                    <th scope="col">TIEMPO TOTAL</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">ACCCIONES</th>
                </tr>
                </thead>
                <tbody>
                {
                    results.map((x, key) =>{
                            return (
                                <tr key={x._id}>
                                    <th scope="row">{key+1}</th>
                                    <td>{x.hora_inicio}</td>
                                    <td>{x.hora_fin}</td>
                                    <td>{x.nro_chapa}</td>
                                    <td>{x.total_hs}</td>
                                    <td>{x.total}</td>
                                    <td>
                                        <button onClick={()=>handleUpdate(x)} className="btn btn-info"><i className="fa fa-edit"></i></button>
                                        {modalOpen && (<AddCar/>)}
                                    </td>
                                </tr>
                            );
                        }
                    )
                }
                </tbody>
            </table>
            <Pagination pagePerPage={userPerPage} totalPost={cars.length} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    </div>
  );
};
export default CalculateHours;