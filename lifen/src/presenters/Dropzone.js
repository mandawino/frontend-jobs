import React from 'react'
import ReactDropzone from 'react-dropzone'


const Dropzone = (props) => {

    /**
     * Function called when the user drop a file in the dropzone
     */
    const onDrop = (files) => {
        let promises = files.map(file => {
            return new Promise((resolve, reject) => {
                    let result;
                    const reader = new FileReader();
                    reader.onload =  () => {
                        let content = btoa(reader.result);
                        result = {'name': file.path, 'file':content};
                    }
                    reader.onloadend = () => {
                        resolve(result);
                    }
                    reader.readAsBinaryString(file);
                })
        });
        Promise.all(promises).then(params => {
            props.processFiles(params);
        });
    }

    return (
        <ReactDropzone onDrop={onDrop} accept="application/pdf" maxSize={2000000}>
            {({getRootProps, getInputProps, isDragAccept, isDragReject}) => {
                let dropzoneClass = 'dropzone';
                let text = isDragReject
                    ? "Only pdf files are supported and they should not have a size more than 2mo"
                    : "Drop a file here or click to select a file";
                dropzoneClass += isDragAccept ? ' dropzone-accept' : '';
                dropzoneClass += isDragReject ? ' dropzone-reject' : '';
                return (
                    <div {...getRootProps()} className={dropzoneClass}>
                        <input {...getInputProps()}/>
                        <p>{text}</p>
                    </div>
                )
            }}
        </ReactDropzone>
    )}

export default Dropzone;