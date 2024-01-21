import React, { useEffect } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { Pagination } from './Pagination';
   
  export function ProfileDetail({userProfile}) {
    return (
      <Tabs value="html" className="max-w-full border">
        <TabsHeader
          className="bg-transparent"
          indicatorProps={{
            className: "bg-gray-900/10 shadow-none  !text-gray-900",
          }}
        >
            <Tab key="posts" value="posts" className='border rounded min-w-fit'>
              投稿記事
            </Tab>
            <Tab key="favorites" value="favorites" className='border min-w-fit'>
              いいね
            </Tab>
        </TabsHeader>
        <TabsBody>
            <TabPanel key="posts" value="posts">
            <Pagination params={{user:userProfile}} />
            </TabPanel>
            <TabPanel key="favorites" value="favorites">
            <Pagination params={{favorites:userProfile}} />
            </TabPanel>
        </TabsBody>
      </Tabs>
    );
  }

export default ProfileDetail