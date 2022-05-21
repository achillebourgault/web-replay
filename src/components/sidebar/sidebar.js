import './sidebar.css'

import * as React from "react";
import {RiGooglePlayFill, RiKeyboardFill, RiListSettingsLine} from "react-icons/all";

export class Sidebar extends React.Component {

    renderSidebarLinks() {
        return (
            <div className={"sidebar-content-nav"}>
                <h4 className={"sidebar-content-title"}>REPLAYS DES MATCHS</h4>
                <div className={"sidebar-content-list"}>
                    <button href={this.state.navigation.home.url} className={this.state.navigation.home.selected ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <span className={"list-icon"}><RiKeyboardFill /></span>Fil d'actualité
                    </button>
                    <button href={this.state.navigation.replays.url} className={this.state.navigation.replays.selected ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <span className={"list-icon"}><RiGooglePlayFill /></span>Replays
                    </button>
                    <button href={this.state.navigation.settings.url} className={this.state.navigation.settings.selected ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <span className={"list-icon"}><RiListSettingsLine /></span>Paramètres

                    </button>
                </div>

                <h4 className={"sidebar-content-title"} style={{marginTop: 26}}>NOUVEAUTES</h4>
                <div className={"sidebar-content-list"}>
                    <button href={this.state.navigation.home.url} className={this.state.navigation.home.selected ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <span className={"list-icon"}><RiKeyboardFill /></span>Derniers replays
                    </button>
                    <button href={this.state.navigation.replays.url} className={this.state.navigation.replays.selected ? "sidebar-content-link sidebar-selected" : "sidebar-content-link"}>
                        <span className={"list-icon"}><RiGooglePlayFill /></span>Tendances
                    </button>
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