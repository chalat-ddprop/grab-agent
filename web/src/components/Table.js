import React, { Component } from 'react';
import Button from '../components/Button.js';

class Table extends Component {
    render() {
        var sum = 0;

        return (
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.expenses.map((item, i) => {
                        sum += item.price;

                        return (
                            <tr key={ i }>
                                <td>{ i + 1 }</td>
                                <td>{ item.name }</td>
                                <td>{ item.price }</td>
                                <td>
                                    <Button onClick={ this.props.onDeleteClick.bind(this, i) }>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="2">Total</th>
                        <th>{ sum }</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        )
    }
}

export default Table
