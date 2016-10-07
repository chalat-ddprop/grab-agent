import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCondition, createEnquiry } from '../actions';
import _ from 'lodash';
import { SearchConditions } from '../constants/search';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class SearchForm extends Component {
  constructor() {
    super();

    this.conditionComponents = {
      listingType: null,
      propertyType: null,
      bedroom: null,
      bathroom: null,
      floorSizeMin: null,
      floorSizeMax: null,
      furnishing: null,
    }

    this.createButtonGroup = this.createButtonGroup.bind(this);
  }

  createButtonGroup(conditionKey, configKey) {
    const result = [];
    _(SearchConditions[conditionKey]).forEach((label, value) => {
      result.push(<RaisedButton
                      key={ value }
                      label={ label }
                      onClick={ this.props.onUpdateCondition.bind(this, conditionKey, value) }
                      primary={ this.props.conditions[conditionKey] === value }
                  />)
    })

    this.conditionComponents[conditionKey] = result;
  }

  createDropdown(conditionKey, configKey) {
    let result = [];
    _(SearchConditions[configKey || conditionKey]).forEach((label, value) => {
      result.push(<MenuItem
                      key={ value }
                      value={ value }
                      primaryText={ label }
                  />)
    })

    this.conditionComponents[conditionKey] = (
      <SelectField
          value={ this.props.conditions[conditionKey] }
          onChange={ this.onSelectDropDown.bind(this, conditionKey) }>
        { result }
      </SelectField>
    );
  }

  onSelectDropDown(conditionKey, e, index, value) {
    this.props.onUpdateCondition(conditionKey, value);
  }

  onInputTextField(conditionKey, e) {
    this.props.onUpdateCondition(conditionKey, e.target.value);
  }

  render() {
    this.createButtonGroup('listingType');
    this.createButtonGroup('propertyType');
    this.createDropdown('bedroom');
    this.createDropdown('bathroom');
    this.createDropdown('floorSizeMin', 'floorSize');
    this.createDropdown('floorSizeMax', 'floorSize');
    this.createButtonGroup('furnishing');

    return (
      <div className="content">
          <List>
            <h2 className="center">{ this.props.title }</h2>
          </List>
          <Divider />
          <List>
            <Subheader>What are you looking for</Subheader>
            <ListItem primaryText="Listing Type" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.listingType }
            </ListItem>

            <ListItem primaryText="Property Type" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.propertyType }
            </ListItem>
          </List>
          <Divider />
          <List>
            <Subheader>Options you need</Subheader>
            <ListItem primaryText="No. of Bedroom" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.bedroom }
            </ListItem>

            <ListItem primaryText="No. of Bathroom" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.bathroom }
            </ListItem>

            <ListItem primaryText="Floor Size" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.floorSizeMin }
            </ListItem>
            <ListItem primaryText="to" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.floorSizeMax }
            </ListItem>

            <ListItem primaryText="Furnishing" disabled={ true }/>
            <ListItem disabled={ true }>
              { this.conditionComponents.furnishing }
            </ListItem>

            <ListItem primaryText="Message" disabled={ true }/>
            <ListItem disabled={ true }>
              <TextField
                hintText="I want to see 5 properties this weekend before 5pm"
                floatingLabelText="Extra conditions to agent"
                multiLine={ true }
                fullWidth={ true }
                value={ this.props.conditions.message }
                onChange={ this.onInputTextField.bind(this, 'message') }
              />
            </ListItem>
          </List>


          <List className="center">
            <RaisedButton
              label="Create Request"
              secondary={ true }
              disabled={ this.props.saving || !this.props.conditions.listingType || !this.props.conditions.propertyType }
              onTouchTap={ this.props.onCreateEnquiry }
            />
          </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    title: "Input your dream conditions",
    saving: state.apiConnection.saving,
    userProfile: state.userProfile,
    conditions: state.conditions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCondition: (key, value) => {
      dispatch(updateCondition(key, value))
    },

    onCreateEnquiry: (userProfile, conditions) => {
      dispatch(createEnquiry(userProfile, conditions))
    }
  }
}

const SearchProperty = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)

export default SearchProperty
