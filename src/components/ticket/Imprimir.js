import React, {useEffect, useState} from 'react';
import html2canvas from 'html2canvas';
import Ticket from './Ticket';
import jsPDF from 'jspdf';
import moment from "moment";
const now = moment();
const Imprimir = () => {
    const [time, setTime] = useState(new Date());
    useEffect(()=> {
        setInterval(()=>{setTime(new Date())},1000);
    },[]);
    const handlePrint = ()=>{
        const input = document.getElementById("app");
        html2canvas(input, {logging: true,letterRendering: 1,useCORS: true}).then(canvas =>{
            const imgWidth = 100;
            const imgHeight= canvas.height * imgWidth/canvas.width;
            const imgData  = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p","mm","a4");
            pdf.addImage(imgData,"PNG",0,0,imgWidth,imgHeight);
            //window.open(pdf.output('ticket'), '_blank');
            pdf.autoPrint();
            pdf.output('dataurlnewwindow', {filename: 'ticket.pdf'});
            //pdf.save("ticket.pdf");
            /*const pdfDataUri = pdf.output('datauristring');
            const newTab = window.open();
            newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);   
            */
        })
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
                                Hora:
                            </label>
                            <p className="form-control">
                                {time.toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="form-group col-xs-4 col-md-3">
                            <button
                                onClick={handlePrint}
                                type="submit"
                                className="btn btn-primary mtop"
                            >
                                <span> Imprimir</span>
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
                <div id="app">
                    <Ticket/>
                </div>
                </td>
            </tr>
            </tbody>
    </table>
    </div>
  );
};
export default Imprimir;