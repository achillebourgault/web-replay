import * as React from "react";

import './slider.scss'
import {IoArrowForwardOutline} from "react-icons/all";
import IndexPage, {addNotification} from "../../pages";

let isDown = false;
let startX;
let scrollLeft;
let itemsData = [];

export class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: Math.floor(Math.random() * (666666 - 0 + 1) + 0),
            youtubeChannel: {
                id: 'UCQsH5XtIc9hONE1BQjucM0g'
            },
            itemsData: null
        }

        setTimeout(() => {
            this.fetchData().then();
        }, 1000)
    }

    render() {
        return (
            <div className={"slider-main"}>

                <main className="grid-item main">
                    <p className={"slider-title"}>{this.props.title} <span><a href={"#"}>Tout voir <IoArrowForwardOutline /></a> </span></p>

                    <div className={"items items-" + this.state.id}
                         onMouseDown={(e) => this.onMouseDownF(e)}
                         onMouseLeave={(e) => this.onMouseLeaveF(e)}
                         onMouseUp={(e) => this.onMouseUpF(e)}
                         onMouseMove={(e) => this.onMouseMoveF(e)}
                    >
                        { this.renderData() }

                        { itemsData.length === 0 ?
                            <div className={"slider-error"}>
                                <div className={"slider-placeholder-list"}>
                                    <div className={"slider-placeholder"} />
                                    <div className={"slider-placeholder"} />
                                    <div className={"slider-placeholder"} />
                                </div>
                                { this.state.itemsData === 'error' ? <h3>Impossible de récupérer les <b>replays</b>.</h3> : <span /> }
                            </div>
                            :
                            <span />}

                    </div>
                </main>

            </div>
        )
    }

    async fetchData() {
        if (itemsData.length !== 0) {
            return;
        }
        await fetch('rhttps://www.googleapis.com/youtube/v3/search?key=AIzaSyCEaDP8ppihFwcIMzKMbMMEpVLTJRP16dw&channelId='
            + this.state.youtubeChannel.id +'&part=snippet,id&order=date&maxResults=20', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                const titleLength = 36;

                if (!data)
                    return
                for (let i = 0; data['items'][i] !== undefined; i++) {
                    itemsData.push(
                        {
                            key: i,
                            title: (data['items'][i]['snippet']['title']).length > titleLength ? data['items'][i]['snippet']['title'].substring(0, titleLength) : data['items'][i]['snippet']['title'],
                            views: Math.floor(Math.random() * (660 - 100 + 1) + 100),
                            videoThumb: data['items'][i]['snippet']['thumbnails']['high']['url'],
                        })
                }
                this.setState({itemsData: itemsData})
            }).catch(e => {
                this.props.addNotification("Erreur", "Impossible de récupérer les données.", "info");
                console.error("WebReplay: Failed to contact API. (Probable Cause: Quota Limit exceeded)\n" +
                    "Trace Error:\n" + e)
                this.setState({itemsData: 'error'})
            });

    }

    renderData() {
        // if (this.state.itemsData === 'error')
        //     return
        return itemsData.map((element, index) => (
            <div className={"item item" + index} style={{backgroundImage: 'url(' + element.videoThumb + ')'}}>
                <div className={"item-details"}>
                    <h3>{element.title}</h3>
                    <p><strong>{element.views}</strong> Vues</p>
                </div>
            </div>
        ));

    }

    onMouseDownF(e) {
        if (itemsData.length === 0)
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    onMouseLeaveF(e) {
        if (itemsData.length === 0)
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = false;
        slider.classList.remove('active');
    }

    onMouseUpF(e) {
        if (itemsData.length === 0)
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = false;
        slider.classList.remove('active');
    }

    onMouseMoveF(e) {
        if (itemsData.length === 0)
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    }
}