import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import HomePage from "./HomePage";
import History from "./History"
import NotFount from "./NotFount";
import Teams from "./Teams";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";


class App extends React.Component {

info={
    start:true,
    key:'',
    pageName:{HomePage:"HomePage",
        Teams:"Teams",
    History:"History"},
    colorOnClick:"white margin bounds",
    usualColor:"gray margin bounds",
    leagues:[],
    selectedOptions: "Options",
    select:null,
    routers:{
        domainRouter: "https://app.seker.live/fm1",
        leaguesListRouter: "/leagues",
        teamRouter: "/teams/" /*+ leagueId*/ ,
        historyRouter: "/history/" /*+ leagueId*/,
        roundRouter: "/round/" /*+leagueId/round*/,
        squadRouter: "/squad/" /*+leagueId/teamId*/,
        teamHistoryRouter: "/history/" /*+ leagueId/teamId*/
    },
}
    colors={
        homepageColor:this.info.colorOnClick,
        teamsColor:this.info.usualColor,
        historyColor:this.info.usualColor
    }

    changeColorOfLink(clicked){

        this.colors.homepageColor=this.info.usualColor
        this.colors.teamsColor=this.info.usualColor
        this.colors.historyColor=this.info.usualColor

        if(clicked===this.info.pageName.HomePage){
            this.colors.homepageColor=this.info.colorOnClick
        }
        else if(clicked===this.info.pageName.Teams){
            this.colors.teamsColor=this.info.colorOnClick
        }
        else if(clicked===this.info.pageName.History){
            this.colors.historyColor=this.info.colorOnClick
        }
        this.refresh()
    }
    getLeagues = () => {
        axios.get(this.info.routers.domainRouter+this.info.routers.leaguesListRouter)
            .then((response) => {
                    return(response.data.map((item) => {
                        const itemToInsert = {
                            id: item.id,
                            name: item.name
                        }
                        this.info.leagues.push(itemToInsert)
                    }))
                }
            )
    }
    leagueEvent = (event) => {
        this.leagueChanged(event.target.value)
    }
    leagueChanged = (key) => {
            this.info.selectedOptions= key
            this.info.key=key
    }
    selectOptions(){
    this.info.select=<select value={this.info.selectedOptions} onChange={this.leagueEvent} onClick={(()=>{this.refresh()})} onMouseOver={(()=>{this.refresh()})} value={this.info.selectedOptions}>
        <option value={"Options"}>{"Options"}</option>
        {
            this.info.leagues.map((league) => {
                return(
                    <option value={league.id}>{league.name}</option>
                )
            })
        }
    </select>
    }
    refresh(){
    this.setState({})
    }
    pageList(){
        if(this.info.start){
            this.getLeagues()
            this.info.start=false
        }
        this.selectOptions()

        return (
                <BrowserRouter>
                    <il className={"headline red"}>----------------</il>
                    <il className={"headlineBackground"}>
                    <il className={"straightLines red"}>|||</il>
                    <il className={"headline blue"}>TWO</il></il>
                    <il className={"headline red"}>-----------------</il>
                    <br/>
                    <il className={"gold text"}>Choose a league </il>
                    {/*כפתור בחירת קבוצה*/}
                    <il>
                        {this.info.select}
                    </il>

                    <br/><br/>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.HomePage)}} className={this.colors.homepageColor} to={"/"}>{this.info.pageName.HomePage}</NavLink>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.Teams)}} className={this.colors.teamsColor} to={this.info.pageName.Teams}>{this.info.pageName.Teams}</NavLink>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.History)}} className={this.colors.historyColor} to={this.info.pageName.History}>{this.info.pageName.History}</NavLink>
                    <Routes>
                        <Route path={"/"} element={<HomePage props={this.info.routers.leaguesListRouter}/>}/>
                        <Route path={"/teams"} element={<Teams domainRouter={this.info.routers.domainRouter} teamRouter={this.info.routers.teamRouter} id={this.info.key}/>}/>
                        <Route path={"/history"} element={<History/>}/>
                        <Route path={"*"} element={<NotFount/>}/>
                    </Routes>
                </BrowserRouter>
        );
    }
  render() {
    return (
        <div className="App">
            {this.pageList()}
      </div>
    );
  }
}
export default App;
