import './sidebar.css'

import * as React from "react";
import {RiGooglePlayFill, RiKeyboardFill, RiListSettingsLine} from "react-icons/all";
import {Link} from "gatsby";

export class Sidebar extends React.Component {

    renderSidebarLinks() {
        return (
            <div className={"sidebar-content-nav"}>
                <h4 className={"sidebar-content-title"}>REPLAYS DES MATCHS</h4>
                <div className={"sidebar-content-list"}>
                    <Link to={"/"} className={this.props.selected === 'index' ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <div style={{marginLeft: 28, display: 'flex', flexDirection: 'row'}}>
                            <span className={"list-icon"}><RiKeyboardFill /></span>Fil d'actualité
                        </div>
                    </Link>
                    <Link to={"/replays"} className={this.props.selected === 'replays' ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <div style={{marginLeft: 28, display: 'flex', flexDirection: 'row'}}>
                            <span className={"list-icon"}><RiGooglePlayFill /></span>Replays
                        </div>
                    </Link>
                    <Link to={"/settings"} className={this.props.selected === 'settings' ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <div style={{marginLeft: 28, display: 'flex', flexDirection: 'row'}}>
                            <span className={"list-icon"}><RiListSettingsLine /></span>Paramètres
                        </div>
                    </Link>
                </div>

                <h4 className={"sidebar-content-title"} style={{marginTop: 26}}>NOUVEAUTES</h4>
                <div className={"sidebar-content-list"}>
                    <Link to={"/settings"} className={this.props.selected === 'settings' ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <div style={{marginLeft: 28, display: 'flex', flexDirection: 'row'}}>
                            <span className={"list-icon"}><RiListSettingsLine /></span>Derniers replays
                        </div>
                    </Link>
                    <Link to={"/trends"} className={this.props.selected === 'settings' ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <div style={{marginLeft: 28, display: 'flex', flexDirection: 'row'}}>
                            <span className={"list-icon"}><RiListSettingsLine /></span>Tendances
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.renderSidebarLinks.bind(this);
        this.state = {
            company: {
                companyLogoUrl: 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
                companyName: 'Foot Feminin Douaisis'
            },
            navigation: {
                home: {
                    url: '/home',
                    selected: true,
                },
                welcome: {
                    url: '/welcome',
                    selected: false,
                },
                replays: {
                    url: '/replays',
                    selected: false,
                },
                settings: {
                    url: '/settings',
                    selected: false,
                },
                news: {
                    url: '/news',
                    selected: false,
                },
                tendances: {
                    url: '/tendances',
                    selected: false,
                }
            }
        }
    }

    render() {
        return (
            <div className={"sidebar"}>
                <div className={"sidebar-header"}>
                    <img className={"sidebar-company-logo"} src={this.state.company.companyLogoUrl}/>
                    <h3 className={"sidebar-description"}>{this.state.company.companyName}</h3>
                </div>

                <div className={"sidebar-content"}>
                    { this.renderSidebarLinks() }
                </div>

            </div>
        )
    }
}
