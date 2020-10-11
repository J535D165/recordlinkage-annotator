import React, {useState } from 'react';
import 'typeface-roboto';

import ButtonsClassifier from './ButtonsClassifier.js'
import Record from './Record.js'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const handleKeyPress = (e) => {
    // console.log("Event fired!");
    // console.log(e.key);
    if (e.key === '1') { 
      isMatch();
    }
    if (e.key === '2') { 
      isUnknown();
    }
    if (e.key === '3') { 
      isDistinct();
    }
    if (e.key === ' ') { 
      skipRecord();
    }
    if (e.key === 'ArrowRight') { 
      navigateTo("nextLoop");
    }
    if (e.key === 'ArrowUp') { 
      navigateTo('first');
    }
    if (e.key === 'ArrowDown') { 
      navigateTo('last');
    }
    if (e.key === 'ArrowLeft') { 
      navigateTo('previousLoop');
    }
    if (e.key === 's') { 
      saveJSON();
    }
  };

  const saveJSON = () => {
    console.log("Saving JSON:")
    console.log(getStats())
    props.reviewState("export");
  }

  const onClick = () => {
    if (pairIndex < appData['pairs'].length - 1) {
      setPairIndex(pairIndex + 1);
    } else {
      saveJSON();
    } 
  };

  const isMatch = () => {
    console.log("Records match");
    toast("Records match");
    appData['pairs'][pairIndex].label = 1;
    appData['pairs'][pairIndex].label_str = "Match"; 
    
    onClick();
  };

  const isDistinct = () => {
    console.log("Records are distinct");
    toast("Records are distinct");
    appData['pairs'][pairIndex].label = 0;
    appData['pairs'][pairIndex].label_str = "Distinct";

    onClick();
  };

  const isUnknown = () => {
    console.log("Records are unknown");
    toast("Records are unknown");
    delete appData['pairs'][pairIndex].label;
    delete appData['pairs'][pairIndex].label_str;

    onClick();
  };

  const skipRecord = () => {
    console.log("Skipping record pair");
    toast("Skipping record pair");
    onClick();
  };

  const navigateTo = (direction) => {
    console.log(`Navigation event! ${direction}`);
    switch (direction) {
      case "first":
        setPairIndex(0);
        break;
      case "previous":
        if (pairIndex > 0) {
          setPairIndex(pairIndex - 1);
        }
        break;
      case "previousLoop":
        if (pairIndex > 0) {
          setPairIndex(pairIndex - 1);
        } else {
          setPairIndex(appData['pairs'].length - 1);
        }
        break;
      case "next":
        if (pairIndex < appData['pairs'].length - 1) {
          setPairIndex(pairIndex + 1);
        }    
        break;
      case "nextLoop":
        if (pairIndex < appData['pairs'].length - 1) {
          setPairIndex(pairIndex + 1);
        } else {
          setPairIndex(0);
        }
        break;
      case "last":
        setPairIndex(appData['pairs'].length - 1);
        break;
      default:
        throw new Error("unknown direction in navigateTo");
    }
  }

  return (
    <div className={classes.root} tabIndex={-1} onKeyDown={handleKeyPress}>
      <Grid container spacing={1}>
        
        <Grid item xs={12} sm={6}>
          <Record recordData={appData['pairs'][pairIndex]} recordSource="a"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Record recordData={appData['pairs'][pairIndex]} recordSource="b"/>
        </Grid>     


        {/* grid item for buttons at the bottom (or top))*/}
        <Grid item xs={12} sm={6}>
          <ButtonsClassifier isMatch={isMatch} isDistinct={isDistinct} isUnknown={isUnknown} skipRecord={skipRecord} navigateCallback={navigateTo}/>
        </Grid>

      </Grid>
    </div>
  );
}



