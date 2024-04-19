import { SwitchStyleSettings } from '../components/switchStyleSettings';

export function PublicProfileSettings() {
  const settings = [
    {
      option: 'Public Profile',
      settings: [
        {
          title: 'Make Contact Info Public',
          description:
            'Means that anyone viewing your profile will be able to see your contact details.',
        },
        {
          title: 'Available to hire',
          description:
            'Toggling this will let your teammates know that you are avaiable for acquiring new projects.',
        },
      ],
    },
  ];
  return (
    <SwitchStyleSettings
      option={settings[0].option}
      settings={settings[0].settings}
    />
  );
}
