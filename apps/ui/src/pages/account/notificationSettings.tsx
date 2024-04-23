import { Box } from '@mui/material';
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
    <>
      {settings.map((setting, index) => (
        <Box key={index}>
          <SwitchStyleSettings
            option={setting.option}
            settings={setting.settings}
          />
        </Box>
      ))}
    </>
  );
}
