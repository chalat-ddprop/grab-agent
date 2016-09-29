import React, { Component } from 'react';
import _ from 'lodash';
import { SearchConditions } from '../constants/search';
import {List, ListItem} from 'material-ui/List';
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
      sizeMin: null,
      sizeMax: null,
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
                      onClick={ this.props.onSelectCondition.bind(this, conditionKey, value) }
                      primary={ this.props[conditionKey] === value }
                  />)
    })

    this.conditionComponents[conditionKey] = result;
  }

  onSelectDropDown(conditionKey, e, index, value) {
    this.props.onSelectCondition(conditionKey, value);
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
          value={ this.props[conditionKey] }
          onChange={ this.onSelectDropDown.bind(this, conditionKey) }>
        { result }
      </SelectField>
    );
  }

  render() {
    this.createButtonGroup('listingType');
    this.createButtonGroup('propertyType');
    this.createDropdown('bedroom');
    this.createDropdown('bathroom');
    this.createDropdown('sizeMin', 'floorSize');
    this.createDropdown('sizeMax', 'floorSize');
    this.createButtonGroup('furnishing');

    return (
      <div className="content">
          <List>
            <h2 className="center">{ this.props.title }</h2>
          </List>
          <Divider />
          <List>
            <Subheader>What are you looking for</Subheader>
            <ListItem primaryText="Listing Type"/>
            <ListItem>
              { this.conditionComponents.listingType }
            </ListItem>

            <ListItem primaryText="Property Type"/>
            <ListItem>
              { this.conditionComponents.propertyType }
            </ListItem>
          </List>
          <Divider />
          <List>
            <Subheader>Options you need</Subheader>
            <ListItem primaryText="No. of Bedroom"/>
            <ListItem>
              { this.conditionComponents.bedroom }
            </ListItem>

            <ListItem primaryText="No. of Bathroom"/>
            <ListItem>
              { this.conditionComponents.bathroom }
            </ListItem>

            <ListItem primaryText="Floor Size"/>
            <ListItem>
              { this.conditionComponents.sizeMin }
            </ListItem>
            <ListItem primaryText="to"/>
            <ListItem>
              { this.conditionComponents.sizeMax }
            </ListItem>

            <ListItem primaryText="Furnishing"/>
            <ListItem>
              { this.conditionComponents.furnishing }
            </ListItem>

            <ListItem primaryText="Message"/>
            <ListItem>
              <TextField
                hintText="I want to see 5 properties this weekend before 5pm"
                floatingLabelText="Extra conditions to agent"
                multiLine={ true }
                fullWidth={ true }
              />
            </ListItem>
          </List>
      </div>
    )
  }
}

export default SearchForm;
