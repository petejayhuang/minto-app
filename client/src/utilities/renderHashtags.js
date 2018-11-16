import React from 'react'
import { TextLink } from '../components/TextLink'

export const renderHashtags = hashtags => (
  <div>
    {hashtags.map(hashtag => (
      <TextLink to={`/search`} text={`#${hashtag}`} className="mr-2" />
    ))}
  </div>
)
