import { connect } from 'react-redux';
import { updateCondition } from '../actions'
import SearchForm from '../components/SearchForm';

const mapStateToProps = (state) => {
  return {
    title: "Input your dream conditions",
    ...state.conditions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSelectCondition: (key, value) => {
          dispatch(updateCondition(key, value))
      }
  }
}

const SearchProperty = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

export default SearchProperty
