import React from "react";
import { Bars } from "react-loader-spinner";

import Error from "../components/Error";
import Empty from "../components/Empty";
import FeedList from "../components/FeedList";
import { Feed, useFeedQuery } from "../generated/graphql";
import { useDispatch } from "../context/globa-context";

const HomePage = () => {
  const { data, error, loading } = useFeedQuery();
  const dispatch = useDispatch();

  dispatch({
    type: 'FEED_FETCHED',
    payload: data?.feed as Feed
  })

  if (loading) {
    return (
      <div className="screen-center">
        <Bars />
      </div>
    );
  }

  if (error) {
    return (
      <div className="screen-center">
        <Error message={error.message} />
      </div>
    );
  }

  if (!data || !data.feed.links.length) {
    return (
      <div className="screen-center">
        <Empty />
      </div>
    );
  }

  return <FeedList links={data.feed.links}/>;
}

export default HomePage;
