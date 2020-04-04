import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  card: {
    '&:hover': {
      cursor: 'pointer',
      boxShadow: theme.shadows[5],
    },
    '&:active': {
      cursor: 'pointer',
      boxShadow: theme.shadows[0],
    },
  },
  media: {
    height: '400px',
  },
}));
