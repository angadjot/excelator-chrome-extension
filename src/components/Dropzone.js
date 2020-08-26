import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import xlsxParser from 'xlsx-parse-json';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#ffffff',
  borderStyle: 'dashed',
  backgroundColor: '#282c34',
  color: '#eeeeee',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  justifyContent: 'center',
  minHeight: '75vh',
  minWidth: '75vw',
  textAlign: 'center',
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

function downloadTxtFile(parsedJson) {
  const element = document.createElement("a");
  const file = new Blob([parsedJson], {type: 'application/json'});
  element.href = URL.createObjectURL(file);
  element.download = "parsed_json.json";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

function StyledDropzone() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorParsing, setError] = useState(false);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: '.xls,.xlsx,.xml',
    onDropAccepted: acceptedFiles => {
      if (acceptedFiles.length === 1) {
        xlsxParser
          .onFileSelection(acceptedFiles[0])
          .then(data => {
            console.log(JSON.stringify(data, null, 2));
            // Uncomment the below line to copy the parsed json to clipboard
            // navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setCopySuccess(true);
            setError(false);
            downloadTxtFile(JSON.stringify(data, null, 2));
          });
      } else {
        setError(true);
      }
    },
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div className="Basic">
      <div className="container">
        {acceptedFiles.length === 0 &&
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' Drop file here<br/><br/>or<br/><br/>Click to Select file</p>
        </div>}
        {copySuccess && <div style={style}>Parsed json saved to file !!</div>}
        {acceptedFiles.length > 1 && <div style={style}>Error !!<br/>Please add a single file at a time</div>}
        {errorParsing && <div style={style}>Can't parse the file...<br/>Try Another File..!!</div>}
      </div>
    </div>
  );
}

export default StyledDropzone;