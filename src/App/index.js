import React, { Component } from 'react'
import Home from '../Home'

class App extends Component {
    render() {
        console.log('render app')
        return (
            <div>
                <p>App</p>
                {this.props.children}
            </div>
        )
    }
}

export default App