import React from 'react';
import 'typeface-roboto';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonNav: {
    margin: theme.spacing(1),
  },
  center: {
  },
}));

export default function ButtonsClassifier(props) {
  const classes = useStyles();

  const handleAction = function(thisaction) {
    props.actions[thisaction]();
  }

  return (
    <div className={classes.center}>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => handleAction("match")}>
        Match (1)
      </Button>
      <Button variant="contained" color="default" className={classes.button} onClick={() => handleAction("unknown")}>
        Unknown (2)
      </Button>
      <Button variant="contained" color="secondary" className={classes.button} onClick={() => handleAction("distinct")}>
        Distinct (3)
      </Button>
      <Button variant="contained" color="default" className={classes.button} onClick={() => handleAction("skip")}>
        Skip (spacebar)
      </Button>

      <IconButton color="default" variant="outlined" className={classes.buttonNav} onClick={() => handleAction("first")}>
        <SkipPreviousIcon />
      </IconButton>
      <IconButton color="default" variant="outlined" className={classes.buttonNav} onClick={() => handleAction("previous")}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton color="default" variant="outlined" className={classes.buttonNav} onClick={() => handleAction("next")}>
        <ArrowForwardIcon />
      </IconButton>
      <IconButton color="default" variant="outlined" className={classes.buttonNav} onClick={() => handleAction("last")}>
        <SkipNextIcon />
      </IconButton>

    </div>
  );
}
