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
        rounds: {
            round1: 0,
            round2: 0,
            round3: 0,
            round4: 0,
            round5: 0,
            round6: 0,
            round7: 0,
            round8: 0,
            round9: 0,
            round10: 0,
        }
    }
    roundsMinMax ={
        minRoundGoals: 0,
        maxRoundGoals: 0
    }


    getStatistics = (props) => {

        let half1 = 0;
        let half2 = 0;
        let minMinuteGoal = 90
        let maxMinuteGoal = 0
        let round1 = 0;
        let round2 = 0;
        let round3 = 0;
        let round4 = 0;
        let round5 = 0;
        let round6 = 0;
        let round7 = 0;
        let round8 = 0;
        let round9 = 0;
        let round10 = 0;

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
    }



    sortMinAndMax = (rounds) => {
        let min = rounds[0];
        let max = rounds[0];
        this.info.rounds.map((round) => {
            if(round < min){
                min = round;
            }
            if(round > max){
                max = round;
            }
        })
        this.roundsMinMax.minRoundGoals = min;
        this.roundsMinMax.maxRoundGoals = max;
    }

    render() {
        {
            this.getStatistics(this.props)
        }
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
                    <tr><td>{this.roundsMinMax.minRoundGoals}</td><td>{this.roundsMinMax.maxRoundGoals}</td></tr>
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