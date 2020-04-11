import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Fab } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'src/shared/reducer';
import { getParkingLots } from './parking-lot.reducer';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import Loader from 'src/shared/components/Loader';
import { Link, RouteComponentProps } from 'react-router-dom';

import getClasses from './style';

export interface IParkingLotProps extends StateProps, DispatchProps, RouteComponentProps {}

export const ParkingLot = (props: IParkingLotProps) => {
  const { parkingLots, loading } = props;

  const classes = getClasses();

  useEffect(() => {
    props.getParkingLots();
  }, []);

  const openLotDashboard = id => e => {
    e.preventDefault();
    props.history.push(`/lot/${id}`);
  };

  return (
    <Box>
      <Loader visible={loading} />
      {parkingLots.length > 0 ? (
        <Grid container spacing={4}>
          {parkingLots.map(parkingLot => (
            <Grid item xs={12} sm={6} md={4} key={parkingLot.id} onClick={openLotDashboard(parkingLot.id)}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={parkingLot.imageUrl} title={`${parkingLot.name} Picture`} />
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item xs={8}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {parkingLot.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h5" component="small">
                        {parkingLot.status.carCount} / {parkingLot.spots}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography>{parkingLot.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">Non hai ancora nessun Parcheggio da gestire.</Alert>
      )}
      <Fab color="secondary" aria-label="add parking lot" className={classes.fab} component={Link} to="/lot/create">
        <AddIcon />
      </Fab>
    </Box>
  );
};

const mapStateToProps = ({ parkingLot }: IRootState) => ({
  parkingLots: parkingLot.entities,
  loading: parkingLot.loading,
});

const mapDispatchToProps = {
  getParkingLots,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLot);
