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
            itemsData: null
        }
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

                        { this.props.data === undefined || this.props.data === 'error' ?
                            <div className={"slider-error"}>
                                <div className={"slider-placeholder-list"}>
                                    <div className={"slider-placeholder"} />
                                    <div className={"slider-placeholder"} />
                                    <div className={"slider-placeholder"} />
                                </div>
                                { this.props.data === 'error' ?
                                    <h3>Impossible de récupérer les <b>replays</b> ({this.props.title})</h3>
                                        :
                                    <span />
                                }
                            </div>
                            :
                            <span />}

                    </div>
                </main>

            </div>
        )
    }

    renderData() {
        return this.props.data !== undefined && this.props.data !== 'error' ? this.props.data.map((element, index) => (
            <div key={element.key} className={"item item" + index}
                 style={{backgroundImage: 'url(' + element.videoThumb + ')'}}>
                <div className={"item-details"}>
                    <h3>{element.title}</h3>
                    <p><strong>{element.views}</strong> Vues</p>
                </div>
            </div>
        )) : <div />

    }

    onMouseDownF(e) {
        if (this.props.data === undefined || this.props.data === 'error')
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    onMouseLeaveF(e) {
        if (this.props.data === undefined || this.props.data === 'error')
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = false;
        slider.classList.remove('active');
    }

    onMouseUpF(e) {
        if (this.props.data === undefined || this.props.data === 'error')
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        isDown = false;
        slider.classList.remove('active');
    }

    onMouseMoveF(e) {
        if (this.props.data === undefined || this.props.data === 'error')
            return;
        const slider = document.querySelector('.items-' + this.state.id);

        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    }
}
