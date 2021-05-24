import { DropzoneArea } from 'material-ui-dropzone';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';

export default function DropZone(props){
    return(
        <>
            <DropzoneArea
                acceptedFiles={['image/jpeg','image/jpg','image/png', 'image/gif', 'image/svg']}
                filesLimit={10}
                Icon={AddAPhotoSharpIcon}
                maxFileSize={5242880}
                dropzoneText="Drop images here or Click"
                showPreviewsInDropzone={false}
                onChange={props.handleChange}
            />
        </>
    )
}