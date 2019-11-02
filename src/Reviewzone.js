import React, {useState } from 'react';
import 'typeface-roboto';

import ButtonsClassifier from './ButtonsClassifier.js'
import Record from './Record.js'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));


export default function ReviewZone(props) {
  const classes = useStyles();

  // Declare a new state contant for the index
  const [pairIndex, setPairIndex] = useState(0);

  // Declare a new state contant for the index
  const [appData, ] = useState(props.reviewData);
  

  const getStats = () => {

    var matchCount = 0;
    var distinctCount = 0;

    for (var rec in appData['pairs']){
      if (appData['pairs'][rec].label === 1) {
        matchCount = matchCount + 1;
      }
      if (appData['pairs'][rec].label === 0) {
        distinctCount = distinctCount + 1;
      }
    }

    return({'matchCount': matchCount, 'distinctCount': distinctCount})
  }

  const onClick = () => {
    if (pairIndex < appData['pairs'].length - 1) {
      setPairIndex(pairIndex + 1);
    } else {
      console.log("Last record, we are done.")
      console.log(getStats())
      props.reviewState("export");
    } 
  }

  const isMatch = () => {
    console.log("Records match");
    appData['pairs'][pairIndex].label = 1;
    appData['pairs'][pairIndex].label_str = "Match"; 
    
    onClick();
  };

  const isDistinct = () => {
    console.log("Records are distinct");
    appData['pairs'][pairIndex].label = 0;
    appData['pairs'][pairIndex].label_str = "Distinct";

    onClick();
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        
        <Grid item xs={12} sm={6}>
          <Record recordData={appData['pairs'][pairIndex]} recordSource="a"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Record recordData={appData['pairs'][pairIndex]} recordSource="b"/>
        </Grid>     


        {/* grid item for buttons at the bottom (or top))*/}
        <Grid item xs={12} sm={6}>
          <ButtonsClassifier isMatch={isMatch}  isDistinct={isDistinct}/>
        </Grid>

      </Grid>
    </div>
  );
}



