import React, { Component } from 'react'
import { Icon } from 'antd';
export default class PostButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Icon type={this.props.type} className="post-button" />
            </div>
        )
    }
}
