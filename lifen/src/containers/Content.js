import React, {Component} from 'react'
import Dropzone from '../presenters/Dropzone'
import File from '../presenters/File'
import Total from '../presenters/Total'

const fs = window.require('fs')
const os = window.require('os')
const path = window.require('path')
const chokidar = window.require('chokidar')


class Content extends Component {

    constructor(props){
        super(props);
        this.state = {files: {}};
    }

    componentDidMount(){
        // Watch our directory ~/FHIR
        const dir = path.join(os.homedir(), 'FHIR');
        // Only pdf files are supported
        let watcher = chokidar.watch(dir+'/**/*.pdf');
        watcher
            .on('add', (file) => {
                // The file should not have a size more than 2mo
                const size = fs.statSync(file)['size'];
                if(size < 2000000){
                    const fileName = path.basename(file);

                    let content = fs.readFileSync(file, 'base64');
                    this.processFiles([{"name": fileName, "file": content}]);

                }
            })
            .on('unlink', (file) => {
                this.setState((state) => {
                    // Destructuring in order to remove the path of the state
                    const fileName = path.basename(file);
                    const {[fileName]: value, ...newFilesState} = state.files;
                    return {'files': {...newFilesState}}
                });
            });
    }

    /**
     * Upload the file to the API server
     */
    upload = (file) => {
        console.info("Uploading", file)
        this.setState((state) => {
            return {'files': {...state.files, [file.name] : 'uploading'}};
        });
        const configFetch = {
            'method': 'POST',
            body: JSON.stringify(file)
        }
        fetch('https://fhirtest.uhn.ca/baseDstu3/Binary', configFetch)
            .then(response => {
                if(response.ok){
                    response.json()
                        .then((json) => {
                            console.info('Uploaded', json);
                            this.setState((state) => {
                                return {'files': {...state.files, [json.name] : 'uploaded'}};
                            });
                        });
                } else {
                    console.error(`Upload of ${file.name} failed`);
                    this.setState((state) => {
                        return {'files': {...state.files, [file.name] : 'failed'}};
                    });
                }
            })
            .catch((error) => {
                console.error(`Upload of ${file.name} failed`, error);
                this.setState((state) => {
                    return {'files': {...state.files, [file.name] : 'failed'}};
                });
            });
    }

    /**
     * Upload every files to the API server
     */
    uploadAll = (files) => {
        for(const file of files){
            this.upload(file);
        }
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

    /**
     * Upload every file, then find the total number of Binary
     */
    processFiles = async (files) => {
        await this.uploadAll(files);
        await this.findTotal();
    }

    render(){
        let files = Object.keys(this.state.files).map(
            (file, index) => <File key={index} file={file} status={this.state.files[file]}/>
        );
        return (<div>
            <Dropzone onDrop={this.processFiles}/>
            <div>{files}</div>
            <Total id="files" total={this.state.total}/>
        </div>)
    }
}

export default Content;