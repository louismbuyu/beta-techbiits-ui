import React from 'react';
import './FinanceBanner.scss';
import fiat from '../../../assets/images/fiat.jpg';
import bitcoin from '../../../assets/images/bitcoin1.jpg';
import FinanceDemoChart from "../FinanceDemoChart/FinanceDemoChart";

function FinanceBanner(props) {
    return (
        <div className="FinanceBanner">
            <div className="financeContainer">
                <div className="finText1">
                    Finance
                </div>
                <div className="finText2">
                    <span className="logoRed">Fiat</span> vs <span className="logoBlue">Crypto</span> Currency
                </div>
                <div className="finChart">
                    <FinanceDemoChart/>
                </div>
                <div className="finImage2">
                    <img className="finImg2" src={fiat} alt="finImage2"/>
                </div>
                <div className="finImage3">
                    <img className="finImg3" src={bitcoin} alt="finImage3"/>
                </div>
            </div>

        </div>
    );
}

export default FinanceBanner;