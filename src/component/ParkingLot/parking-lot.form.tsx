import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Typography, TextField, Slider, FormHelperText, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { IRootState } from 'src/shared/reducer';
import { RouteComponentProps, Link } from 'react-router-dom';
import { reset, createParkingLot } from './parking-lot.reducer';
import ImageSelector from './component/image-selector';
import { defaultValue } from './parking-lot.model';

export interface IParkingLotForm extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ParkingLotForm = (props: IParkingLotForm) => {
  // const [isNew, setIsNew] = useState(!props.match.params.id);
  const [values, setValues] = useState(defaultValue);

  const { updateSuccess } = props;

  useEffect(() => {
    if (updateSuccess) {
      props.history.push('/lot');
    }
  }, [updateSuccess]);

  const handleSubmit = e => {
    e.preventDefault();
    const entity = values;
    props.createParkingLot(entity);
  };

  const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });
  const handleImageUrlChange = imageUrl => setValues({ ...values, imageUrl });
  const handleSliderChange = (e, spots) => setValues({ ...values, spots });

  return (
    <Grid container spacing={4} direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={12} sm={8} md={6} lg={5} component={Paper}>
        <Typography component="h2" variant="h4" align="center" gutterBottom>
          Aggiungi un nuovo Parcheggio
        </Typography>
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth id="name" defaultValue={values.name} name="name" label="Nome" margin="normal" onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="address"
              defaultValue={values.address}
              name="address"
              label="Indirizzo"
              margin="normal"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography id="spots-label" gutterBottom>
              Posti: {values.spots}
            </Typography>
            <Slider
              value={values.spots}
              id="spots"
              name="spots"
              onChange={handleSliderChange}
              aria-labelledby="spots-label"
              valueLabelDisplay="auto"
              step={50}
              marks
              min={0}
              max={1000}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Immagine</Typography>
            <ImageSelector setImageUrl={handleImageUrlChange} />
            <FormHelperText>Clicca sull'immagine per selezionare automaticamente un'altra foto.</FormHelperText>
          </Grid>
          <Grid item xs={12} component={Box} display="flex" justifyContent="space-around">
            <Button variant="outlined" color="primary" component={Link} to="/lot">
              Annulla
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Salva
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ parkingLot }: IRootState) => ({
  parkingLot: parkingLot.entity,
  updateSuccess: parkingLot.updateSuccess,
});

const mapDispatchToProps = {
  reset,
  createParkingLot,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotForm);
