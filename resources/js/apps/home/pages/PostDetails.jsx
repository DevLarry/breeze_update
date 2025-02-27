import React from 'react';
import PostHeader from '../components/PostHeader';
import PostContent from '../components/PostContent';
import PostEngagement from '../components/PostEngagement';
import CommentInput from '../components/CommentInput';
import PostActions from "../components/PostActions";
import CommentItem from "../components/CommentItem"; 
const PostDetails = () => {
  return (
    <div className="bg-gray-50 antialiased">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md">
          <PostHeader />
          <PostContent />
          <PostEngagement />
          <PostActions />
          <div className="mt-4 space-y-4">
            <CommentInput />
            <div className="space-y-4">
              <CommentItem />
              <CommentItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;