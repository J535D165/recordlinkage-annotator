import React from 'react';
import 'typeface-roboto';

import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


export default function ExportData(props) {

  // console.log(props.reviewData);

  const exportUri = () => {
    var str = JSON.stringify(props.reviewData, null, 2);

    const blob = new Blob([str], { type: 'application/json' });
    var csvURL = window.URL.createObjectURL(blob);
    return(csvURL)
  }

  return (

          <Button color="secondary" href={exportUri()} download='result.json' >
            <SaveAltIcon />
            Export
          </Button>
  );
}








