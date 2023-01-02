import React from "react";
import axios from "axios";

class Teams extends React.Component {
    info = {
        leaguesTeams: [],
        currentLeague: ''
    }

    getData = (props) => {

        if (this.props.id !== '') {
            if (this.props.id !== this.info.currentLeague) {
                this.info.currentLeague = this.props.id
                this.info.leaguesTeams = []
                axios.get(props.domainRouter + props.teamRouter + props.id)
                    .then((response) => {
                            (response.data.map((item) => {
                                const itemToInsert = {
                                    id: item.id,
                                    name: item.name
                                }
                                this.info.leaguesTeams.push(itemToInsert);
                            }))
                        }
                    )
            }
        }
    }

    getPlayers = (props, teamId) => {
        axios.get(props.domainRouter + props.squadRouter + props.id + '/' + teamId)
            .then((response) => {
                    (response.data.map((item) => {
                        const itemToInsert = {
                            id: item.id,
                            name: item.name
                        }
                        this.info.leaguesTeams.push(itemToInsert);
                    }))
                }
            )
    }

    showTeamDetails = (team) => {
        return (
            <div>
                {
                    axios.get(this.props.domainRouter + this.props.routers.squadRouter + this.props.id + team.id)
                        .then((response) => {
                            alert(response.data)
                        })
                }
            </div>
        )
    }

    setSite = () => {
        this.getData(this.props)
        return (
            <div>
                <br/>
                <table className={"table"}>
                    <tr>
                        {
                            this.info.leaguesTeams.map((team) => {
                                return (
                                    <div onClick={() => {
                                        alert(team.name);
                                        this.getPlayers(this.props, team.id)
                                    }}><button>
                                        <th>{team.id}</th>
                                        <th>{team.name}</th></button>
                                    </div> //write function to onClick
                                )
                            })
                        }
                    </tr>
                </table>
            </div>
        )
    }

    render() {
        return (
            this.setSite()
        )
    }
}

export default Teams;