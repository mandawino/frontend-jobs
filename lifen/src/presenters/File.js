import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const File = (props) => {
    let status;
    switch (props.status){
        case 'uploading' : 
            status = <FontAwesomeIcon icon={faSpinner} spin/>;
            break;
        case 'uploaded' : 
            status = <FontAwesomeIcon  className='file-uploaded' icon={faCheck}/>;
            break;
        case 'failed' : 
            status = <FontAwesomeIcon  className='file-failed' icon={faTimes}/>;;
            break;
        default:
            status='';
    }
    return <h3>{`${props.file} `}{status}</h3>
}

export default File;