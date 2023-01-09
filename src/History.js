import React from "react";
import axios from "axios";

class History extends React.Component{
    state={
        interval:setInterval((()=>{this.refresh()}),0)
    }
    info = {
        leaguesHistory: [],
        site:undefined,
        minRound: '',
        maxRound: '',
        oldMinRound: '',
        oldMaxRound: '',
        oldId:'',
        maxToChoose:''
    }
    getHistory = (props) => {
        this.counter++
            axios.get(props.routers.domainRouter + props.routers.historyRouter + props.id)
                .then((response) => {
                    response.data.map((item) => {
                        let homeGoals=0
                        let awayGoals=0

                        item.goals.map((goal) => {
                            goal.home? homeGoals++:awayGoals++
                        })
                        const itemToInsert = {
                            round:item.round,
                            homeTeam: item.homeTeam.name,
                            awayTeam: item.awayTeam.name,
                            homeGoals: homeGoals,
                            awayGoals: awayGoals
                        }
                        this.info.maxToChoose=item.round
                        if (
                            item.round>=this.info.minRound && (item.round<=this.info.maxRound || this.info.maxRound==='')||
                            (item.round<=this.info.maxRound && (this.info.minRound===''))
                        ){
                        this.info.leaguesHistory.push(itemToInsert);}
                    })
                })
    }
    checkValid(event,value){
        value=event.target.value
        if(value>this.info.maxToChoose){
            return this.info.maxToChoose
        }else if(value<0){
            return 0
        }else {
            return value
        }
    }
    changedMinRound =(event) => {
        this.info.minRound=this.checkValid(event,this.info.minRound)
    }
    changedMaxRound =(event) => {
            this.info.maxRound=this.checkValid(event,this.info.maxRound)

    }

     setSite = () => {
        clearInterval(this.state.interval)
         if(this.props.id!==this.info.oldId ||
            (this.info.minRound!=='' && this.info.minRound!==this.info.oldMinRound)||
            (this.info.maxRound!=='' && this.info.maxRound!==this.info.oldMaxRound)){
            this.info.leaguesHistory=[]
            this.info.oldId=this.props.id
            this.info.oldMinRound=this.info.minRound
            this.info.oldMaxRound=this.info.maxRound

            this.getHistory(this.props)}
                 this.info.site=
                <div className={"marginTop"} onClick={(()=>{this.refresh()})}>
                <div>
                    <input type={"number"} className={"margin"} value={this.info.minRound} onChange={this.changedMinRound} placeholder={"Choose min"}/>
                    <input type={"number"} value={this.info.maxRound} onChange={this.changedMaxRound} placeholder={"Choose max "+this.info.maxToChoose}/>
                </div>
                    <table className={"table"} >
                        <thead>
                        <td className={"insideHeadline white"}>Round</td>
                        <td className={"insideHeadline green"}>Home Team</td>
                        <td className={"insideHeadline gold"}>goals </td>
                        <td className={"insideHeadline red"}>Away Team</td>
                        </thead>
                        {
                            this.info.leaguesHistory.map((item) => {
                                return(
                                    <thead>
                                    <td>{item.round} </td>
                                    <td>{item.homeTeam} </td>
                                    <td>{item.homeGoals} - {item.awayGoals} </td>
                                    <td>{item.awayTeam}</td>
                                    </thead>
                                )
                            })
                        }
                    </table>
                </div>
         this.state.interval=setInterval((()=>{this.refresh()}),0)
        return this.info.site
    }
    refresh(){
        this.setState({})
        this.props.change.setState({})
    }
    render() {
        return (
            <il>
                {this.setSite()}
            </il>
        )
    }
}
export default History;