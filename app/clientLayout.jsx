"use client";

import "@ant-design/v5-patch-for-react-19"; 
import { ConfigProvider, App } from "antd";
import theme from "@/src/lib/antd/themeConfig";
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function ClientLayout({ children }) {

  return (
    <ConfigProvider theme={theme}>
      <AntdRegistry>
        <App>
          {children}
        </App>
      </AntdRegistry>
    </ConfigProvider>
  );
}
