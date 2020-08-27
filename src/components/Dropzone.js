import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import xlsxParser from 'xlsx-parse-json';
import {Constants} from "../Constants";
import json2xls from "../utils/json2xls";

const baseStyle = {
  alignItems: 'center',
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

function downloadFile(parsedDate, json) {
  const element = document.createElement("a");

  if (json) {
    const file = new Blob([parsedDate], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "parsed_json.json";
  } else {
    const file = new Blob([parsedDate], {type: 'binary'});
    element.href = URL.createObjectURL(file);
    element.download = "parsed_excel.xlsx";
  }

  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

function StyledDropzone(props) {
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
    accept: props.conversion === Constants.EXCEL_TO_JSON ? '.xls,.xlsx,.xml' : '.json',
    onDropAccepted: acceptedFiles => {
      if (props.conversion === Constants.EXCEL_TO_JSON) {
        if (acceptedFiles.length === 1) {
          xlsxParser
            .onFileSelection(acceptedFiles[0], {showNullProperties: true, hideEmptyRows: false})
            .then(data => {
              console.log(JSON.stringify(data, null, 2));
              // Uncomment the below line to copy the parsed json to clipboard
              // navigator.clipboard.writeText(JSON.stringify(data, null, 2));
              setCopySuccess(true);
              setError(false);
              downloadFile(JSON.stringify(data, null, 2), true);
            });
        } else {
          setError(true);
        }
      } else if (props.conversion === Constants.JSON_TO_EXCEL) {
        if (acceptedFiles.length === 1) {
          json2xls.onFileSelection(acceptedFiles[0], {}).then(data => {
            console.log(data);
            setCopySuccess(true);
            setError(false);
            downloadFile(data, false);
          });
        } else {
          setError(true);
        }
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
          {props.conversion === Constants.EXCEL_TO_JSON && <p>Excel To Json</p>}
          {props.conversion === Constants.JSON_TO_EXCEL && <p>Json To Excel</p>}
          <br/>
          <p>Drag 'n' Drop file here<br/><br/>or<br/><br/>Click to Select file</p>
        </div>}
        {copySuccess &&
        <div style={style}>Parsed {props.conversion === Constants.EXCEL_TO_JSON ? "Excel" : "Json"} saved to file
          !!</div>}
        {acceptedFiles.length > 1 && <div style={style}>Error !!<br/>Please add a single file at a time</div>}
        {errorParsing && <div style={style}>Can't parse the file...<br/>Try Another File..!!</div>}
      </div>
    </div>
  );
}

export default StyledDropzone;