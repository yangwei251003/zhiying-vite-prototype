import { ConfigProvider } from 'antd';

const zhiyingTheme = {
  token: {
    colorPrimary: '#1F3864',
    colorPrimaryHover: '#2563EB',
    colorPrimaryActive: '#1F3864',
    colorSecondary: '#F97316',
    colorText: '#1F2937',
    colorTextSecondary: '#6B7280',
    colorBorder: '#E5E7EB',
    colorBgBase: '#F8FAFC',
    colorBgContainer: '#FFFFFF',
    borderRadius: 8,
    fontFamily: "'Microsoft YaHei', 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    Button: {
      colorPrimary: '#1F3864',
      colorPrimaryHover: '#2563EB',
      colorPrimaryActive: '#1F3864',
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
      colorBorder: '#E5E7EB',
    },
    Card: {
      borderRadius: 12,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    Tabs: {
      colorPrimary: '#1F3864',
    },
  },
};

export { zhiyingTheme, ConfigProvider };