import { gql } from '@apollo/client';

// Authenticates a user.
// email and password as input parameters.
// If the login is successful, it returns a token and the user's details (ID and username).
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Creates a new user.
// username, email, and password as input parameters.
// If the user is successfully created, it returns a token and the new user's details (ID and username).
export const ADD_USER = gql`
  mutation addUser(
    $username: String! 
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username 
      email: $email 
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Updates the profile.
// about, image, firstName, lastName, and applicationData as input parameters.
// If the profile is successfully updated, it returns the profile's details ( about, image, firstName, lastName) and list of saved applications.
export const UPDATE_PROFILE = gql`
mutation UpdateProfile(
  $about: String!
  $image: String! 
  $firstName: String!
  $lastName: String!
  $applicationData: ApplicationInput
) {
  updateProfile(
    about: $about
    image: $image 
    firstName: $firstName 
    lastName: $lastName
    applicationData: $applicationData
  ) {
    about
    image
    firstName
    lastName
    applications {
      appImageURL
      appURL
      title
    }
  }
}
`;

// Add a post to a user's saved posts.
// postText as input parameter.
// If the post is successfully created, it returns the post's details (postText, postAuthor, createdAt) and a list of saved comments.
export const ADD_POST = gql`
  mutation addPost($postText: String!, $image: String) {
    addPost(postText: $postText, image: $image) {
      _id
      postText
      postAuthor
      createdAt
      image
      likes {
        _id
        likeCount
        likedBy
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const ADD_LIKE = gql`
mutation addLike($postId: ID!, $likeCount: Int!) {
  addLike(postId: $postId, likeCount: $likeCount) {
    _id
    likeCount
    likedBy
    likes {
      _id
      likeCount
      likedBy
    }
  }
}
`;

export const REMOVE_LIKE = gql`
mutation removeLike($postId: ID!, $likeId: ID!) {
  removeLike(postId: $postId, likeId: $likeId) {
    _id
    likeCount
    likedBy
    likes {
      _id
      likeCount
      likedBy
    }
  }
}
`;

// Add a comment to an existing post.
// postId and commentText as input parameters.
// If the comment is successfully created, it returns the post's details (postText, postAuthor, createdAt) and a list of the saved comments.
export const ADD_COMMENT = gql`
mutation addComment($postId: ID!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
    _id
    postText
    postAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

// Remove a post from a user's saved posts.
// postId as input parameter.
// If the post is successfully removed, it returns the post's details (_id)
export const REMOVE_POST = gql`
mutation removePost($postId: ID!) {
  removePost(postId: $postId) {
    _id
  }
}
`;

// Remove a comment from a user's saved posts.
// postId as input parameter.
// If the comment is successfully removed, it returns the post's details (postText, postAuthor, createdAt) and an updated list of saved comments.
export const REMOVE_COMMENT = gql`
mutation removeComment($postId: ID!, $commentId: ID!) {
  removeComment(postId: $postId, commentId: $commentId) {
    _id
    postText
    postAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

// Remove an application by its id.
// applicationId as input parameter.
export const REMOVE_APPLICATION = gql`
mutation RemoveApplication($applicationId: ID!) {
  removeApplication(applicationId: $applicationId) {
    applications {
      _id
      appImageURL
      appURL
      title
    }
  }
}
`;
