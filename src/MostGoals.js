import React from "react";
import axios from "axios";

class MostGoals extends React.Component{
    info={
        playersGoals:[],
        sortedPlayers:[],
        id:'',
        oldId:''
}
refresh(){
    this.setState({})
    this.props.change.setState({})
}
    getMostGoals = () => {
        if(this.info.id!==this.info.oldId) {
            this.info.playersGoals=[]
            this.info.oldId=this.info.id
            const link = this.props.routers.domainRouter + this.props.routers.historyRouter + this.props.id
            axios.get(link)
                .then((response) => {
                    response.data.map((item) => {
                            item.goals.map((gameGoals) => {
                                let itemToInsert = {
                                    firstName: gameGoals.scorer.firstName,
                                    lastName: gameGoals.scorer.lastName,
                                    goals: 1
                                }
                                if (!this.checkIfExist(itemToInsert)) {
                                    this.info.playersGoals.push(itemToInsert)
                                }
                            })

                        }
                    )
                })

        }
        this.info.sortedPlayers=this.sort(this.info.playersGoals)
        return(
            <div>
                <br/>
            <table className={"table"}>
                <td className={"margin backgroundMidnightblue"}>First Name:</td>
                <td className={"margin backgroundMidnightblue"}>Last Name:</td>
                <td className={"margin backgroundMidnightblue"}>Goals</td>

                    {
                        this.sort(this.info.sortedPlayers).slice(0,3).map((player) => {
                            return (
                                <tr>
                                    <td>{player.firstName}</td>
                                    <td>{player.lastName}</td>
                                    <td>{player.goals}</td>
                                </tr> //write function to onClick
                            )
                        })
                    }

            </table>
            </div>
        )
    }
    checkIfExist(itemToInsert){
        this.info.playersGoals.map((player)=>{
            if(player.firstName===itemToInsert.firstName && player.lastName===itemToInsert.lastName){
                player.goals++
                return true
            }
        })
        return false
    }
    setSite = () =>{
        this.info.id=this.props.id
        //this.getMostGoals(this.props)
        return(
            <div>
                        {this.getMostGoals()}
            </div>
        )
    }
    sort(array){
        for (let i = 0; i <array.length-1; i++) {
            if(array[i].goals<array[i+1].goals){
                let temp=array[i]
                array[i]=array[i+1]
                array[i+1]=temp
                i=0
            }
        }
    return array}

    render() {
        return(
            this.setSite()
        )
    }
}
export default MostGoals;