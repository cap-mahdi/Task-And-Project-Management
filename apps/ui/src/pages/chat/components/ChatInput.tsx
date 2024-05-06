import { FC } from 'react';

export const ChatInput: FC = () => {
  return (
    <div>
      <input type="text" placeholder="Type a message" />
      <button>Send</button>
    </div>
  );
};
