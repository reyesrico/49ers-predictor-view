import React, { Component } from 'react';
import axios from 'axios';
import loading from './loading.gif';
import getSchedules from './schedules';

import './App.css';

const currentYear = 2021;
const years = [currentYear, 2020];
const url = 'https://reyesrico.pythonanywhere.com'

class App extends Component {
  state = {
    teams: [],
    predictions: [],
    schedule: [],
    isLoading: false,
    year: 2021
  };

  componentDidMount() {
    this.loadSchedule();

    axios.get(`${url}/teams`).then(response => {
      this.setState({ teams: response.data.teams });
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.teams !== prevState.teams || this.state.year !== prevState.year) {
      this.loadSchedule();
      this.loadSchedulePredictions();
    }
  }

  loadSchedule = () => {
    const { year } = this.state;
    const schedule = getSchedules(year);
    console.log({ schedule });
    this.setState({ schedule });
  }

  loadSchedulePredictions = () => {
    const { schedule } = this.state;
    if (schedule.length) {
      let promises = schedule.map(game => {
        const params = {
          team_number: game.team,
          week_number: game.week,
          is_local: game.isLocal,
          is_playoff: 0,
          is_super_bowl: 0,
          weather_wind: 1,
          weather_humidity: 52
        };
    
        return axios.get(`${url}/predict`, params);
      });
  
      console.log('PREDICTING');
      this.setState({ isLoading: true });
      Promise.all(promises)
      .then(responses => {
        let predictions = responses.map(response => (response.data.predict) ? 1 : 0);
        this.setState({ predictions });
      })
      .catch(error => console.log(error))
      .finally(() => {
        console.log('FINISHED PREDICTING');
        this.setState({ isLoading: false });
      });  
    }
  }

  renderResultWording(value) {
    return value ? "Win" : "Lose";
  }

  renderMatches(predictions, schedule) {
    return schedule.map((game, index) => (predictions[index] === game.teamWin) ? 1 : 0);
  }

  renderSchedule = () => {
    const { schedule, predictions, year } = this.state;
    let results = [0, 0];

    if (schedule.length && predictions.length) {
      predictions.forEach(p => (!!p) ? results[0]++ : results[1]++);
      let allMatches = year !== currentYear ? this.renderMatches(predictions, schedule) : [];
      let matches = allMatches.filter(v => v === 1).length;
      let wins = year !== currentYear ? schedule.filter(g => g.teamWin === 1).length : 0;

      return (
        <div>
          <div className="app__summary">
            <span>Wins: {results[0]}</span>
            <span>Losses: {results[1]}</span>
            {year !== currentYear && (<span>
              Matches: {matches} - Reliability: {matches/(allMatches.length)*100}%
            </span>)}
            {year !== currentYear && (<span>
              Predicted Wins: {results[0]} - Real Wins: {wins}
            </span>)}
          </div>
          <div className="app__game">
            <div className="app__week app__game-header">Week</div>
            <div className="app__team app__game-header">Team</div>
            <div className="app__local app__game-header">49ers Local</div>
            <div className="app__win app__game-header">49ers will win?</div>
            {year !== currentYear && <div className="app__result app__game-header">49ers DID WIN?</div>}
            {year !== currentYear && <div className="app__match app__game-header">Predictor Matched?</div>}
          </div>
          { schedule.map((game, idx) => {
              return (
                <div className="app__game">
                  <div className="app__week">{game.week}</div>
                  <div className="app__team">{this.getTeam(game.team)}</div>
                  <div className="app__local">{game.isLocal? "Yes" : "No"}</div>
                  <div className={`app__win app__game-${this.renderResultWording(predictions[idx]).toLowerCase()}`}>
                    {this.renderResultWording(predictions[idx])}
                  </div>
                  {year !== currentYear && <div className={`app__result app__game-${this.renderResultWording(game.teamWin).toLocaleLowerCase()}`}>
                    {this.renderResultWording(game.teamWin)}
                  </div>}
                  {year !== currentYear && <div className={`app__match app__game-${this.renderResultWording(allMatches[idx]).toLocaleLowerCase()}`}>
                    {allMatches[idx] ? 'Matched' : "No Match"}
                  </div>}
                </div>
              );
          })}
        </div>
      );  
    }
  }

  getTeam = teamId => {
    const { teams } = this.state;
    let team = teams.find(t => t.id === teamId);
    return team ? team.name : '';
  }

  render() {
    const { isLoading, year } = this.state;

    return (
      <div className="app">
        <h1 className="app__header">49ers {year} Schedule Predictions</h1>
        <hr></hr>
        <div className="app__select-container">
          <span className="app__select-txt">Select Year:</span>
          <select className="app__select" onChange={event => this.setState({ year: parseInt(event.target.value) })}>
            { years.map(y=> {
                return <option key={y} value={y}>{y}</option>
            })}
          </select>
        </div>
        <hr></hr>
        <div className="app__content">
          {isLoading && <div className="app__img-container"><img src={loading} className="app__img" alt="loading" /></div>}
          {!isLoading && (
            <div className="app__schedule">
              {this.renderSchedule()}
            </div>
          )}
        </div>
      </div>
    );  
  }
}

export default App;
