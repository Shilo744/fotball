import './App.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import React from "react";
import HomePage from "./HomePage";
import History from "./History"
import NotFount from "./NotFount";
import Teams from "./Teams";
import axios from "axios";
import MostGoals from "./MostGoals";
import Statistics from "./Statistics";

class App extends React.Component {

info={
    start:true,
    key:'',
    pageName:{HomePage:"HomePage",
        Teams:"Teams",
        History:"History",
        MostGoals:"MostGoals",
        Statistics: "Statistics"
    },
    colorOnClick:"white margin bounds",
    usualColor:"gray margin bounds",
    leagues:[],
    selectedOptions: "Options",
    selectorChanged: "Options",
    select:null,
    change:false,
    routers:{
        domainRouter: "https://app.seker.live/fm1",
        leaguesListRouter: "/leagues",
        teamRouter: "/teams/" /*+ leagueId*/ ,
        historyRouter: "/history/" /*+ leagueId*/,
        roundRouter: "/round/" /*+leagueId/round*/,
        squadRouter: "/squad/" /*+leagueId/teamId*/,
    },
}
    colors={
        homepageColor: this.info.colorOnClick,
        teamsColor: this.info.usualColor,
        mostGoalsColor: this.info.usualColor,
        historyColor: this.info.usualColor,
        statisticsColor: this.info.usualColor
    }

    changeColorOfLink(clicked){
        this.colors.homepageColor = this.info.usualColor
        this.colors.teamsColor = this.info.usualColor
        this.colors.mostGoalsColor = this.info.usualColor
        this.colors.historyColor = this.info.usualColor
        this.colors.statisticsColor = this.info.usualColor

        switch (clicked){
            case this.info.pageName.HomePage:{
                this.colors.homepageColor=this.info.colorOnClick;
                break;
            }
            case this.info.pageName.Teams:{
                this.colors.teamsColor=this.info.colorOnClick;
                break;
            }
            case this.info.pageName.History:{
                this.colors.historyColor=this.info.colorOnClick;
                break;
            }
            case this.info.pageName.MostGoals:{
                this.colors.mostGoalsColor=this.info.colorOnClick;
                break;
            }
            case this.info.pageName.Statistics:{
                this.colors.statisticsColor = this.info.colorOnClick
                break
            }
            default:{
                this.colors.homepageColor = this.info.colorOnClick
            }
        }
        this.refresh()
    }
    getLeagues = () => {
    const link=this.info.routers.domainRouter+this.info.routers.leaguesListRouter
        axios.get(link)
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
    showOptions(){
    if(this.info.key===''){
    return <option value={"Options"}>{"Options"}</option>}
    }
    selectOptions(){
    this.info.select=<select value={this.info.selectedOptions} onChange={this.leagueEvent} onClick={(()=>{this.refresh()})}>
        {this.showOptions()}
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
    if(this.info.change){
        this.refresh()
        this.info.change=false
    }
        if(this.info.start){
            this.getLeagues()
            this.info.start=false
        }
        this.selectOptions()

        return (<div onChange={()=>{this.refresh()}}>
                <BrowserRouter>
                    <il className={"headlineBackground"}>
                    <il className={"straightLines red"}>|||</il>
                    <il className={"headline blue"}>TWO</il></il>
                    <br/>
                    <il className={"gold text"}>Choose a league </il>
                    {/*כפתור בחירת קבוצה*/}
                    <il>
                        {this.info.select}
                    </il>

                    <div>
                        <br/>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.HomePage)}} className={this.colors.homepageColor} to={"/"}>{this.info.pageName.HomePage}</NavLink>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.Teams)}} className={this.colors.teamsColor} to={this.info.pageName.Teams}>{this.info.pageName.Teams}</NavLink>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.History)}} className={this.colors.historyColor} to={this.info.pageName.History}>{this.info.pageName.History}</NavLink>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.MostGoals)}} className={this.colors.mostGoalsColor} to={this.info.pageName.MostGoals}>{this.info.pageName.MostGoals}</NavLink>
                    <NavLink onClick={()=>{this.changeColorOfLink(this.info.pageName.Statistics)}} className={this.colors.statisticsColor} to={this.info.pageName.Statistics}>{this.info.pageName.Statistics}</NavLink>

                    </div>
                    {this.routers()}

                </BrowserRouter>
        </div>
        );
    }
    routers(){

    const routers=<Routes>
        <Route path={"/"} element={<HomePage props={this.info.routers.leaguesListRouter}/>}/>
        <Route path={"/teams"} element={<Teams routers={this.info.routers} id={this.info.key} change={this.state}/>}/>
        <Route path={"/historyToShow"} element={<History id={this.info.key}/>}/>
        <Route path={"/mostGoals"} element={<MostGoals routers={this.info.routers} id={this.info.key} change={this.state}/>}/>
        <Route path={"/statistics"} element={<Statistics/>}/>
        <Route path={"*"} element={<NotFount/>}/>
    </Routes>
    return routers
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
