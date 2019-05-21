import React, {useEffect, useState} from 'react';
import ReactEcharts from 'echarts-for-react';
import echart from 'echarts';
import {Icon, Select} from 'antd';
import './FinanceChart.scss';
import {Col, Divider, Row, Radio} from "antd";
import axios from "axios";
import moment from "moment";

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FinanceChart = (props) => {

    const GREEN = '#2ECC71';
    const RED2 = '#FD1050';
    const RED = '#E74C3C';

    const [datumDates, setDatumDates] = useState([]);
    const [datumValues, setDatumValues] = useState([]);
    const [realTimeDatumDates, setRealTimeDatumDates] = useState([]);
    const [realTimeDatumValues, setRealTimeDatumValues] = useState([]);
    const [coin, setCoin] = useState('5c9f1e15282f2c000c10de02');
    const [selectedCoin, setSelectedCoin] = useState({
        "_id": "5c9f1e15282f2c000c10de02",
        "idName": "bitcoin",
        "symbol": "btc",
        "displayName": "Bitcoin",
        "imageUrl": "https://i.ibb.co/KVW0DvN/bitcoin.jpg"
    });
    const [currency, setCurrency] = useState('USD');
    const [period, setPeriod] = useState('33-days');
    const [chartType, setChartType] = useState(true);

    async function fetchChartData(coin,currency,period){
        //const result = await axios.post('https://dev-tech.now.sh/',{page:1, count:20,mainCategory:category, mainSubcategory:subcategory});
        const result = await axios.post(' http://localhost:5000/api/coins/getdatums',{
            coin,
            currency,
            period
        });
        if (result.data.success === true){
            console.log(result.data);

            if (result.data.datumDates){
                setDatumDates(result.data.datumDates)
            }

            if (result.data.datumValues){
                setDatumValues(result.data.datumValues)
            }

            if (result.data.realTimeDatumDates){
                let formattedDates = result.data.realTimeDatumDates.map((v,index) => {
                    return moment(v).format('DD-MMM-YYYY HH:mm');
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
        xAxis: {
            data: datumDates
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
            type: 'candlestick',
            data: datumValues,
            itemStyle: {
                normal: {
                    color: GREEN,
                    color0: RED,
                    borderColor: GREEN,
                    borderColor0: RED
                }
            }
        }]
    };

    const realTimeOption = {
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

    const handlePeriodChange = (value) => {
        console.log(`selected ${value}`);
        setPeriod(value);
        fetchChartData(coin,currency,value);
    };

    const selectCoinChange = (value) => {
        console.log(`selected ${value}`);
        setCoin(value);
        const item = props.coins.find(i => i._id === value);
        setSelectedCoin(item);
        fetchChartData(value,currency,period);
    };

    const handleCurrencyChange = (value) => {
        console.log(`selected ${value}`);
        setCoin(value);
        //fetchChartData(coin,currency,period);
    };

    const onChartChange = (e) => {
        if (e.target.value === "stock"){
            setChartType(true);
        }
        if (e.target.value === "candlestick"){
            setChartType(false);
        }
    };

    return (
        <div className="FinanceChart">
            <div className="chartContainer">
                <div className="chartHeader">
                    <Row gutter={16} type="flex" align="middle">
                        <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="chartTitleContainer">
                                <img className="chartImage" src={selectedCoin.imageUrl} alt="chartImage"/>
                                <div className="chartTitle">
                                    {selectedCoin.displayName}
                                </div>
                            </div>
                        </Col>
                        <Col className="column filterColumn" xs={8} sm={8} md={4} lg={4} xl={4}>
                            <div className="filterContainer">
                                <div className="selectTitle typeTitle">
                                    Type
                                </div>
                                <RadioGroup className="typeActions" onChange={onChartChange} defaultValue="stock" size="medium">
                                    <RadioButton value="stock"><Icon type="stock" /></RadioButton>
                                    <RadioButton value="candlestick"><Icon type="sliders" /></RadioButton>
                                </RadioGroup>
                            </div>
                        </Col>
                        <Col className="column filterColumn" xs={8} sm={8} md={4} lg={4} xl={4}>
                            <div className="filterContainer">
                                <div className="selectTitle coinTitle">
                                    Coins
                                </div>
                                <Select defaultValue={'Bitcoin'} onChange={selectCoinChange}>
                                    {
                                        props.coins.map((v) => {
                                            return (<Option key={v._id} value={v._id}>{v.displayName}</Option>)
                                        })
                                    }
                                </Select>
                            </div>
                        </Col>
                        <Col className="column filterColumn" xs={8} sm={8} md={4} lg={4} xl={4}>
                            <div className="filterContainer">
                                <div className="selectTitle periodTitle">
                                    Period
                                </div>
                                <Select defaultValue={period} onChange={handlePeriodChange} disabled={chartType}>
                                    <Option value="3-days">1 Day</Option>
                                    <Option value="8-days">1 Week</Option>
                                    <Option value="33-days">1 Month</Option>
                                    <Option value="3-month">3 Month</Option>
                                    <Option value="6-month">6 Month</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="customDivider"/>
                <div className="chartBody">
                    <ReactEcharts
                        option={chartType ? realTimeOption : option}
                        style={{height: '440px', width: '100%'}}
                        className='chart' />
                </div>
            </div>
        </div>
    );
};

export default FinanceChart;
    