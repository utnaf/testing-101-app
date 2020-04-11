import { IRootState } from 'src/shared/reducer';
import { connect } from 'react-redux';
import moment from 'moment';
import { getParkingLot, getParkingLotEntries } from './parking-lot.reducer';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import Loader from 'src/shared/components/Loader';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LotLevel } from './component/lot-level';

export interface IParkingLotDashboard extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ParkingLotDashboard = (props: IParkingLotDashboard) => {
  const { parkingLot, loading } = props;
  const [filter, setFilter] = useState('');

  const [entries, setEntries] = useState(props.entries);

  useEffect(() => {
    setEntries(props.entries);
  }, [props.entries]);

  useEffect(() => {
    setEntries(props.entries.filter(entry => filter === '' || entry.carPlate.indexOf(filter) > -1));
  }, [filter]);

  useEffect(() => {
    props.getParkingLot(props.match.params.id);
    props.getParkingLotEntries(props.match.params.id);
  }, []);

  const handleScriptChange = e => {
    setFilter(e.target.value.toUpperCase());
  };

  return (
    <Box mb={2}>
      <Loader visible={loading} />
      <Grid container spacing={4} direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={6} component={Paper}>
          <Box mb={2}>
            <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Typography component="h3" variant="h3">
                  {parkingLot.name}
                </Typography>
              </Grid>
              <Grid item>{parkingLot.status && <LotLevel total={parkingLot.spots} count={parkingLot.status.carCount} />}</Grid>
            </Grid>
          </Box>

          <Grid container component={Box} mb={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onKeyUp={handleScriptChange}
                label="Filtra per targa o ID"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          {entries.length > 0 ? (
            <TableContainer>
              <Table size="small" aria-label="entries table">
                <TableHead>
                  <TableRow>
                    <TableCell>Targa</TableCell>
                    <TableCell colSpan={2}>Ora ingresso</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map(entry => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.carPlate}</TableCell>
                      <TableCell>{moment(entry.enterTime).format('LLL')}</TableCell>
                      <TableCell>
                        <IconButton aria-label="exit car" size="small">
                          <ExitToAppIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">Al momento non ci sono auto in questo parcheggio.</Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = ({ parkingLot }: IRootState) => ({
  parkingLot: parkingLot.entity,
  entries: parkingLot.entries,
  loading: parkingLot.loading,
});

const mapDispatchToProps = {
  getParkingLot,
  getParkingLotEntries,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotDashboard);
