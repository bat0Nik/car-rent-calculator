import React, { useState } from "react";
import ReactDOM from "react-dom";
import Cost from "./components/Cost"
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
        carClass: "basic",
        carID: 0
    })
    console.log(data)
    function changeHandler(event) {
        const { name, value } = event.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))

    }

    function ShowCosts() {
        ReactDOM.render(
            <Cost
                dLicense={data.dLicense}
                distance={data.distance}
                carClass={carOptions[data.carID].priceCategory}
                dateFrom={data.dateFrom}
                dateTo={data.dateTo}
                rentPrice={carOptions[data.carID].rentPrice}
                fuelConsumption={carOptions[data.carID].avgfuelConsumption / 100}
                avaliableModels={carOptions[data.carID].avaliableModels}
            />,
            document.getElementById("costs"))
    }

    const submitHandler = (e) => {
        e.preventDefault()

    }



    const carOptions = [
        { id: 0, priceCategory: "basic", label: "Opel Astra 2018", location: "Rzeszów", rentPrice: 150, avgfuelConsumption: 5.6, avaliableModels: 13 },
        { id: 1, priceCategory: "basic", label: "Chevrolet Aveo 2015", location: "Poznań", rentPrice: 145, avgfuelConsumption: 5.3, avaliableModels: 10 },
        { id: 2, priceCategory: "standard", label: "BMW M3 2020", location: "Kraków", rentPrice: 169, avgfuelConsumption: 8.6, avaliableModels: 9 },
        { id: 3, priceCategory: "standard", label: "Mazda MX-5 2019", location: "Wrocław", rentPrice: 165, avgfuelConsumption: 6.6, avaliableModels: 7 },
        { id: 4, priceCategory: "medium", label: "Audi A8 TFSI 2021", location: "Łódź", rentPrice: 199, avgfuelConsumption: 9.6, avaliableModels: 5 },
        { id: 5, priceCategory: "medium", label: "Mercedes GLS SUV 2020", location: "Warszawa", rentPrice: 210, avgfuelConsumption: 9.1, avaliableModels: 3 },
        { id: 6, priceCategory: "premium", label: "Chevrolet Camaro 2022", location: "Wrocław", rentPrice: 240, avgfuelConsumption: 9.9, avaliableModels: 6 },
        { id: 7, priceCategory: "premium", label: "Lamborghini Aventador 2020", location: "Warszawa", rentPrice: 270, avgfuelConsumption: 9.2, avaliableModels: 2 },
    ]


    function chceckCarClass() {
        switch (data.carClass) {
            case 'basic': return (<>
                <select
                    name="carID"
                    value={data.carID}
                    onChange={changeHandler}
                    className="car-class"
                >
                    <option default value={carOptions[0].id}>{carOptions[0].label}</option>
                    <option value={carOptions[1].id}>{carOptions[1].label}</option>
                </select>
                <span>Pojazd</span>
            </>);
            case 'standard': return (<>
                <select
                    name="carID"
                    value={data.carID}
                    onChange={changeHandler}
                    className="car-class"
                >
                    <option value={carOptions[2].id}>{carOptions[2].label}</option>
                    <option value={carOptions[3].id}>{carOptions[3].label}</option>
                </select>
                <span>Pojazd</span>
            </>);
            case 'medium': return (<>
                <select
                    name="carID"
                    value={data.carID}
                    onChange={changeHandler}
                    className="car-class"
                >
                    <option value={carOptions[4].id}>{carOptions[4].label}</option>
                    <option value={carOptions[5].id}>{carOptions[5].label}</option>
                </select>
                <span>Pojazd</span>
            </>);
            case 'premium': return (<>
                <select
                    name="carID"
                    value={data.carID}
                    onChange={changeHandler}
                    className="car-class"
                >
                    <option value={carOptions[6].id}>{carOptions[6].label}</option>
                    <option value={carOptions[7].id}>{carOptions[7].label}</option>
                </select>
                <span>Pojazd</span>
            </>);
            default: return (<>
                <select
                    name="carID"
                    value={data.carID}
                    onChange={changeHandler}
                    className="car-class"
                >
                    <option value={carOptions[0].id}>{carOptions[0].label}</option>
                    <option value={carOptions[0].id}>{carOptions[1].label}</option>
                </select>
                <span>Pojazd</span>
            </>);
        }
    }

    return (

        <main>
            <h1 className="calc-header">KALKULATOR</h1>
            <p className="calc-info">Skorzystaj z naszego kalkulatora aby obliczyc cenę wyporzyczenia samochodu z naszej wypożyczalni</p>
            <form className="input-handler" onSubmit={submitHandler}>
                <div className="input-single">
                    <input
                        type="number"
                        name="dLicense"
                        id="dLicense"
                        onChange={changeHandler}
                        value={data.dLicense}
                        min={currnetYear - 60}
                        max={currnetYear}

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
                    <span>Szacowana ilość kilowmtrów:</span>

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
                <div className="class-choose">
                    <div>
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
                            <option value="premium">Premium</option>
                        </select>
                        <span>Klasa pojazdu</span>
                    </div>
                    <div>
                        {chceckCarClass()}
                    </div>

                </div>
                <button
                    onClick={ShowCosts}
                    className="summ-btn"
                >OBLICZ</button>
            </form>

            <div id="costs"></div>

        </main>
    )
}