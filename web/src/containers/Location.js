import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateConditionPosition, updateMapCenter } from '../actions';
import { Map } from 'google-maps-react';
import Marker from '../components/Marker';
import FontIcon from 'material-ui/FontIcon';
import FloatingTopRightButton from '../components/FloatingTopRightButton';

class Location extends Component {
  componentWillMount() {
    this.props.onLocatePosition();
  }

  render() {
    let marker = null,
        center = {
          lat: this.props.center.lat || this.props.lat,
          lng: this.props.center.lng || this.props.lng,
        };

    if (this.props.lat && this.props.lng) {
      marker = <Marker position={{ lat: this.props.lat, lng: this.props.lng }}/>
    }

    return (
      <div>
        <Map google={ this.props.google } zoom={ 14 }
             center={ this.props.center.lat && this.props.center.lng ? center : null }
             onDragend={ this.props.onCenterMoved }
             onClick={ this.props.onSelectPosition }>
          { marker }
        </Map>

        <FloatingTopRightButton position={ 1 } onClick={ this.props.onLocatePosition }>
          <FontIcon className="material-icons">near_me</FontIcon>
        </FloatingTopRightButton>
        { !this.props.lat || !this.props.lng ? null :
          <FloatingTopRightButton position={ 2 } onClick={ this.props.onDone }>
            <FontIcon className="material-icons">done</FontIcon>
          </FloatingTopRightButton>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    google: state.gmap.google,
    center: state.gmap.center,
    lat: state.conditions.lat,
    lng: state.conditions.lng,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCenterMoved: (mapProps, map) => {
      dispatch(updateMapCenter(map.center.lat(), map.center.lng()));
    },

    onSelectPosition: (mapProps, map, e) => {
      dispatch(updateConditionPosition(e.latLng.lat(), e.latLng.lng()));
    },

    onLocatePosition: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          let { coords } = pos;
          dispatch(updateMapCenter(coords.latitude, coords.longitude));
          dispatch(updateConditionPosition(coords.latitude, coords.longitude));
        });
      }
    },

    onDone: () => {
      window.location.hash = '/enquiry';
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)
