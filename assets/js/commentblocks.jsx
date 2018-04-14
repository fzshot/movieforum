import React from 'react';
import ReactDOM from 'react-dom';


function CommentBlocks(props) {
  let all_comments = props.comments;
  return (
    <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        <div>
          <Comments_list comments={all_comments} />
        </div>
        <form className="ui reply form">
          <div className="field">
            <textarea></textarea>
          </div>
          <div className="ui blue labeled submit icon button">
            <i className="icon edit"></i> Add Reply
          </div>
        </form>
    </div>
    );
}

function Comments_list(props) {
  let all = [];
  let all_comments = props.comments;
  _.each(all_comments, (comment) => {
        all.push(
          <tr key={comment.id.toString()}>
            <div className="comment">
              <div className="content">
                <a className="author">{comment.author}</a>
                <div className="metadata">
                  <span className="date">{comment.date}</span>
                </div>
                <div className="text">
                  {comment.body}
                </div>
              </div>
            </div>
          </tr>);
    });
    return all;
}


function state2props(state) {
    return {

    };
}

export default connect(state2props)(CommentBlocks);
