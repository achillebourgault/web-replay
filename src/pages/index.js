import * as React from "react"

import './styles/default.css'
import './styles/index.css'

import {Sidebar} from "../components/sidebar/sidebar";
import {Slider} from "../components/slider/slider";
import {Notifications} from "../components/notification/notification";

// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";

// // TODO: Replace with app's Firebase project configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCEaDP8ppihFwcIMzKMbMMEpVLTJRP16dw",
//     authDomain: "web-replay.firebaseapp.com",
//     // The value of `databaseURL` depends on the location of the database
//     databaseURL: "https://DATABASE_NAME.firebaseio.com",
//     projectId: "web-replay",
//     messagingSenderId: "SENDER_ID",
//     appId: "APP_ID",
//     // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
//     measurementId: "G-MEASUREMENT_ID",
// };
//
// const app = initializeApp(firebaseConfig);
//
// // Get a reference to the database service
// const database = getDatabase(app);

const fetchFeedRequest = async () => {
    let data = [];
    await fetch('rhttps://www.googleapis.com/youtube/v3/search?key=AIzaSyCEaDP8ppihFwcIMzKMbMMEpVLTJRP16dw&channelId='
        + this.state.youtubeChannel.id + '&part=snippet,id&order=date&maxResults=20', {
        method: 'GET'
    })
        .then(response => response.json())
        .then((data) => {
            const titleLength = 36;

            if (!data)
                return
            for (let i = 0; data['items'][i] !== undefined; i++) {
                data.push(
                    {
                        key: i,
                        title: (data['items'][i]['snippet']['title']).length > titleLength ? data['items'][i]['snippet']['title'].substring(0, titleLength) : data['items'][i]['snippet']['title'],
                        views: Math.floor(Math.random() * (660 - 100 + 1) + 100),
                        videoThumb: data['items'][i]['snippet']['thumbnails']['high']['url'],
                    })
            }
            return data;
        }).catch(e => {
            this.props.addNotification("Erreur", "Impossible de récupérer les données.", "info");
            console.error("WebReplay: Failed to contact API. (Probable Cause: Quota Limit exceeded)\n" +
                "Trace Error:\n" + e)
            this.setState({itemsData: 'error'})
            return null;
        });
}

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            feedRequest: null
        }
    }

    addNotification(title, description, type) {
        const notification = {
            key: this.state.notifications.length,
            title: title,
            description: description,
            type: type
        }
        this.state.notifications.push(notification)
        this.setState({notifications: this.state.notifications})
        setTimeout(() => {
            this.setState({notifications: this.state.notifications.filter(function(notif) {
                    return notif !== notification
                })});
        }, 1000 * 5)
    }

    render() {
        return (
            <div style={{background: '#E7ECEF'}}>
                <Notifications data={this.state.notifications} />
                <Sidebar />
                <div className={"view-content"}>
                    <h1 className={"view-title"}>Fil d'actualité</h1>

                    <Slider addNotification={(title, description, type) => this.addNotification(title, description, type)} title={"Nouveautés"}/>
                    <Slider addNotification={(title, description, type) => this.addNotification(title, description, type)} title={"Tendances"}/>
                </div>
            </div>
        )
  }
}

export default IndexPage
