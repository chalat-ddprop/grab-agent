import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateConditionPosition, updateMapCenter, changeState, loading, loaded } from '../actions';
import { Map } from 'google-maps-react';
import Marker from '../components/Marker';
import LoadingBar from '../components/LoadingBar';
import FontIcon from 'material-ui/FontIcon';
import FloatingTopRightButton from '../components/FloatingTopRightButton';

class Location extends Component {
  componentWillMount() {
    if (!this.props.lat || !this.props.lng) {
      this.props.onLocatePosition()
    } else {
      this.props.onCenterMap(this.props.lat, this.props.lng)
    }
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
        <LoadingBar display={ this.props.loading } />

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
    loading: state.apiConnection.loading,
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

    onCenterMap: (lat, lng) => {
      if (lat && lng) {
        dispatch(updateMapCenter(lat, lng));
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          let { coords } = pos;
          dispatch(updateMapCenter(coords.latitude, coords.longitude));
        })
      }
    },

    onLocatePosition: () => {
      if (navigator.geolocation) {
        dispatch(loading());
        navigator.geolocation.getCurrentPosition((pos) => {
          let { coords } = pos;
          dispatch(updateMapCenter(coords.latitude, coords.longitude));
          dispatch(updateConditionPosition(coords.latitude, coords.longitude));
          dispatch(loaded());
        });
      }
    },

    onDone: () => {
      dispatch(changeState(null));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)
