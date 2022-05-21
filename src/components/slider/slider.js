import * as React from "react";

import './slider.scss'
import {IoArrowForwardOutline} from "react-icons/all";

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

        this.fetchData().then();
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



                        { itemsData.length == 0 ? <h3>Wezffdgfds</h3> : <span />}
                    </div>
                </main>

            </div>
        )
    }

    async fetchData() {
        if (itemsData.length != 0) {
            console.log("Cancel ask to api")
            return;
        }
        await fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyCEaDP8ppihFwcIMzKMbMMEpVLTJRP16dw&channelId='
            + this.state.youtubeChannel.id +'&part=snippet,id&order=date&maxResults=20', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                const titleLength = 36;

                if (!data)
                    return
                for (let i = 0; data['items'][i] != undefined; i++) {
                    // console.log(data['items'][i])
                    console.log(data['items'][i]['snippet']['channelId'])

                    itemsData.push(
                        {
                            title: (data['items'][i]['snippet']['title']).length > titleLength ? data['items'][i]['snippet']['title'].substring(0, titleLength) : data['items'][i]['snippet']['title'],
                            views: Math.floor(Math.random() * (660 - 100 + 1) + 100),
                            videoThumb: data['items'][i]['snippet']['thumbnails']['high']['url'],
                        })
                }

                this.setState({itemsData: itemsData})
                // alert(data[0].items.snippet.title)
            }).catch(e => {
                return
            });

    }

    renderData() {
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
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    onMouseLeaveF(e) {
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = false;
        slider.classList.remove('active');
    }

    onMouseUpF(e) {
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = false;
        slider.classList.remove('active');
    }

    onMouseMoveF(e) {
        const slider = document.querySelector('.items-' + this.state.id);

        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
    }
}