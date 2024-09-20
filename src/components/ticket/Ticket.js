import React, {useEffect, useState} from 'react';
import moment from "moment";
import Barcode from 'react-barcode';
const now = moment();
const Ticket = React.forwardRef((props, ref) => {
    const [dateStart, setDate] = useState(now.format("HH:mm"));
    useEffect(()=> {
        const timer = setInterval(()=>{setDate(now.format("HH:mm"))});
    });
    const [time, setTime] = useState(new Date());
    const [date , setDay] = useState(new Date());
    useEffect(()=> {
        setInterval(()=>{setTime(new Date())},1000);
    },[]);
    useEffect(()=> {
        setDay(new Date());
    },[]);
    return (
    <div id="barcode-hora">
        <Barcode value={time.toLocaleTimeString()+"-"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}/>
    </div>
    );
});
export default Ticket;