import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiText: "",
      inputText: "",
      matchedString: "",
      unMatchedString: "",
      done: false
    };
  }

  componentDidMount() {
    const apiText = "one two three four";
    this.setState({
      apiText,
      unMatchedString: apiText
    });
  }

  reset = () => {
    this.setState({
      inputText: "",
      matchedString: "",
      unMatchedString: this.state.apiText || "",
      done: false
    });
  };

  handleChange = event => {
    const { value } = event.target;
    const { unMatchedString = "", matchedString = "" } = this.state;

    const stringToMatch = unMatchedString.slice(0, value.length);
    const lastLetter = value[value.length - 1];

    if (value.length > 12) return;

    if (stringToMatch === value) {
      // End of word, time to reset input
      if (lastLetter === " " || value === unMatchedString) {
        this.setState(
          {
            unMatchedString: unMatchedString.split(stringToMatch)[1] || "",
            matchedString: matchedString + stringToMatch,
            inputText: "",
            done: value === unMatchedString
          }
        );
        return;
      }
    }
    this.setState({
      inputText: value
    });
  };

  render() {
    const {
      matchedString = "",
      unMatchedString = "",
      inputText = "",
      done
    } = this.state;

    const activeText = unMatchedString.slice(0, inputText.length) || "";
    let matchFound = true;

    let inActiveText = "";

    inActiveText = unMatchedString.slice(
      inputText.length,
      unMatchedString.length
    );

    let activeMatching = "";
    matchFound = true;

    [...activeText].forEach((letter, index) => {
      if (matchFound && letter === inputText[index]) {
        activeMatching += letter;
      } else {
        matchFound = false;
      }
    });

    const activeNotMatching = activeMatching
      ? activeText.split(activeMatching)[1]
      : activeText;

    return (
      <div className="words">
        {done && <div>Congrats! You finished the race!</div>}
        {!done && <div>Type the below Words</div>}
        <div className="question">
          <span className="matched-string">{matchedString}</span>
          <span className="active matching-string">{activeMatching}|</span>
          <span className="active not-matching-string">
            {activeNotMatching}
          </span>
          <span className="inactive-string">{inActiveText}</span>
        </div>
        {!done && (
          <input
            className="text-input"
            value={this.state.inputText}
            onChange={this.handleChange}
            placeholder="Please type here"
          />
        )}
        {done && <button onClick={this.reset}>Click here to try again</button>}
      </div>
    );
  }
}

export default App;
