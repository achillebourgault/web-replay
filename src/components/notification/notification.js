import './notification.css'

import * as React from "react";

export class Notifications extends React.Component {

    constructor(props) {
        super(props);
    }

    renderNotifications() {
        return this.props.data.map((element, index) => (
            <div key={element.key}  className={"notification notification-" + element.type}>
                <div className={"notification-progress"} />
                <h3>{element.title}</h3>
                <p>{element.description}</p>
            </div>
        ));
    }

    render() {
        return (
            <div className={"notifications-section"}>
                { this.renderNotifications() }
            </div>
        )
    }
}