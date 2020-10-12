import React, { useState } from 'react';
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
  const [appData,] = useState(props.reviewData);


  const getStats = () => {

    var matchCount = 0;
    var distinctCount = 0;

    for (var rec in appData['pairs']) {
      if (appData['pairs'][rec].label === 1) {
        matchCount = matchCount + 1;
      }
      if (appData['pairs'][rec].label === 0) {
        distinctCount = distinctCount + 1;
      }
    }

    return ({ 'matchCount': matchCount, 'distinctCount': distinctCount })
  }

  // Define all actions

  const saveJSON = () => {
    console.log("Saving JSON:")
    console.log(getStats())
    props.reviewState("export");
  }

  const nextOrSave = () => {
    if (pairIndex < appData['pairs'].length - 1) {
      setPairIndex(pairIndex + 1);
    } else {
      saveJSON();
    }
  };

  const isMatch = () => {
    console.log("Records match");
    toast.success("Records match");
    appData['pairs'][pairIndex].label = 1;
    appData['pairs'][pairIndex].label_str = "Match";

    nextOrSave();
  };

  const isDistinct = () => {
    console.log("Records are distinct");
    toast.dark("Records are distinct");
    appData['pairs'][pairIndex].label = 0;
    appData['pairs'][pairIndex].label_str = "Distinct";

    nextOrSave();
  };

  const isUnknown = () => {
    console.log("Records are unknown");
    toast.info("Records are unknown");
    delete appData['pairs'][pairIndex].label;
    delete appData['pairs'][pairIndex].label_str;

    nextOrSave();
  };

  const skipRecord = () => {
    console.log("Skipping record pair");
    toast("Skipping record pair");
    nextOrSave();
  };

  const navigateTo = (direction) => {
    console.log(`Navigation event! ${direction}`);
    switch (direction) {
      case "first":
        setPairIndex(0);
        toast("First record pair");
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
          toast("Reached start, looping from the end.");
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
          toast("Reached end, looping from the start.");
          setPairIndex(0);
        }
        break;
      case "last":
        setPairIndex(appData['pairs'].length - 1);
        toast("Last record pair");
        break;
      default:
        throw new Error("unknown direction in navigateTo");
    }
  }

  // Dictionary of callbacks

  const dictActions = {
    "match": isMatch,
    "distinct": isDistinct,
    "unknown": isUnknown,
    "first": () => navigateTo("first"),
    "previous": () => navigateTo("previous"),
    "previousLoop": () => navigateTo("previousLoop"),
    "next": () => navigateTo("next"),
    "nextLoop": () => navigateTo("nextLoop"),
    "last": () => navigateTo("last"),
    "skip": skipRecord
  };


  // Key to action mapping

  const handleKeyPress = (e) => {
    // console.log("Key pressed: " + e.key);

    const dictKeys = {
      "1": "match",
      "2": "unknown",
      "3": "distinct",
      " ": "skip",
      "ArrowRight": "nextLoop",
      "ArrowUp": "first",
      "ArrowDown": "last",
      "ArrowLeft": "previousLoop",
      "s": "save"
    };

    if (dictKeys.hasOwnProperty(e.key) && dictActions.hasOwnProperty(dictKeys[e.key])) {
      dictActions[dictKeys[e.key]]();
      e.preventDefault();
    } else {
      console.log("No action defined for this key.")
    }
  };


  return (
    <div className={classes.root} tabIndex={-1} onKeyDown={handleKeyPress}>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={6}>
          <Record recordData={appData['pairs'][pairIndex]} recordSource="a" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Record recordData={appData['pairs'][pairIndex]} recordSource="b" />
        </Grid>


        {/* grid item for buttons at the bottom (or top))*/}
        <Grid item xs={12} sm={12}>
          <ButtonsClassifier actions={dictActions} />
        </Grid>

      </Grid>
    </div>
  );
}



