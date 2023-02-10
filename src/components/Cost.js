import React from "react";

function Cost(props) {
    var date = new Date()
    const currnetYear = date.getFullYear()
    const avgFuelPrice = 8
    
    const multiplier = chceckCarClass()
    const licensPaynment = drivingLicense()
    

    function dateHandler() {
        var date1 = new Date(props.dateFrom);
        var date2 = new Date(props.dateTo);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays
    }

    function chceckCarClass() {
        var mnoznik = 0
        switch (props.carClass) {
            case 'basic': mnoznik = 1; break;
            case 'standard': mnoznik = 1.3; break;
            case 'medium': mnoznik = 1.6; break;
            case 'premium': mnoznik = 2; break;
            default: mnoznik = 1; break;
        }
        return mnoznik
    }

    function drivingLicense() {
        var mnozik = 1
        if (props.dLicense < (currnetYear - 5)) mnozik = 1;
        else mnozik = 1.2;
        return mnozik
    }

   
        let fuelPrice = ((props.fuelConsumption * avgFuelPrice) * props.distance).toFixed(2)
        let timePrice = (dateHandler() * props.rentPrice).toFixed(2)
        let netPrice = ((((dateHandler() * props.rentPrice) + ((props.fuelConsumption * avgFuelPrice) * props.distance)) * multiplier) * licensPaynment).toFixed(2)
        let grossPrice = (((((dateHandler() * props.rentPrice) + ((props.fuelConsumption * avgFuelPrice) * props.distance)) * multiplier) * licensPaynment) * 1.23).toFixed(2)
    

    if (props.dLicense > (currnetYear - 3)&&props.carClass==='premium') {
        alert("Nie możesz wypożyczyć tego samochodu");
        return <div></div>;
    }

    return(
        <>
        <table className="summ-container">
                <tr className="summ-single">
                    <td><h4>Koszt paliwa:</h4></td>
                    <td>{fuelPrice}zł</td>
                </tr>
                <tr className="summ-single">
                    <td><h4>Koszt za czas wypozyczenia:</h4></td>
                    <td>{timePrice}zł</td>
                </tr>
                <tr className="summ-single">
                    <td><h4>Cena końcowa netto:</h4></td>
                    <td>{netPrice}zł</td>
                </tr>
                <tr className="summ-single">
                    <td><h4>Cena końcowa brutto:</h4></td>
                    <td>{grossPrice}zł</td>
                </tr>
            </table>
        </>
    )

}
export default Cost