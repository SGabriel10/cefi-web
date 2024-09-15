import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import Ticket from './Ticket';
import jsPDF from 'jspdf';
import moment from "moment";
const now = moment();
const CalculateHours = () => {
    const [timeEnd, setTime] = useState(new Date());
    const [start, setHours] = useState("");
    useEffect(()=> {
        setInterval(()=>{setTime(new Date())},1000);
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
        const x = time.substring(8,time.length);
        const t = time.substring(0,7);
        if (x==="a.m."){ 
            return passHourAm(t);
        }
        else{
            return passHour(t);
        }
    }


    const handleHours=(e)=>{
        setHours(e.target.value);
    }

    const handleCalculate=()=>{
        const end = timeEnd.toLocaleTimeString('en-GB');
        const hms= convertToTime(start);
        const endTo= end.split(":");
        const diffH = endTo[0] - hms[0];
        const diffM = endTo[1] - hms[1];
        const diffTotal = diffH+','+diffM;
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
                                Hora de entrada:
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
    <table className="table">
            <thead>

             </thead>
            <tbody>
            <tr index="1">
                <td>
                </td>
            </tr>
            </tbody>
    </table>
    </div>
  );
};
export default CalculateHours;