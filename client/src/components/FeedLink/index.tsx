import React, { FunctionComponent } from "react";

import './styles.css';

interface LinkProps {
  description: string;
  url: string;
}

const FeedLink: FunctionComponent<LinkProps> = ({ description, url }) => (
  <div className="feed-link">
    <a href={url} target="_blank" rel="noopener noreferrer">{description}</a>
  </div>
);

export default FeedLink;
