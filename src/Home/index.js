import React, { Component } from 'react'
import {startFetch} from './action'
import { connect } from 'react-redux'

@connect(
    state => ({ ...state.home}), // 将state映射到props
    dispatch => ({
        startFetch: (oParam) => {dispatch(startFetch(oParam))}
    })
)
class Home extends Component {
    componentDidMount() {
        const { startFetch } = this.props
        startFetch({param: 'fetch data'});
    }
    render() {
        const {data} = this.props
        console.log('render home')
        return (
            <div>This is Home! Status: {!!data.success ? 'SUCCESS' : 'PENDING..'}</div>
        )
    }
}

export default Home