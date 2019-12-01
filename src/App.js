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
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [theme, setTheme] = useState({
    palette: {
      primary: blueGrey,
      type: prefersDarkMode ? 'light' : 'dark', // strange. prefersDarkmode returns first the opposite
    }
  });

  // we change the palette type of the theme in state
  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    setTheme({
      palette: {
        primary: blueGrey,
        type: newPaletteType,
      }
    });
  };

  // we generate a MUI-theme from state's theme object
  const muiTheme = createMuiTheme(theme);

  return (
    <React.Fragment>
      <ThemeProvider theme={muiTheme}>
      <ButtonAppBar reviewState={isState} onToggleDark={toggleDarkTheme}/>
      <CssBaseline />
      <Container maxWidth="md" fixed>


        <Typography component="div" style={{ paddingTop: '50px', height: '100vh' }}>

          {isState === 'upload' &&
            <React.Fragment>
              <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
                Record pair labeling for record linkage and data matching
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Turn your record pairs into golden record pairs with this intuitive labeling tool. Labeled record pairs are important for training and validation record linkage and data matching processes. <Link href="https://github.com/J535D165/recordlinkage-annotator#create-annotation-file" target="_blank">Create an annotation file</Link> and start labeling your data!
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