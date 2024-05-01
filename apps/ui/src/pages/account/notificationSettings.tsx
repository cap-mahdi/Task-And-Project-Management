import { Box, Card, Divider } from '@mui/material';
import { SwitchStyleSettings } from './components/switchStyleSettings';

export function NotificationSettings() {
  const settings = [
    {
      option: 'Email',
      settings: [
        {
          title: 'Project Updates',
          description: 'News, announcement, and product updates.',
        },
        {
          title: 'Security Updates',
          description: 'Important notifications about your account security.',
        },
      ],
    },
    {
      option: 'Phone notifications',
      settings: [
        {
          title: 'Security Updates',
          description: 'Important notifications about your account security.',
        },
      ],
    },
  ];
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        pt: 1,
        px: 2,
        mt: 2,
        mx: 2,
        borderRadius: 2,
      }}
    >
      {settings.map((setting, index) => (
        <>
          <SwitchStyleSettings
            key={index}
            option={setting.option}
            settings={setting.settings}
          />
          <Divider />
        </>
      ))}
    </Card>
  );
}
