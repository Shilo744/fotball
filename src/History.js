import React from "react";
import axios from "axios";

class History extends React.Component{
    state = {
        teamsId: [],
        leaguesHistory: [],
        listHistory: [],
        counterGoals: 0,
    }

    getHistory = (props) => {
        if(props.id !== ''){
            axios.get(props.domainRouter + props.teamRouter + props.id)
                .then((response) => {
                    response.data.map((item) => {
                        this.state.teamsId.push(item.id);
                    })
                })
            this.state.teamsId.map((teamId) => {

                axios.get(props.domainRouter + props.historyRouter + props.id + '/' + teamId)
                    .then((response) => {
                        response.data.map((team) => {
                            if (team.goals.home){
                                this.setState({
                                    counterGoals: this.state.counterGoals +1
                                })
                            }
                            const itemToInsert ={
                                id: team.id,
                                round: team.round,
                                goals: this.state.counterGoals
                            }
                            this.state.listHistory.push(itemToInsert);
                        })
                    })
            })
        }
    }

    setSite = () => {
        this.getHistory(this.props)
        return(
            <div>
                <br/>
                <table className={"table"} >
                    <tr>
                        <td className={"margin blue"}>Home Team</td>
                        <td className={"margin"}>goals </td>
                        <div className={"margin"}>
                            <td className={"margin"}>-</td>
                        </div>
                        <td className={"margin"}>goals</td>
                        <td className={"margin red"}>Away Team</td>
                        {
                            this.state.listHistory.map((team) => {
                                return(
                                    <div>
                                        <td className={"margin"}>{team.id}</td>
                                        <td className={"margin"}>{team.goals}</td>
                                        <td className={"margin"}>-</td>
                                        {/*<td className={"spacingTable"}>{team.round}</td>
                                        <td className={"spacingTable"}>{team.id}</td>*/}
                                    </div>
                                )
                            })
                        }
                    </tr>

                </table>
            </div>
        )
    }
    render() {
        return(
            this.setSite()
        )
    }


}
export default History;