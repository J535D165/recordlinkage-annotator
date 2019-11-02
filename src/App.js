import React, { useState } from 'react'
import 'typeface-roboto';

import './App.css';

import ReviewDropzone from './Dropzone.js' 
import ReviewZone from './Reviewzone.js'
import ButtonAppBar from './AppBar.js'
import ExportData from './ExportData.js'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    type:'light',
    secondary: {
      main: '#f44336',
    },
  },
});

// favicon: https://favicon.io/favicon-generator/?t=RL&ff=Kreon&fs=80&fc=%23FFFFFF&b=rounded&bc=%2337474f


export default function App() {

  // Declare a new state variable for stopping
  const [isState, setIsState] = useState("upload");

  // Declare a new state contant for the index
  const [appData, setData] = useState(undefined);

  const reviewData = (data) => {
    console.log(data);
    setData(data);
  };


  const reviewState = (state) => {
    setIsState(state);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <ButtonAppBar reviewState={isState}/>
      <CssBaseline />
      <Container maxWidth="md" fixed>


        <Typography component="div" style={{ paddingTop: '50px', height: '100vh' }}>

          {isState === 'upload' &&
            <React.Fragment>
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                Record pair labelling for record linkage and data matching
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Turn your record pairs into golden record pairs with this webbased, intuitive labelling tool. Labelled record pairs are important for training and validation record linkage and data matching processes. <Link href="https://www.github.com/J535D165/recordlinkage" target="_blank">Read more</Link> on the documentation page of the Python Record Linkage Toolkit.
              </Typography>
            <ReviewDropzone reviewData={reviewData} reviewState={reviewState}/>
            </React.Fragment>
          }

          { isState === 'review' && 
            <ReviewZone reviewState={reviewState} reviewData={appData}/>
          }

          {isState === 'export' &&
            <React.Fragment>
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                Done!
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                You finished the annotation. You can now export the data and save it for further analysis. 
              </Typography>

              <ExportData reviewData={appData}/>

            </React.Fragment>
          }

        </Typography>
        
      </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}