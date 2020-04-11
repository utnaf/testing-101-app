import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    width: '100%',
    height: '400px',
    cursor: 'pointer',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    position: 'relative',
  },
  lotLevel: {
    textAlign: 'center',
    padding: theme.spacing(2),
    background: '#f9f9f9',
    border: '1px solid #e1e1e1',
    borderRadius: '5px',
  },
  lotLevelEmergency: {
    background: '#ffeeee',
    border: '1px solid #ee9999',
  },
  circularProgress: {
    margin: 'auto',
  },
}));
