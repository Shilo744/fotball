import React from "react";
import axios from "axios";

class Statistics extends React.Component {
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
        },
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
        for (let i = 1; i <= 3; i++) {
            axios.get(props.routers.domainRouter + props.routers.historyRouter + i)
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
        for (let i = 0; i <= 3; i++) {
            for (let j = 1; j <= 10; j++) {
                axios.get(props.routers.domainRouter + props.routers.roundRouter + i +'/' + j)
                    .then((response) => {
                        response.data.map((item) => {
                            switch (item.round){
                                case 1:{
                                    round1 += item.goals.length
                                    break
                                }case 2:{
                                    round2 += item.goals.length
                                    break
                                }case 3:{
                                    round3 += item.goals.length
                                    break
                                }case 4:{
                                    round4 += item.goals.length
                                    break
                                }case 5:{
                                    round5 += item.goals.length
                                    break
                                }case 6:{
                                    round6 += item.goals.length
                                    break
                                }case 7:{
                                    round7 += item.goals.length
                                    break
                                }case 8:{
                                    round8 += item.goals.length
                                    break
                                }case 9:{
                                    round9 += item.goals.length
                                    break
                                }case 10:{
                                    round10 += item.goals.length
                                    break
                                }
                            }

                        })
                        this.info.rounds.round1 = round1;
                        this.info.rounds.round2 = round2;
                        this.info.rounds.round3 = round3;
                        this.info.rounds.round4 = round4;
                        this.info.rounds.round5 = round5;
                        this.info.rounds.round6 = round6;
                        this.info.rounds.round7 = round7;
                        this.info.rounds.round8 = round8;
                        this.info.rounds.round9 = round9;
                        this.info.rounds.round10 = round10;
                        this.sortMinAndMax();
                    })
            }
        }
    }

    sortMinAndMax = () => {
        let min = 1000;
        let max = 0;
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
            this.getStatistics(this.props);
        }
        return(
            <div>
                Statistics:
                <div>
                    Goals: half1: {this.info.halfOneGoals} VS half2: {this.info.halfTwoGoals}
                </div>
                <div>
                    Minute: min: {this.info.minMinuteGoal} VS max: {this.info.maxMinuteGoal}
                </div>
                <div>
                    Round goals: min: {this.roundsMinMax.minRoundGoals} VS max: {this.roundsMinMax.maxRoundGoals}
                </div>
            </div>


        )
    }

}

export default Statistics;