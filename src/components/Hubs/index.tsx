import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"
import { Drawer, Typography, Divider, Grid, TextField, Button } from '@material-ui/core';
import Loading from '../Loading';
import { useSnackbar } from 'material-ui-snackbar-provider';

export interface IHub {
    location: {
        latitude: number,
        longitude: number,
    }
    users: [
        {
            id: string
        }
    ]
    name: string
    organizer: string
    contact: string
}

const Map = withGoogleMap((props) => <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 45.5017, lng: -73.5673 }}
>
    {props.children}
</GoogleMap>)

const Hubs: React.FC = () => {

    // For map
    const [markerPopup, setMarkerPopup] = useState<IHub | null>();
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [markers, setMarkers] = useState<[IHub] | null>();

    // For form
    const [hubName, setHubName] = useState('Anonymous Location');
    const [hubLocation, setHubLocation] = useState('10, 20');
    const [hubContact, setHubContact] = useState('john@doe.com');

    // For snackbars
    const snackbar = useSnackbar();

    useEffect(() => {
        Firebase.getHubs(setMarkers);
    }, []);

    if (markers == null) {
        return <Loading />;
    }

    return (
        <>
            <Drawer
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                anchor="bottom"
            >
                <div style={{ padding: '20px 0px' }}>
                    <Typography align='center' variant='h4'>{(markerPopup) ? markerPopup.name : 'Default Name'}</Typography>
                    <Typography align='center'>{(markerPopup) ? `(${markerPopup.location.latitude}, ${markerPopup.location.longitude})` : '(0, 0)'}</Typography>
                    <br />
                    <Divider />
                    <br />
                    <Typography align='center' variant='body1'>{`Organizer: ${(markerPopup) ? markerPopup.organizer : 'John Doe'}`}</Typography>
                    <Typography align='center' variant='body1'>{`Contact: ${(markerPopup) ? markerPopup.contact : 'john@doe.com'}`}</Typography>
                </div>
            </Drawer>
            <Map
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            >
                {
                    markers.map((marker, i) => <Marker key={i} onClick={() => { setMarkerPopup(marker); setPopupOpen(true) }} position={{ lat: marker.location.latitude, lng: marker.location.longitude }} />)
                }
            </Map>
            <br />
            <Grid container direction='column' alignItems='center' justify='center' spacing={3}>
                <Grid item>
                    <Typography variant='h4'>Hub</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        id='hub-name'
                        label='Name'
                        variant='outlined'
                        value={hubName}
                        onChange={(e) => setHubName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id='hub-location'
                        label='Location'
                        variant='outlined'
                        value={hubLocation}
                        onChange={(e) => setHubLocation(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id='hub-contact'
                        label='Contact'
                        variant='outlined'
                        value={hubContact}
                        onChange={(e) => setHubContact(e.target.value)}
                    />
                </Grid>
                <Grid container item justify='center' spacing={3}>
                    <Grid item>
                        <Button variant='outlined' onClick={() => Firebase.createHub(hubName, hubLocation, hubContact, snackbar)}>
                            Create
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined'>
                            Join
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Hubs;