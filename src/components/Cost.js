import React from "react";

function Cost(props) {
    let date = new Date()
    const currnetYear = date.getFullYear()
    const avgFuelPrice = 8

    function dateHandler() {
        let date1 = new Date(props.dateFrom);
        let date2 = new Date(props.dateTo);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays
    }

    function chceckCarClass() {
        let mutiply = 0
        switch (props.carClass) {
            case 'basic': mutiply = 1; break;
            case 'standard': mutiply = 1.3; break;
            case 'medium': mutiply = 1.6; break;
            case 'premium': mutiply = 2; break;
            default: mutiply = 1; break;
        }
        return mutiply
    }

    function checkDrivingLicense() {
        let mutiply = 1
        if (props.dLicense < (currnetYear - 5)) mutiply = 1;
        else mutiply = 1.2;
        return mutiply
    }

    function chcekAvailableCars() {
        let mutiply = 1
        if (props.avaliableModels < 3) {
            mutiply = 1.15
        }
        return mutiply
    }

    const classPaynment = chceckCarClass()
    const licensPaynment = checkDrivingLicense()
    const availabilityPaynment = chcekAvailableCars()

    let fuelPrice = ((props.fuelConsumption * avgFuelPrice) * props.distance).toFixed(2)
    let timePrice = (dateHandler() * props.rentPrice).toFixed(2)
    let netPrice = (((((dateHandler() * props.rentPrice) + ((props.fuelConsumption * avgFuelPrice) * props.distance)) * classPaynment) * licensPaynment) * availabilityPaynment).toFixed(2)
    let grossPrice = (netPrice * 1.23).toFixed(2)


    if (props.dLicense > (currnetYear - 3) && props.carClass === 'premium') {
        alert("Nie możesz wypożyczyć tego samochodu");
        return <div></div>;
    }
    return (
        <>
            <table className="summ-container">
                <tbody>
                    <tr className="summ-single">
                        <td><span>Koszt paliwa:</span></td>
                        <td>{fuelPrice}zł</td>
                    </tr>
                    <tr className="summ-single">
                        <td><span>Koszt za czas wypozyczenia:</span></td>
                        <td>{timePrice}zł</td>
                    </tr>
                    <tr className="summ-single">
                        <td><span>Cena końcowa netto:</span></td>
                        <td>{netPrice}zł</td>
                    </tr>
                    <tr className="summ-single">
                        <td><span>Cena końcowa brutto:</span></td>
                        <td>{grossPrice}zł</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default Cost