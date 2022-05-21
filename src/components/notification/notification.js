import './notification.css'

import * as React from "react";

export class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.renderSidebarLinks.bind(this);
        this.state = {
            company: {
                companyLogoUrl: 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
                companyName: 'Foot Feminin Douaisis'
            }
        }
    }

    render() {
        return (
            <div className={"sidebar"}>

            </div>
        )
    }
}