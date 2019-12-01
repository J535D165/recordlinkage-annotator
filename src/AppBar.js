import React from 'react';
import 'typeface-roboto';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Brightness4Icon from '@material-ui/icons/Brightness4';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  saveButton: {
  	marginRight: theme.spacing(2),
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

      	  {/* Name of the page */}
          <Typography variant="h6" className={classes.title}>
            RecordLinkage ANNOTATOR
          </Typography>

          {props.reviewState === "never" &&
          <Button color="inherit">
          	<SaveAltIcon className={classes.extendedIcon} />
          	Export
          </Button>
      	}

        <IconButton color="default" onClick={props.onToggleDark}>
          <Brightness4Icon/>
        </IconButton>

        </Toolbar>

      </AppBar>
    </div>
  );
}