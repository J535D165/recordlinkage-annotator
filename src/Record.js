import React from 'react';
import 'typeface-roboto';

import RecordItem from './RecordItem.js'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 8,
  },
}));

export default function Record(props) {
  const classes = useStyles();


  return (

	<Card className={classes.paper}>
    <CardHeader 
      title={(typeof props.recordData.identifiers[props.recordSource].record !== 'undefined') ? "Record " + props.recordData.identifiers[props.recordSource].record : ""} 
      subheader={props.recordData.identifiers[props.recordSource].dataset}
    />

    {/* The content of the card. */}
    <CardContent>
      <List className={classes.root}>

        {props.recordData.fields.map((value, index) => {
          return (
            <React.Fragment key={index.toString()}>
              <RecordItem itemText={value[props.recordSource].value} />
              <Divider component="li" />
            </React.Fragment>
          )
        })}
      
      </List>

    </CardContent>

  </Card>

  );
}








