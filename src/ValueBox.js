import React from "react";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const ValueBox = (props) => (
   <Grid item>
      <Typography color="textPrimary" className={props.classValueBoxTitle}>
         {props.label}
      </Typography>
      <Typography variant="h4" color="textPrimary" className={props.classValueBoxValue}>
         {props.value}
      </Typography>
   </Grid>
);

export default ValueBox;