import { notification } from 'antd';

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  
  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'topRight'
    });
  };

  return { contextHolder, openNotification };
};
