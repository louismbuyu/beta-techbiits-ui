import React, {useEffect, useState} from 'react';
import './FinanceDemoChart.scss';
import ReactEcharts from 'echarts-for-react';
import echart from "echarts";
import axios from "axios";
import moment from 'moment';

function FinanceDemoChart(props) {

    const [realTimeDatumDates, setRealTimeDatumDates] = useState([]);
    const [realTimeDatumValues, setRealTimeDatumValues] = useState([]);
    const [coin, setCoin] = useState('5c9f1e15282f2c000c10de02');
    const [currency, setCurrency] = useState('USD');
    const [period, setPeriod] = useState('1-days');

    async function fetchChartData(coin,currency,period){
        //const result = await axios.post('https://dev-tech.now.sh/',{page:1, count:20,mainCategory:category, mainSubcategory:subcategory});
        const result = await axios.post(' http://localhost:5000/api/coins/getdatums',{
            coin,
            currency,
            period
        });
        if (result.data.success === true){
            if (result.data.realTimeDatumDates){
                let formattedDates = result.data.realTimeDatumDates.map((v,index) => {
                    return moment(v).format('D/M HH:mm');
                });
                setRealTimeDatumDates(formattedDates)
            }

            if (result.data.realTimeDatumValues){
                setRealTimeDatumValues(result.data.realTimeDatumValues)
            }
        }
    }

    useEffect( () => {
        fetchChartData(coin,currency,period);
    }, []);

    const option = {
        title: {
            text: 'Bitcoin',
            left: 'center'
        },
        xAxis: {
            data: realTimeDatumDates
        },
        yAxis: {
            scale: true,
            name: 'USD Dollar ($)'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        },
        series: [{
            type:'line',
            data: realTimeDatumValues,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            }
        }]
    };

    return (
        <div className="FinanceDemoChart">
            <ReactEcharts
                option={option}
                style={{height: '200px', width: '100%', padding: '0px !important', margin:'0px !important'}}
                className='chart' />
        </div>
    );
}

export default FinanceDemoChart;