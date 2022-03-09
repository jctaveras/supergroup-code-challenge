import React, { FunctionComponent } from "react";

import FeedLink from "../FeedLink";
import './styles.css';

interface FeedProps {
  links: {
    id: number;
    description: string;
    url: string;
  }[]
}

const FeedList: FunctionComponent<FeedProps> = ({ links }) => {
  return (
    <ul className="feed">
      {links.map(link => (
        <FeedLink
          key={link.id}
          description={link.description}
          url={link.url}
        />
      ))}
    </ul>
  );
};

export default FeedList;
