import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

  const [selectefFileUrl, setSelectefFileUrl] = useState<string>('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setSelectefFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept="image/*"/>
      
      { selectefFileUrl
          ? <img src={selectefFileUrl} alt='Point Thumbmail' ></img>
          : (
            isDragActive ?
            <p>Solte os arquivos aqui ...</p> :
            <p>
              <FiUpload />
              Imagem do estabelicimento (arraste e solte  ou clique aqui)
            </p>
          )
      }
    </div>
  )
}

export default Dropzone;
