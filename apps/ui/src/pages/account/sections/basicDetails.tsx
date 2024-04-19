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
    {
      title: 'Role',
      value: '',
      type: 'role' as const,
      onChange: (value: string) => handleFieldChange('Role', value),
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
    <Card
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}
    >
      <Grid container>
        <Grid item sx={{ width: '30%' }}>
          <Typography variant="h5" fontWeight={'bold'}>
            Basic details
          </Typography>
        </Grid>
        <Grid item sx={{ width: '70%' }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
            title={
              <a
                href="/account"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Change
              </a>
            }
            sx={{ mb: 2 }}
          ></CardHeader>
          {fields.map((field, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <CustomInputField
                title={field.title}
                value={field.value}
                type={field.type}
                onChange={field.onChange}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
}
