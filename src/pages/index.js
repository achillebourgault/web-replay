import * as React from "react"

import './styles/default.css'
import './styles/index.css'

import {Sidebar} from "../components/sidebar/sidebar";
import {Slider} from "../components/slider/slider";
import {Notifications} from "../components/notification/notification";

import {auth} from "../utils/firebase"

import {getReplays} from "../utils/getReplays"

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            feedRequest: undefined,
            apiCall: false,
            youtubeChannel: {
                id: 'UCQsH5XtIc9hONE1BQjucM0g'
            },
        }
        this.fetchFeedReplays().then();
    }

    async fetchFeedReplays() {
        let result = [];

        getReplays().then();
        const userCredentials = await auth.signInWithEmailAndPassword("test@test.fr", "testtest")
        console.log(userCredentials.user)

        setTimeout(async () => {
            await fetch((this.state.apiCall ? "" : "api-call-disabled-") + 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCEaDP8ppihFwcIMzKMbMMEpVLTJRP16dw&channelId='
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
        }, 750);
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
                <Sidebar selected={"index"} />
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
