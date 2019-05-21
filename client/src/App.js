import React, {Component, useEffect} from 'react';
import { Layout, Menu, Icon, Divider } from 'antd';
import Nav from "./components/SharedAcrossSections/Nav/Nav";
import Home from "./components/HomeSection/Home/Home";
import News from "./components/NewsSection/News/News";
import Product from "./components/ProductSection/Product/Product";
import PropTypes from "prop-types";
import {Route, Switch, withRouter} from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";
import { useStore, useActions } from 'easy-peasy';
import './App.scss';
import AuthModal from "./components/SharedAcrossSections/AuthModal/AuthModal";
import Crypto from "./components/FinanceSection/Crypto/Crypto";

const { SubMenu, ItemGroup } = Menu;
const { Sider } = Layout;

function App({location}) {
    const propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    let { isMenuOpen, selectedMenuItem } = useStore(state => state.menu);
    let { currentUser } = useStore(state => state.auth);
    const { setMenuItem } = useActions(actions => actions.menu);
    const { setCurrentUser } = useActions(actions => actions.auth);

    async function fetchCurrentUser(){
        const result = await axios.get('http://localhost:5000/api/current_user');
        if (result.data.success === true){
            if (result.data.user){
                setCurrentUser(result.data.user)
            }
        }
    }

    const onTitleClick = () => {
        console.log("HELLO");
    };

    useEffect( () => {
        fetchCurrentUser();
    }, []);

    const path = location && location.pathname;
    const category = path && path.split("/")[1];

    if (category){
        selectedMenuItem = category;
        if (path.split("/")[2]){
            selectedMenuItem = path.split("/")[2]
        }

        if (path.split("/")[3]){
            selectedMenuItem = selectedMenuItem + '-' + path.split("/")[3];
        }

        if (path.split("/")[4]){
            selectedMenuItem = selectedMenuItem + '-' + path.split("/")[4];
        }
    }

    return (
        <div className="App">
            <Layout className="main" tagName="main">
                <Nav />
                <Layout tagName="body">
                    <Sider className={"sideBar " + (isMenuOpen ? "":"hideSideMenu")}>
                        <Menu
                            defaultSelectedKeys={[selectedMenuItem]}
                            mode="vertical"
                        >
                            <Menu.Item key="home">
                                <Link to="/home" onClick={() => setMenuItem("home")}>
                                    <Icon type="home" theme="filled" />Home
                                </Link>
                            </Menu.Item>
                            <Divider>Categories</Divider>
                            <SubMenu key="tech" title="Tech" >
                                <Menu.Item key="tech-ai-artificial-intelligence">
                                    <Link to="/news/tech/ai-artificial-intelligence/" onClick={() => setMenuItem("ai-artificial-intelligence")}>
                                        Artificial Intelligence
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="tech-vr-virtual-reality">
                                    <Link to="/news/tech/vr-virtual-reality/" onClick={() => setMenuItem("vr-virtual-reality")}>
                                        AR/VR
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="tech-blockchain">
                                    <Link to="/news/tech/blockchain/" onClick={() => setMenuItem("blockchain")}>
                                        Blockchain
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="tech-bigdata">
                                    <Link to="/news/tech/bigdata/" onClick={() => setMenuItem("bigdata")}>
                                        Big Data
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="tech-cloud">
                                    <Link to="/news/tech/cloud/" onClick={() => setMenuItem("cloud")}>
                                        Cloud Computing
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="reviews" title="Reviews" >
                                <Menu.Item key="reviews-phone-review">
                                    <Link to="/news/reviews/phone-review/" onClick={() => setMenuItem("phone-review")}>
                                        Smaprtphones
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="reviews-home">
                                    <Link to="/news/reviews/home/" onClick={() => setMenuItem("home")}>
                                        Smart Speakers
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="reviews-headphone-review">
                                    <Link to="/news/reviews/headphone-review/" onClick={() => setMenuItem("headphone-review")}>
                                        Headphones
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="reviews-laptop-review">
                                    <Link to="/news/reviews/laptop-review/" onClick={() => setMenuItem("laptop-review")}>
                                        Laptops
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="reviews-drones">
                                    <Link to="/news/reviews/drones/" onClick={() => setMenuItem("drones")}>
                                        Drones
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="business" title="Business">
                                <Menu.Item key="business-startups">
                                    <Link to="/news/business/startups/" onClick={() => setMenuItem("startups")}>
                                        Startups
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="business-google">
                                    <Link to="/news/business/google/" onClick={() => setMenuItem("google")}>
                                        Google
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="business-facebook">
                                    <Link to="/news/business/facebook/" onClick={() => setMenuItem("facebook")}>
                                        Facebook
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="business-apple">
                                    <Link to="/news/business/apple/" onClick={() => setMenuItem("apple")}>
                                        Apple
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="business-amazon">
                                    <Link to="/news/business/amazon/" onClick={() => setMenuItem("amazon")}>
                                        Amazon
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="business-microsoft">
                                    <Link to="/news/business/microsoft/" onClick={() => setMenuItem("microsoft")}>
                                        Microsoft
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="business-tesla">
                                    <Link to="/news/business/tesla/" onClick={() => setMenuItem("tesla")}>
                                        Tesla
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="culture" title="Culture">
                                <Menu.Item key="culture-internet-culture">
                                    <Link to="/news/culture/internet-culture/" onClick={() => setMenuItem("internet-culture")}>
                                        Internet
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="culture-tv">
                                    <Link to="/news/culture/tv/" onClick={() => setMenuItem("tv")}>
                                        TV
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="culture-games">
                                    <Link to="/news/culture/games/" onClick={() => setMenuItem("games")}>
                                        Games
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="culture-film">
                                    <Link to="/news/culture/film/" onClick={() => setMenuItem("film")}>
                                        Film
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="culture-music">
                                    <Link to="/news/culture/music/" onClick={() => setMenuItem("music")}>
                                        Music
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="culture-comics">
                                    <Link to="/news/culture/comics/" onClick={() => setMenuItem("comics")}>
                                        Comics
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="transportation" title="Transportation">
                                <Menu.Item key="transportation-autonomous-cars">
                                    <Link to="/news/transportation/autonomous-cars/" onClick={() => setMenuItem("autonomous-cars")}>
                                        Self-driving Cars
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="transportation-planes">
                                    <Link to="/news/transportation/planes/" onClick={() => setMenuItem("planes")}>
                                        Aviation
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="transportation-cars">
                                    <Link to="/news/transportation/cars/" onClick={() => setMenuItem("cars")}>
                                        Cars
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="transportation-ride-sharing">
                                    <Link to="/news/transportation/ride-sharing/" onClick={() => setMenuItem("ride-sharing")}>
                                        Ride Sharing
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="transportation-scooters">
                                    <Link to="/news/transportation/scooters/" onClick={() => setMenuItem("scooters")}>
                                        Rideables
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="transportation-electric-cars">
                                    <Link to="/news/transportation/electric-cars/" onClick={() => setMenuItem("electric-cars")}>
                                        Electric Cars
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="newsfinance" title="Finance">
                                <Menu.Item key="finance-crypto">
                                    <Link to="/news/finance/crypto/" onClick={() => setMenuItem("crypto")}>
                                        Crypto
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="finance-venture">
                                    <Link to="/news/finance/venture/" onClick={() => setMenuItem("venture")}>
                                        Venture Capital
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="science" title="Science">
                                <Menu.Item key="science-space">
                                    <Link to="/news/science/space/" onClick={() => setMenuItem("space")}>
                                        Space
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="science-energy">
                                    <Link to="/news/science/energy/" onClick={() => setMenuItem("energy")}>
                                        Energy
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="science-health">
                                    <Link to="/news/science/health/" onClick={() => setMenuItem("health")}>
                                        Health
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="science-nasa">
                                    <Link to="/news/science/nasa/" onClick={() => setMenuItem("nasa")}>
                                        NASA
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="science-spacex">
                                    <Link to="/news/science/spacex/" onClick={() => setMenuItem("spacex")}>
                                        SpaceX
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="security" title="Security">
                                <Menu.Item key="security-hacking">
                                    <Link to="/news/security/hacking/" onClick={() => setMenuItem("hacking")}>
                                        Hacking
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="security-privacy">
                                    <Link to="/news/security/privacy/" onClick={() => setMenuItem("privacy")}>
                                        Privacy
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="security-policy">
                                    <Link to="/news/security/policy/" onClick={() => setMenuItem("policy")}>
                                        Policy
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Divider/>
                        </Menu>
                    </Sider>
                    <Layout tagName="content">
                        <div className="app-content">
                            <AuthModal/>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route path='/home' component={Home}/>
                                <Route path='/news/:category/:subcategory'
                                       render={(props) => <News {...props} key={location.key} />}
                                />
                                <Route path='/products/:category/:brand/:item'
                                       render={(props) => <Product {...props} key={location.key} />}
                                />
                                <Route path='/finance/:category/'
                                       render={(props) => <Crypto {...props} key={location.key} />}
                                />
                            </Switch>
                        </div>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default withRouter( App );
