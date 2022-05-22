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

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            feedRequest: undefined,
            youtubeChannel: {
                id: 'UCQsH5XtIc9hONE1BQjucM0g'
            },
        }
        this.fetchFeedReplays().then();
    }

    async fetchFeedReplays() {
        let result = [];
        setTimeout(async () => {
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
                        result.push(
                            {
                                key: i,
                                title: (data['items'][i]['snippet']['title']).length > titleLength ? data['items'][i]['snippet']['title'].substring(0, titleLength) : data['items'][i]['snippet']['title'],
                                views: Math.floor(Math.random() * (660 - 100 + 1) + 100),
                                videoThumb: data['items'][i]['snippet']['thumbnails']['high']['url'],
                            })
                    }
                    this.setState({feedRequest: result});
                }).catch(e => {
                    this.setState({feedRequest: 'error'});
                    this.addNotification("Erreur", "Impossible de récupérer les données.", "info");
                    console.error("WebReplay: Failed to contact API. (Probable Cause: Quota Limit exceeded)\n" +
                        "Trace Error:\n" + e)
                });
        }, 1000);
        return result;
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

                    <Slider
                        title={"Nouveautés"}
                        data={this.state.feedRequest}
                        updateFeedRequest={() => {return this.state.feedRequest}}
                        addNotification={(title, description, type) => this.addNotification(title, description, type)}
                    />
                    <Slider
                        title={"Tendances"}
                        data={this.state.feedRequest}
                        updateFeedRequest={() => {return this.state.feedRequest}}
                        addNotification={(title, description, type) => this.addNotification(title, description, type)}
                    />
                </div>
            </div>
        )
  }
}

export default IndexPage
