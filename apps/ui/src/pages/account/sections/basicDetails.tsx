import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import red from '@mui/material/colors/red';
import React, { useState } from 'react';
import { CustomInputField } from '../components/customInputField';
import useAppContext from '../../../context/useAppContext';
import { ImageUpload } from '../../../components';
import { CHANGE_USER_AVATAR } from '../../../services/user';
import { useCustomMutation } from '../../../hooks/useCustomMutation';

interface IField {
  name: 'name' | 'email' | 'phone';
  title: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'role' | 'password';
  onChange: (value: string) => void;
}

interface ISelectedFile {
  mainState: string;
  imageUploaded: number;
  selectedFile: File | null;
  preview: string | null;
}

export function BasicDetails() {
  const [globalState] = useAppContext();
  const currentUser = globalState.user;
  const [isOpened, setIsOpened] = useState(false);

  const [changeAvatar, { data, error, loading }] = useCustomMutation(
    CHANGE_USER_AVATAR,
    true
  );

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

  const [selectedFile, setSelectedFile] = useState<ISelectedFile>({
    mainState: 'initial',
    imageUploaded: 0,
    selectedFile: null,
    preview: null,
  });

  const handleFieldChange = (fieldName: string, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.title === fieldName ? { ...field, value } : field
      )
    );
  };

  const handleSave = async () => {
    if (selectedFile.selectedFile) {
      const file = selectedFile.selectedFile;
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const buffer = reader.result;
        if (buffer instanceof ArrayBuffer) {
          console.log('Buffer:', buffer);
          await changeAvatar({ variables: { file: buffer } });
        } else {
          console.error('Buffer is not an ArrayBuffer');
        }
      };

      reader.onerror = () => {
        console.error('File reading has failed');
      };

      reader.onabort = () => {
        console.log('File reading was aborted');
      };
    } else {
      console.error('No file selected');
    }
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
                {currentUser.name[0]}
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
        {isOpened && (
          <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            {selectedFile.selectedFile && (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    setSelectedFile({
                      mainState: 'initial',
                      imageUploaded: 0,
                      selectedFile: null,
                      preview: null,
                    })
                  }
                >
                  Remove
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
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
