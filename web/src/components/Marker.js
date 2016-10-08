import { Marker as GMapMarker } from 'google-maps-react';

// higher order component - fix duplicate marker when update position
const wrappedComponent = (Component) => {
  return class Marker extends Component {
    componentDidUpdate(prevProps) {
      if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        this.marker.setMap(null);
        this.renderMarker();
      }
    }
  }
}

export default wrappedComponent(GMapMarker);
