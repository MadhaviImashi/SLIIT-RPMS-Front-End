import 'bootstrap/dist/css/bootstrap.min.css';
import './Notice.css';
import React from 'react';
import NoticeCard from './NoticeCard';

const Notice = () => {
  return (
    <div className="notice-container">
      <p className="text-center">Notices</p>
      <div className="notice-card-container row">
        <NoticeCard />
        <NoticeCard />
        <NoticeCard />
        <NoticeCard />
      </div>
    </div>
  );
};

export default Notice;
