import React, { Component } from 'react';

class CompactList extends Component {
    render() {
        return (
          <div className="compact-list">
            { this.props.children }
          </div>
        )
    }
}

export default CompactList;
