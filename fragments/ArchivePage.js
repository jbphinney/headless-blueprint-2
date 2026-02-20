import { gql } from '@apollo/client';
import { FeaturedImage } from '../components';

export const ArchivePostFragment = gql`
  fragment ArchivePostFragment on ContentNode {
    id
    uri
    date
    ... on NodeWithTitle {
      title
    }
    ... on NodeWithContentEditor {
      content
    }
    ...FeaturedImageFragment
    ... on NodeWithAuthor {
      author {
        node {
          name
        }
      }
    }
  }
  ${FeaturedImage.fragments.entry}
`;
