import { Button } from '@mui/material';
import { useState } from 'react';

interface ISelectedFile {
  mainState: string;
  imageUploaded: number;
  selectedFile: string;
}

interface IImageUploadProps {
  initialImage: string;
  setImage: (image: string) => void;
}

const ImageUpload = ({ initialImage, setImage }: IImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<ISelectedFile>({
    mainState: 'initial', // initial
    imageUploaded: 0,
    selectedFile: 'avatar.jpg',
  });

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log();
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile({ selectedFile: [reader.result] });
    };
    console.log({ url });

    setSelectedFile({
      mainState: 'uploaded',
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <img width="200px" src={selectedFile.selectedFile} alt="upload-preview" />
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        hidden
        onChange={handleUploadClick}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
};

export { ImageUpload };
