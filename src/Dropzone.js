import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import 'typeface-roboto';



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


export default function ReviewDropzone(props) {

  const onDrop = useCallback(acceptedFiles => {

    if (acceptedFiles.length !== 1){
      console.log("No valid files provided.")
      return 
    }

    // show the file
    console.log(acceptedFiles[0]);

    // file reader
    const reader = new FileReader()

    // file reading failed
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')

    // file reading successfull
    reader.onload = () => {
      const jsonReview = JSON.parse(reader.result);
      // console.log(jsonReview)

      // store data on a root level
      props.reviewData(jsonReview);

      // go the the next screen
      props.reviewState("review");

    }

    // read the file (this calls onload defined above)
    reader.readAsText(acceptedFiles[0])

  }, [props])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    // acceptedFiles,
    // rejectedFiles
  } = useDropzone({
    onDrop, 
    accept: 'application/json,.json',
    multiple: false
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
        {(isDragAccept && !isDragReject) && (<p>Drop the file here</p>)}
        {isDragReject && (<p>Reject - Please drop a .json file</p>)}
        {!isDragActive && (<p>Drag 'n' drop annotation file here, or click to select</p>)}
    </div>


  )
}
