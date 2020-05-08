import React from 'react';
import Iframe from 'react-iframe';

const Dashboard = () => {
  return (
    <div>
      <Iframe url="http://cs411teambfs.web.illinois.edu/phase4_rdb_dev/static/dash.html"
        width="1750"
        height="1500"
        id="myId"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default Dashboard;