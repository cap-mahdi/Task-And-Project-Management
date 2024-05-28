import { createContext, useContext, useEffect, useState } from 'react';
import { EntityType, INotification } from '../components/notifications/types';
import { GET_NOTIFICATIONS } from '../services/notifications/notificationsQueries';
import { useCustomLazyQuery } from '../hooks/useCustomLazyQuery';
import {
  ProjectNotification,
  WorkspaceNotification,
} from '../__generated__/graphql';
import useAppContext from './useAppContext';
import { log } from 'console';

interface NotificationsState {
  notifications: INotification[];
  unreadCount: number;
}
const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
};

const NotificationContext = createContext({});

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [state, setState] = useState(initialState);
  const [getNotifications] = useCustomLazyQuery(GET_NOTIFICATIONS, false);
  const [globalState] = useAppContext();
  useEffect(() => {
    if (!globalState.token) return;
    getNotifications().then((res) => {
      const notifsNotifications = res?.data?.workspaceNotifications;
      const projectNotifications = res?.data?.projectNotifications;
      const notifs: INotification[] = [
        ...projectNotifications.map((notif: ProjectNotification) => ({
          ...notif,
          type: 'project',
          url: `/workspace/${notif.project.workspace.id}/project/${notif.project.id}`,
          entity: notif.project,
        })),
        ...notifsNotifications.map((notif: WorkspaceNotification) => ({
          ...notif,
          type: 'workspace',
          url: `/workspace/${notif.workspace.id}`,
          entity: notif.workspace,
        })),
      ];

      //sort based on createdAt
      notifs.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      const unreadCount = notifs.reduce(
        (acc, curr) => (curr.read ? acc : acc + 1),
        0
      );
      setState({ notifications: notifs, unreadCount });
    });
  }, [globalState.token]);

  useEffect(() => {
    console.log('TOKEN', globalState.token);
    if (globalState.token) {
      console.log('HERE');
      const eventSource = new EventSource(
        `http://localhost:3000/api/notif/sse?token=${globalState.token}`
      );
      eventSource.onopen = () => {};

      eventSource.addEventListener('project-notification', (event) => {
        const data: ProjectNotification = JSON.parse(event.data);
        setState((prev) => {
          return {
            notifications: [
              {
                ...data,
                type: EntityType.PROJECT,
                url: `/workspace/${data.project.workspace.id}/project/${data.project.id}`,
                entity: data.project,
              },
              ...prev.notifications,
            ],
            unreadCount: prev.unreadCount + 1,
          };
        });
      });

      eventSource.addEventListener('workspace-notification', (event) => {
        const data: WorkspaceNotification = JSON.parse(event.data);
        setState((prev) => {
          return {
            notifications: [
              {
                ...data,
                type: EntityType.WORKSPACE,
                url: `/workspace/${data.workspace.id}`,
                entity: data.workspace,
              },
              ...prev.notifications,
            ],
            unreadCount: prev.unreadCount + 1,
          };
        });
      });

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
      };
      return () => {
        eventSource.close();
      };
    }
  }, [globalState.token]);

  return (
    <NotificationContext.Provider value={{ state, setState }}>
      {children}
    </NotificationContext.Provider>
  );
};

const { Provider, Consumer } = NotificationContext;

export default function useNotificationContext() {
  const { state, setState } = useContext(NotificationContext);
  return [state, setState];
}
export { NotificationProvider, useNotificationContext };
