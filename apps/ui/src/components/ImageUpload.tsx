import { Button, Stack } from '@mui/material';

interface ISelectedFile {
  mainState: string;
  imageUploaded: number;
  selectedFile: any;
}

interface IImageUploadProps {
  selectedFile: ISelectedFile;
  setSelectedFile: (value: ISelectedFile) => void;
}

const ImageUpload = ({ selectedFile, setSelectedFile }: IImageUploadProps) => {
  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile({ selectedFile: [reader.result] });
    };

    setSelectedFile({
      mainState: 'uploaded',
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  return (
    <Stack spacing={2}>
      {selectedFile.selectedFile && (
        <img
          width="200px"
          src={selectedFile.selectedFile}
          alt="upload-preview"
        />
      )}
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
    </Stack>
  );
};

export { ImageUpload };
