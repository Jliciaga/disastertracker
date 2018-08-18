import React, {Component} from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'

export default class LocationCardAlerts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      alerts: []
    }
    this.parseAlerts = this.parseAlerts.bind(this)
    this.getLocationAlerts = this.getLocationAlerts.bind(this)
  }

  componentDidMount () {
    this.getLocationAlerts(this.parseAlerts)
    // const locationAlertInterval = setInterval(this.getLocationAlerts,  10 * 60 * 1000)
  }
  componentWillUnmount () {
    // clearInterval(locationAlertInterval)

  }
  getLocationAlerts (callback) {
    let params = {
      active: 1,
      severity: 'severe',
      point: `${this.props.latitude},${this.props.longitude}`
    }
    axios.get('https://api.weather.gov/alerts', params)
      .then(result => callback(null, result))
      .catch(err => callback(err, null))
  }

  parseAlerts (err, alerts) {
    if (err) { }
    var alertArray
    if (!alerts.features) {
      return this.state.alerts.length !== 0 && this.setState({alerts: []})
    }
    alertArray = alerts.features.map(alert => alert.properties)
    // alertArray = alertArray.filter(alert => alert.status !== 'Test' && alert.status !== 'Cancel')
    console.log('alerts array is ', alertArray)
    this.setState({alerts: alertArray})
  }

  render () {
    let {alerts} = this.state
    console.log(alerts)
    if (alerts.length === 0) { return (<Typography>No active alerts at this time</Typography>) }
    return alerts.map(alert => (<Typography>{alert.event}</Typography>))
  }
}
