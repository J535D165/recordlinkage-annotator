import React from 'react';
import 'typeface-roboto';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  center: {
  },
}));

export default function ButtonsClassifier(props) {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <Button variant="contained" color="primary" className={classes.button} onClick={props.isMatch}>
        Match (1)
      </Button>
      <Button variant="contained" color="default" className={classes.button} onClick={props.isUnknown}>
        Unknown (2)
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={props.isDistinct}>
        Distinct (3)
      </Button>
      <Button variant="contained" color="default" className={classes.button} onClick={props.skipRecord}>
        Skip (s)
      </Button>
    </div>
  );
}
