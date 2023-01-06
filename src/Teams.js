import React from "react";
import axios from "axios";

class Teams extends React.Component {
    info = {
        leaguesTeams: [],
        currentLeague: '',
        clickedTeam:[],
        oldClickedTeam:'',
        currentClickedTeam:'',
        history:[],
        teamToShow:undefined,
        historyToShow:undefined
    }
    refresh(){
        this.setState({})
        this.props.change.setState({})
    }
    history(teamId){
        if ((this.info.currentClickedTeam !== this.info.oldClickedTeam) || (this.info.currentClickedTeam!=='' && this.info.oldClickedTeam==='')) {
            this.info.oldClickedTeam=this.info.currentClickedTeam
        this.info.history=[]
            const link=this.props.routers.domainRouter+ this.props.routers.historyRouter + this.info.currentLeague+"/"+teamId
        axios.get(link)
            .then((response) => {
                    (response.data.map((item) => {

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
                        this.info.history.push(itemToInsert);
                    }))

                }
            )}
            return(<table className={"table history next2"}>
                <div className={"insideHeadline"}>History</div>
                <tr>
                    {
                        this.info.history.map((item) => {
                            return (
                                <div><button>
                                    <th>{item.homeTeam} </th>
                                    <th>{item.homeGoals +" -"}</th>
                                    <th>{item.awayGoals} </th>
                                    <th>{item.awayTeam}</th>
                                </button>
                                </div> //write function to onClick
                            )
                        })
                    }
                </tr>
            </table>)
    }
    getData = (props) => {

            if (this.props.id !== this.info.currentLeague) {
                this.info.currentLeague = this.props.id
                this.info.leaguesTeams = []
                this.info.clickedTeam = []
                this.info.teamToShow=<il/>
                const link=props.routers.domainRouter + props.routers.teamRouter + props.id
                axios.get(link)
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


    getPlayers = (props) => {
            if ((this.info.currentClickedTeam !== this.info.oldClickedTeam) || (this.info.currentClickedTeam!=='' && this.info.oldClickedTeam==='')) {
                this.info.clickedTeam=[]
        const link=props.routers.domainRouter + props.routers.squadRouter + props.id + '/' + this.info.currentClickedTeam
        axios.get(link)
            .then((response) => {
                     (response.data.map((item) => {
                        const itemToInsert = {
                            firstName: item.firstName,
                            lastName: item.lastName
                        }
                        this.info.clickedTeam.push(itemToInsert);
                    }))
                }
            )
            }
            if(this.info.currentClickedTeam!==''){
        return(<table className={"table next"}>
            <div className={"insideHeadline"}>Players</div>
            <tr>
                {
                    this.info.clickedTeam.map((player) => {
                        return (
                            <div onClick={() => {
                                alert(player.firstName+" "+player.lastName+" is a loser");
                            }}><button>
                                <th>{player.firstName}</th>
                                <th>{player.lastName}</th></button>
                            </div> //write function to onClick
                        )
                    })
                }
            </tr>
        </table>)
    }}

    showTeamDetails = (props) => {
        return (
            <div>
                {
                    axios.get(props.routers.domainRouter + props.routers.squadRouter + props.id + this.info.clickedTeam)
                        .then((response) => {
                            alert(response.data)
                        })
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.setSite()}
            </div>
        )
    }
    setSite = () => {
        this.getData(this.props)
        return (
            <div>
                <br/>
                {this.enterContent()}
                {this.info.teamToShow}
                {this.info.historyToShow}
            </div>
        )
    }
    enterContent(){
        let content;
        if(this.info.leaguesTeams.length>0){
            content=<table className={"table"}>
            <tr>
                <div className={"insideHeadline"}>Teams</div>
                {
                    this.info.leaguesTeams.map((team) => {
                        return (
                            <div onClick={() => {
                                this.info.currentClickedTeam=team.id;
                                this.info.teamToShow=this.getPlayers(this.props)
                                this.info.historyToShow=this.history(team.id)
                                this.refresh()
                            }}><button>
                                {/*<th>{teamToShow.id}</th>*/}
                                <th>{team.name}</th></button>
                            </div> //write function to onClick
                        )
                    })
                }
            </tr>
        </table>
        }
        else content= <table className={"table"}>
            <tr>
               Please choose a league and press Teams
            </tr>
        </table>
        return content
    }
}

export default Teams;