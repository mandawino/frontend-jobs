import React, {Component} from 'react'
import ReactDropzone from 'react-dropzone'

class Dropzone extends Component {
    /**
     * Upload the file to the API server
     */
    upload = (file) => {
        const configFetch = {
            'method': 'POST',
            body: file
        }
        fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', configFetch)
            .then(response => {
                response.text()
                    .then(() => {
                        this.setState({
                            'file' : file
                        })
                    });
            });
    }

    /**
     * Find the total number of Binary
     */
    findTotal = () => {
        const configFetch = {
            'method': 'GET'
        }
        fetch('https://fhirtest.uhn.ca/baseDstu3/Binary/_history', configFetch)
            .then(response => {
                response.json()
                    .then(json => {
                        this.setState({
                            'total' : json.total
                        });
                    });
            });
    }

    onDrop = async (files) => {
        // Only one file asked
        const file = files[0];
        
        await this.upload(file);
        await this.findTotal();
    }

    render(){
        let filename = '';
        let total = '';
        if (this.state){
            filename = this.state.file ? `${this.state.file.path} uploaded` : '';
            total = this.state.total ? `Total number of Binary : ${this.state.total}` : '';
        }
        return (<div>
            <ReactDropzone onDrop={this.onDrop.bind(this)} multiple={false}>
                {({getRootProps, getInputProps, isDragActive}) => {
                    let dropzoneClass = 'dropzone';
                    if (isDragActive) {
                        dropzoneClass += ' dropzone-active';
                    }
                    return (
                        <div {...getRootProps()} className={dropzoneClass}> 
                            <input {...getInputProps()}/>
                            <p>Drop a file here or click to select a file</p>
                        </div>
                    )
                }}
            </ReactDropzone>
            <h2>{filename}</h2>
            <h4>{total}</h4>
        </div>)
    }
}

export default Dropzone;