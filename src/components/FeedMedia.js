import React from 'react'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'

const FeedMedia = (props) => {
  const getMediaDetails = () => {
    switch (props.contentType) {
      case 'image': {
        if (props.data.url) {
          return (
            <div className='media-image'>
              <img src={props.data.url} alt='text' />
            </div>
          )
        }
        return null
      }
      case 'slideShow': {
        let gallery = null
        let images = []
        try {
          if (props.data.urls) {
            props.data.urls.map((url) => {
              return images.push({
                original: url,
                thumbnail: url
              })
            })
            gallery = (
              <div className='media-gallery'>
                <ImageGallery enableLightbox={false} items={images} />
              </div>
            )
          }
        } catch (error) {
          console.log(error)
        }
        return gallery
      }
      case 'video': {
        if (props.data.url) {
          return (
            <div className='media-video'>
              <video controls name='media' poster={props.data.thumbnailUrl}>
                <source src={props.data.url} />
              </video>
            </div>
          )
        }
        return null
      }
      default: {
        return null
      }
    }
  }
  return (
    <div className='feed-media'>
      <div className='media-detail'>
        {getMediaDetails()}
      </div>
    </div>
  )
}

export default FeedMedia
