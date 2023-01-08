import React from "react";
import axios from "axios";

class MostGoals extends React.Component{
    state={
        interval:setInterval((()=>{this.refresh()}),500)
    }
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
            <div className={"marginTop"}>
            <table className={"table"}>
                <tr>
                <td className={"margin backgroundMidnightblue text"}>First Name:</td>
                <td className={"margin backgroundMidnightblue text"}>Last Name:</td>
                <td className={"margin backgroundMidnightblue text"}>Goals</td>
                </tr>
                    {
                        this.sort(this.info.sortedPlayers)
                            .slice(0,3).map((player) => {
                            return (
                                <tr>
                                    <td className={"gold text"}>{player.firstName}</td>
                                    <td className={"silver text"}>{player.lastName}</td>
                                    <td className={"red text"}>{player.goals}</td>
                                </tr> //write function to onClick
                            )
                       })
                    }

            </table>
            </div>
        )
    }
    checkIfExist(itemToInsert){
        let isExist=false
        this.info.playersGoals.map((player)=>{
            if(this.equal(player.firstName,itemToInsert.firstName) && this.equal(player.lastName,itemToInsert.lastName)){
                player.goals++;
                return isExist=true;

            }
        })
        return isExist
    }
    equal(name,nameToCheck){
        if(name.length===nameToCheck.length){
        for (let i = 0; i < name.length; i++) {
            if(name.charAt(i)!==nameToCheck.charAt(i)){
                return false
            }
        }
            return true
        }
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