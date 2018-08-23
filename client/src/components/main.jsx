import React from 'react'
import Grid from '@material-ui/core/Grid'
import WatchListAddLocation from './WatchListAddLocation.jsx'
import WatchList from './WatchList.jsx'
import WatchListNoUser from './WatchListNoUser.jsx'
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Map2 from './map2.jsx'

const paperStyle = {
  position: 'absolute',
  width: '50%',
  backgroundColor: 'white',
  border: '3px solid',
  padding: 10
}

const modalStyle = { top: '20%', left: '25%' }

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mapLocation: {
        latitude: 38.9173,
        longitude: -86.3712
      },
      addLocationForm: false,
      alerts: {}
    }
    this.handleLocationForm = this.handleLocationForm.bind(this)
    this.listenForAlerts = this.listenForAlerts.bind(this)
  }

  componentDidUpdate () {
    const { mapLocation } = this.props
    if (
      mapLocation.latitude !== this.state.mapLocation.latitude ||
      mapLocation.longitude !== this.state.mapLocation.longitude
    ) {
      this.setState({ mapLocation: mapLocation })
    }
  }

  handleLocationForm () {
    this.setState({ addLocationForm: false })
  }

  listenForAlerts (alertData) {
    console.log('Main received the following alerts from the listener', alertData)
    let {alerts} = this.state
    for (var i = 0; i < alertData.length; i++) {
      let alert = alertData[i]
      if (alert.geometry) {
        alerts[alert.properties.id] = {
          event: alert.properties.event,
          geometry: alerts.geometry.coordinates
        }
      }
    }
    console.log('Main will add the following alerts ', alerts)
    this.setState({ alerts })
  }

  render () {
    return (
      <div>
        <Grid container alignItems="stretch" spacing={0}>
          <Grid item xs={3}>
            {/* this.props.userLoggedIn ? <Locations clickHandler={this.handleLocationClick}/> : <WatchListNoUser /> */}
            <WatchList
              userInfo={this.props.userInfo}
              handleLocationClick={this.props.handleLocationClick}
              listenForAlerts={this.listenForAlerts}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ addLocationForm: true })}
            >
              Add Location
            </Button>
            <Modal style={modalStyle} open={this.state.addLocationForm}>
              <Paper style={paperStyle}>
                <WatchListAddLocation
                  handleLocationForm={this.handleLocationForm}
                  userInfo={this.props.userInfo}
                  addLocation={this.props.addLocation}
                />
              </Paper>
            </Modal>
          </Grid>
          <Grid item xs={9}>
            <Map2 mapLocation={this.state.mapLocation} />
          </Grid>
        </Grid>
      </div>
    )
  }
}
