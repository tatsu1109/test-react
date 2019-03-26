import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// class ModalExample extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false
//     };
//     this.toggle = this.toggle.bind(this);
//   }

//   toggle() {
//     this.setState(prevState => ({
//       modal: !prevState.modal
//     }));
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button
            color="info"
            size="large"
            onClick={this.toggle}
          >
            View Reactstrap Docs
          </Button>
        </header>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class InfoButton extends Component {
  render() {
    return (
      <Button
        // tag="a"
        color="info"
        size="large"
        // href="http://reactstrap.github.io"
        target="_blank"
      >
        View Reactstrap Docs
    </Button>
    )
  }
}

export default App;
