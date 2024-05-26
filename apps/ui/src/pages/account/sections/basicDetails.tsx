import { Avatar, Box, CardHeader, Typography } from '@mui/material';
import red from '@mui/material/colors/red';
import { useState } from 'react';
import { CustomInputField } from '../components/customInputField';
import useAppContext from '../../../context/useAppContext';
import { ImageUpload } from '../../../components';

interface IField {
  name: 'name' | 'email' | 'phone';
  title: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'role' | 'password';
  onChange: (value: string) => void;
}

export function BasicDetails() {
  const [globalState] = useAppContext();
  const currentUser = globalState.user;

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

  const [avatar, setAvatar] = useState<string>('' || currentUser?.avatar);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.title === fieldName ? { ...field, value } : field
      )
    );
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
            <Avatar sx={{ width: 70, height: 70 }} src={avatar}>
              {!avatar && currentUser?.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <a
              href="/account"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Change
            </a>
          }
          sx={{
            mb: 2,
            p: 0,
          }}
        ></CardHeader>
        <ImageUpload initialImage={avatar} setImage={setAvatar} />
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
