import { Avatar, Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import red from '@mui/material/colors/red';
import { useState } from 'react';
import { CustomInputField } from '../components/customInputField';

export function BasicDetails() {
  const [fields, setFields] = useState([
    {
      title: 'Full Name',
      value: '',
      type: 'text' as const,
      onChange: (value: string) => handleFieldChange('Full Name', value),
    },
    {
      title: 'Email Address',
      value: '',
      type: 'email' as const,
      onChange: (value: string) => handleFieldChange('Email Address', value),
    },
    {
      title: 'Phone Number',
      value: '',
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
            <Avatar sx={{ bgcolor: red[500], width: 70, height: 70 }}>R</Avatar>
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
        {fields.map((field, index) => (
          <Box key={index} sx={{ mb: 1 }}>
            <CustomInputField
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
