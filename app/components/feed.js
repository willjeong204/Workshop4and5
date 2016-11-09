import {postStatusUpdate} from '../server'
import {getFeedData} from '../server';
import React from 'react';
import FeedItem from './feeditem';
import StatusUpdateEntry from './statusupdateentry';
export default class Feed extends React.Component {
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    // Set state's initial value.
    // Note that the constructor is the ONLY place
    // you should EVER set state directly!
    // In all other places, use the `setState` method instead.
    // Setting `state` directly in other places will not
    // trigger `render()` to run, so your
    // program will have bugs.
    this.state = {
      // Empty feed.
      contents: []
    };
  }
  refresh() {
    getFeedData(this.props.user, (feedData) => {
      this.setState(feedData);
    });
 }

 onPost(postContents) {
   // Send to server.
   // We could use geolocation to get a location,
   // but let's fix it to Amherst for now.
   postStatusUpdate(4, "Amherst, MA", postContents, () => {
     // Database is now updated. Refresh the feed.
     this.refresh();
   });
 }

 componentDidMount() {
   this.refresh();
 }
  render() {
    return (
      <div>
        <StatusUpdateEntry />
          {this.state.contents.map((feedItem) => {
            return (
              <FeedItem key={feedItem._id} data={feedItem} />
            );
          })}
      </div>
    )
  }
  
}
