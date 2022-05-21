import * as React from "react"

import './styles/default.css'
import './styles/index.css'

import {Sidebar} from "../components/sidebar/sidebar";
import {Slider} from "../components/slider/slider";


export class IndexPage extends React.Component {

  render() {
    return (
        <div style={{background: '#E7ECEF'}}>
          <Sidebar />
          <div className={"view-content"}>
              <h1 className={"view-title"}>Fil d'actualité</h1>

              <Slider title={"Nouveautés"}/>
              <Slider title={"Tendances"}/>
              <Slider title={"Tendances"}/>
          </div>
        </div>
    )
  }
}

export default IndexPage
