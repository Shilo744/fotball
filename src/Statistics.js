import React from "react";
import axios from "axios";

class Statistics extends React.Component {
    state={
        interval:setInterval((()=>{this.refresh()}),500)
    }
    info = {
        halfOneGoals: 0,
        halfTwoGoals: 0,
        minMinuteGoal: 0,
        maxMinuteGoal: 0,
        countRounds: 0
    }
    rounds ={
        minRoundGoals: 0,
        maxRoundGoals: 0
    }

    componentDidMount() {
        this.quantityRounds(this.props)
    }

    quantityRounds = (props) => {
        let count = 0;
        axios.get(props.routers.domainRouter + props.routers.historyRouter + props.id)
            .then((response) => {
                response.data.map((item) => {
                    if(item.round !== count){
                        count++;
                    }
                })
                this.info.countRounds = count;
            })
    }

    getStatistics = (props) => {
        let half1 = 0;
        let half2 = 0;
        let minMinuteGoal = 90
        let maxMinuteGoal = 0


        axios.get(props.routers.domainRouter + props.routers.historyRouter + props.id)
            .then((response) => {
                response.data.map((item) => {
                    item.goals.map((player) => {
                        if (player.minute <= 45){
                            half1++;
                        } else {
                            half2++;
                        }
                        if(player.minute < minMinuteGoal){
                            minMinuteGoal = player.minute;
                        }
                        if (player.minute > maxMinuteGoal) {
                            maxMinuteGoal = player.minute
                        }
                    })
                })
                this.info.halfOneGoals = half1;
                this.info.halfTwoGoals = half2;
                this.info.minMinuteGoal = minMinuteGoal;
                this.info.maxMinuteGoal = maxMinuteGoal;
            })
        let countMin = 0;
        let countMax = 0;
        let min = 20;
        let max = 0;
        let roundMin = 0;
        let roundMax = 0;
        for (let j = 1; j <= this.info.countRounds; j++) {
            axios.get(props.routers.domainRouter + props.routers.roundRouter + props.id +'/' + j)
                .then((response) => {
                    response.data.map((item) => {
                        if (item.round === j){
                            countMin++;
                            countMax++;
                        }
                    })
                    if (countMin < min) {
                        min = countMin;
                        roundMin = j;
                        countMin = 0;

                    }
                    if (countMax > max){
                        max = countMax;
                        roundMax = j;
                        countMax = 0;
                    }
                    this.rounds.minRoundGoals = roundMin;
                    this.rounds.maxRoundGoals = roundMax;
                })
        }
    }



    render() {
            this.getStatistics(this.props)
        return(
            <div className={"statistics-text"}>
                <br/>
                <div>
                </div>
                <div className={"statistics-text headline"}>
                    Statistics:</div>
                <table className={"table"}>
                    <td className={"insideHeadline statistics-text headline backgroundRed"}>
                        Goals on first Half
                    </td>
                    <td className={"insideHeadline statistics-text headline backgroundRed"}>Goals on second half</td>
                    <tr><td>{this.info.halfOneGoals}</td><td>{this.info.halfTwoGoals}</td></tr>
                </table>
                <div className={"statistics-text headline marginTop"}>
                    Earlier goal vs latest goal:</div>
                <table className={"table"}>
                    <td className={"insideHeadline statistics-text headline backgroundRed"}>
                        min minutes
                    </td>
                    <td className={"insideHeadline statistics-text headline backgroundRed"}>max minutes</td>
                    <tr><td>{this.info.minMinuteGoal}</td><td>{this.info.maxMinuteGoal}</td></tr>
                </table>
                <div className={"statistics-text headline marginTop"}>
                    Round goals:</div>
                <table className={"table"}>
                    <td className={"insideHeadline statistics-text headline backgroundRed"}>
                        min
                    </td>
                    <td className={"insideHeadline statistics-text headline backgroundRed"}>max</td>
                    <tr><td>{this.rounds.minRoundGoals}</td><td>{this.rounds.maxRoundGoals}</td></tr>
                </table>
            </div>


        )
    }
    refresh(){
        this.setState({})
        this.props.change.setState({})
    }

}

export default Statistics;