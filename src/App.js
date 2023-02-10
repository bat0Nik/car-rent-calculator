import React, { useState } from "react";
import "./index.css"

export default function App() {
    
    function Today(a) {
        var someDate = new Date()
        someDate.setDate(someDate.getDate() + a)
        var dateFormated = someDate.toISOString().substr(0, 10)
        return dateFormated
    }
    
    var date = new Date()
    const currnetYear = date.getFullYear()
    
    const [data, setData] = useState({
        dLicense: 2000,
        distance: 40,
        dateFrom: Today(0),
        dateTo: Today(6),
        carClass: "",
        timePrice: 0,
        fuelPrice: 0,
        netPrice: 0,
        grossPrice: 0
    })
    function changeHandler(event) {
        const { name, value } = event.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    
    function dateHandler() {
        var date1 = new Date(data.dateFrom);
        var date2 = new Date(data.dateTo);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays
    }

    function chceckCarClass() {
        var mnoznik = 0
        switch (data.carClass) {
            case 'basic':
                mnoznik = 1;
                break;
            case 'standard':
                mnoznik = 1.3;
                break;
            case 'medium':
                mnoznik = 1.6;
                break;
            case 'premium':
                mnoznik = 2;
                break;
            default:
                mnoznik = 1;
                break;
        }
        return mnoznik
    }


    function drivingLicense() {
        
        var mnozik=1
        
        if (data.dLicense < (currnetYear - 5)) {
            mnozik = 1
        } else {
            mnozik = 1.2
        }
        return mnozik
    }

    function premiumCarRent(){
        var disable = true
        if (data.dLicense > (currnetYear - 3)) {
            disable=false
        } else {
            disable=true
        }
        return disable
    }
    function Calculate() {
        
        const avgFuelPrice = 8
        const dayPaynment = 200.00
        const multiplier = chceckCarClass()
        const licensPaynment = drivingLicense()
        const avgFuelConsumption = 12 / 100
        setData(prevData => ({
            ...prevData,
            fuelPrice: ((avgFuelConsumption * avgFuelPrice) * data.distance).toFixed(2),
            timePrice: (dateHandler() * dayPaynment),
            netPrice: ((((dateHandler() * dayPaynment) + ((avgFuelConsumption * avgFuelPrice) * data.distance)) * multiplier) * licensPaynment).toFixed(2),
            grossPrice: (((((dateHandler() * dayPaynment) + ((avgFuelConsumption * avgFuelPrice) * data.distance))* multiplier) * licensPaynment)*1.23).toFixed(2)
        }))

    }
    return (

        <main>
            <h1 className="calc-header">KALKULATOR</h1>
            <p className="calc-info">Skorzystaj z naszego kalkulatora aby obliczyc cenę wyporzyczenia samochodu z naszej wypożyczalni</p>
            <div className="input-handler">
                <div className="input-single">
                    <input
                        type="number"
                        name="dLicense"
                        id="dLicense"
                        onChange={changeHandler}
                        value={data.dLicense}
                        min={currnetYear-60}
                        required
                    />     
                    <span>Rok otrzymania prawa jazdy:</span>
                    
                </div>
                <div className="input-single">
                    <input
                        type="number"
                        name="distance"
                        id="distance"
                        onChange={changeHandler}
                        value={data.distance}
                        min={0}
                        required
                    />
                    <span>Dystans (km):</span>
                    
                </div>
                <div className="input-single">
                    <input
                        type="date"
                        name="dateFrom"
                        id="dateFrom"
                        onChange={changeHandler}
                        value={data.dateFrom}
                        min={Today(0)}
                        required
                    />
                    <span>Data wyporzyczenia pojazdu:</span>
                    
                </div>
                <div className="input-single">
                    <input
                        type="date"
                        name="dateTo"
                        id="dateTo"
                        onChange={changeHandler}
                        value={data.dateTo}
                        min={Today(0)}
                        required
                    />
                    <span>Data oddania pojazdu:</span>
                   
                </div>
            </div>
            <div className="class-choose">
                <select
                    id="carClass"
                    name="carClass"
                    value={data.carClass}
                    onChange={changeHandler}
                    className="car-class"
                >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="medium">Medium</option>
                    {premiumCarRent() ? <option value="premium" >Premium</option> : <option value="premium" disabled>Premium</option>}
                </select>
                <span>Klasa pojazdu</span>
            </div>
            <button
                onClick={Calculate}
                className="summ-btn"
            >OBLICZ</button>
            <div className="summ-container">
                <div className="summ-single">
                    <h4>Koszt paliwa(PLN):</h4>
                    <input
                        disabled
                        value={data.fuelPrice}
                        name="fuelPrice"
                    />
                </div>
                <div className="summ-single">
                    <h4>Koszt za czas wypozyczenia(PLN):</h4>
                    <input
                        disabled
                        value={data.timePrice}
                        name="timePrice"
                    />
                </div>
                <div className="summ-single">
                    <h4>Cena końcowa netto(PLN):</h4>
                    <input
                        disabled
                        value={data.netPrice}
                        name="netPrice"
                    />
                </div>
                <div className="summ-single">
                    <h4>Cena końcowa brutto(PLN):</h4>
                    <input
                        disabled
                        value={data.grossPrice}
                        name="grossPrice"
                    />
                </div>
            </div>
        </main>
    )
}