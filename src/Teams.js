import React from "react";
import axios from "axios";

class Teams extends React.Component {
    info = {
        refresh:false,
        leaguesTeams: [],
        currentLeague: '',
        clickedTeam:[],
        oldClickedTeam:'',
        currentClickedTeam:'',
        history:[],
        teamToShow:undefined,
        historyToShow:undefined,
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
            return(<table className={"table"}>
                <td className={"insideHeadline green"}>Home team</td>
                <td className={"insideHeadline gold"}>Goals</td>
                <td className={"insideHeadline red"}>Away team</td>
                {
                        this.info.history.map((item) => {
                            return (
                                  <tr>
                                    <th>{item.homeTeam} </th>
                                    <th>{item.homeGoals +" - "}{item.awayGoals} </th>
                                    <th>{item.awayTeam}</th>
                                </tr>//write function to onClick
                            )
                        })
                    }

            </table>)
    }
    getData = (props) => {

            if (this.props.id !== this.info.currentLeague) {
                this.info.currentLeague = this.props.id
                this.info.leaguesTeams = []
                this.info.clickedTeam = []
                this.info.teamToShow=undefined
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
                        this.info.leaguesTeams=this.sort( this.info.leaguesTeams)}
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
        return(<table className={"table"}>
            <td className={"insideHeadline"}>First name</td>
            <td className={"insideHeadline"}>last name</td>

            {
                    this.info.clickedTeam.map((player) => {
                        return (
                            <tr onClick={() => {
                                alert(player.firstName+" "+player.lastName+" is a loser");
                            }}>
                                <td>{player.firstName}</td>
                                <td>{player.lastName}</td>
                            </tr>//write function to onClick
                        )
                    })
                }
        </table>)
    }}


    setSite = () => {

        this.getData(this.props)
        return (
            <div>
                {this.enterContent()}
                {this.info.teamToShow}
                {this.info.historyToShow}
            </div>
        )
    }
    enterContent(){
        if(this.info.leaguesTeams.length>0){
            this.info.pageToShow=<table className={"table"}>

                <div className={"insideHeadline"}>Teams</div>
                {
                    this.info.leaguesTeams.map((team) => {
                        return (
                            <tr onClick={() => {
                                this.info.currentClickedTeam=team.id;
                                this.info.teamToShow=this.getPlayers(this.props)
                                this.info.historyToShow=this.history(team.id)
                                this.refresh()
                                this.info.refresh=true
                            }}>
                                <th>{team.name}</th>
                            </tr> //write function to onClick
                        )
                    })
                }
        </table>
        }
        else this.info.pageToShow= <table className={"table"} onClick={(()=>{this.refresh()})}>
            <tr>
               Please choose a league and click here
            </tr>
        </table>
        return this.info.pageToShow
    }
    sort(array){
        for (let i = 0; i <array.length-1; i++) {
            if(array[i].name.charAt(0)>array[i+1].name.charAt(0)){
                let temp=array[i]
                array[i]=array[i+1]
                array[i+1]=temp
                i=0
            }
        }
        return array}
    render() {
        return (
            <div>
                {this.setSite()}
            </div>
        )
    }
}

export default Teams;