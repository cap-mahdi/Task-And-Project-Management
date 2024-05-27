import {
  Avatar,
  Box,
  Button,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import red from '@mui/material/colors/red';
import { useState } from 'react';
import { CustomInputField } from '../components/customInputField';
import useAppContext from '../../../context/useAppContext';

interface IField {
  name: 'name' | 'email' | 'phone';
  title: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'role' | 'password';
  onChange: (value: string) => void;
}

export function BasicDetails() {
  const [globalState, setGlobalState] = useAppContext();
  const currentUser = globalState.user;
  const [isOpened, setIsOpened] = useState(false);

  const [fields, setFields] = useState<IField[]>([
    {
      name: 'name',
      title: 'Full Name',
      value: currentUser?.name || '',
      type: 'text' as const,
      onChange: (value: string) => handleFieldChange('Full Name', value),
    },
    {
      name: 'email',
      title: 'Email Address',
      value: currentUser?.email || '',
      type: 'email' as const,
      onChange: (value: string) => handleFieldChange('Email Address', value),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      value: currentUser?.phone || '',
      type: 'tel' as const,
      onChange: (value: string) => handleFieldChange('Phone Number', value),
    },
  ]);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.title === fieldName ? { ...field, value } : field
      )
    );
  };

  const [image, setImage] = useState({ preview: '', data: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileBlob = new Blob([image.data], { type: image.data.type });
    const formData = new FormData();
    formData.append('file', image.data);
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/user/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: localStorage.getItem('token')
            ? `Bearer ${localStorage.getItem('token').slice(1, -1)}`
            : '',
        },
      });
      const data = await response.json();
      setGlobalState((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          avatar: data.avatar,
        },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setImage({ preview: '', data: '' });
      setIsOpened(false);
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <Box sx={{ width: '30%', fontSize: '16px' }}>
        <Typography fontWeight={'bold'}>Basic details</Typography>
      </Box>
      <Box sx={{ width: '70%' }}>
        <CardHeader
          avatar={
            currentUser?.avatar ? (
              <Avatar
                src={currentUser.avatar}
                sx={{ width: 56, height: 56, bgcolor: 'transparent' }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: red[500],
                }}
              >
                {currentUser?.name[0]}
              </Avatar>
            )
          }
          title={
            <Button
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => setIsOpened(!isOpened)}
            >
              {isOpened ? 'Close' : 'Change Avatar'}
            </Button>
          }
          sx={{
            mb: 2,
            p: 0,
          }}
        ></CardHeader>
        {isLoading && <CircularProgress />}
        {isOpened && (
          <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
            {image.preview && (
              <img src={image.preview} width="100" height="100" />
            )}
            <hr></hr>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="file"
                id="contained-button-file"
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  disabled={isLoading}
                >
                  Upload
                </Button>
              </label>
            </form>
            {image.preview && (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    setImage({
                      preview: '',
                      data: '',
                    })
                  }
                  disabled={isLoading}
                >
                  Remove
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Save
                </Button>
              </Stack>
            )}
          </Stack>
        )}
        {fields.map((field, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <CustomInputField
              name={field.name}
              title={field.title}
              value={field.value}
              type={field.type}
              onChange={field.onChange}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
