import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserProfile } from '../actions';
import { List, ListItem } from 'material-ui/List';
import { validateMandatoryFields } from '../services/UserProfileService';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UserInfo extends Component {
  onInputTextField(conditionKey, e) {
    this.props.onUpdateProfile(conditionKey, e.target.value);
  }

  render() {
    return (
      <div>
        <List>
          <ListItem disabled={ true }>
            <TextField
              floatingLabelText="Email"
              floatingLabelFixed={ true }
              fullWidth={ true }
              value={ this.props.userProfile.userid }
              onChange={ this.onInputTextField.bind(this, 'userid') }
            />
          </ListItem>

          <ListItem disabled={ true }>
            <TextField
              floatingLabelText="Firstname"
              floatingLabelFixed={ true }
              fullWidth={ true }
              value={ this.props.userProfile.firstname }
              onChange={ this.onInputTextField.bind(this, 'firstname') }
            />
          </ListItem>

          <ListItem disabled={ true }>
            <TextField
              floatingLabelText="Lastname"
              floatingLabelFixed={ true }
              fullWidth={ true }
              value={ this.props.userProfile.lastname }
              onChange={ this.onInputTextField.bind(this, 'lastname') }
            />
          </ListItem>

          <ListItem disabled={ true }>
            <TextField
              floatingLabelText="Mobile"
              floatingLabelFixed={ true }
              fullWidth={ true }
              value={ this.props.userProfile.mobile }
              onChange={ this.onInputTextField.bind(this, 'mobile') }
            />
          </ListItem>
        </List>

        <List className="center">
          <RaisedButton
            label="Create Request"
            href="#/enquiry"
            secondary={ true }
            disabled={ !validateMandatoryFields(this.props.userProfile) }
          />
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProfile: (key, value) => {
      dispatch(updateUserProfile(key, value))
    }
  }
}

export default UserInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo)
