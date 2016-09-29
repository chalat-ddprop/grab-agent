import { connect } from 'react-redux'
import { removeExpense } from '../actions'
import Table from '../components/Table.js'

const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteClick: (id) => {
            dispatch(removeExpense(id))
        }
    }
}

const ExpenseTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table)

export default ExpenseTable
