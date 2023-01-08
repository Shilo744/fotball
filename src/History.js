import React from "react";
import axios from "axios";

class History extends React.Component{
    state={
        interval:setInterval((()=>{this.refresh()}),500)
    }
    info = {
        leaguesHistory: [],
        site:undefined,
        minRound: '',
        maxRound: '',
        oldMinRound: '',
        oldMaxRound: '',
        oldId:''
    }

    getHistory = (props) => {
            axios.get(props.routers.domainRouter + props.routers.historyRouter + props.id)
                .then((response) => {
                    response.data.map((item) => {
                        let homeGoals=0
                        let awayGoals=0

                        item.goals.map((goal) => {
                            goal.home? homeGoals++:awayGoals++
                        })
                        const itemToInsert = {
                            homeTeam: item.homeTeam.name,
                            awayTeam: item.awayTeam.name,
                            homeGoals: homeGoals,
                            awayGoals: awayGoals
                        }
                        this.info.leaguesHistory.push(itemToInsert);
                    })
                })

    }

    changedMinRound =(event) => {
        this.info.minRound=event.target.value
        this.setState({})
    }
    changedMaxRound =(event) => {
            this.info.maxRound=event.target.value
            this.setState({})
    }

     setSite = () => {
        if(this.props.id!==this.info.oldId){
            this.info.leaguesHistory=[]
            this.info.oldId=this.props.id
        this.getHistory(this.props)}
        this.info.site=
                <div className={"marginTop"} onClick={(()=>{this.refresh()})}>
                <div>
                    <input className={"margin"} type={"number"} value={this.info.minRound} onChange={this.changedMinRound} placeholder={"Choose min"}/>
                    <input type={"number"} value={this.info.maxRound} onChange={this.changedMaxRound} placeholder={"Choose max"}/>
                </div>
                    <table className={"table"} >
                        <thead>
                        <td className={"insideHeadline green"}>Home Team</td>
                        <td className={"insideHeadline"}>goals </td>
                        <td className={"insideHeadline red"}>Away Team</td>
                        </thead>
                        {
                            this.info.leaguesHistory.map((item) => {
                                return(
                                    <thead>
                                    <td>{item.homeTeam} </td>
                                    <td>{item.homeGoals} - {item.awayGoals} </td>
                                    <td>{item.awayTeam}</td>
                                    </thead>
                                )
                            })
                        }
                    </table>
                </div>

        return this.info.site
    }
    refresh(){
        this.setState({})
        this.props.change.setState({})
    }
    render() {
        return(
            <il>
                {this.setSite()}
            </il>
        )
    }


}
export default History;