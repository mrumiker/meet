import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: '',
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    //this.setState({ showSuggestions: true }); //necessary?
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        suggestions: [],
        infoText: 'We cannot find the city you are looking for. Please try another.',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: '',
    });

    this.props.updateEvents(suggestion, this.props.numberOfEvents);

  }

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          placeholder="Search Cities"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }} /><InfoAlert text={this.state.infoText} />
        <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}
          <li key='all' onClick={() => this.handleItemClicked('all')}>
            <b>See All Cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;