export default `
  fragment PostTemplateFragment on wordpress__POST {
    id: wordpress_id
    title
    slug
    excerpt
    date(formatString: "MMMM Do, YYYY")
    dateTime: date
    link
    content
    format
    categories {
      id: wordpress_id
      name
      slug
      link
    }
    tags {
      id: wordpress_id
      name
      slug
      link
    }
    author {
      name
    }
    meta {
      audioEmbed: _format_audio_embed
      linkUrl: _format_link_url
      embedlyRetrieved: _url_embedly_retrieved
      embedlyProviderUrl: _url_embedly_provider_url
      embedlyProviderName: _url_embedly_provider_name
      embedlyDescription: _url_embedly_description
      quoteSourceUrl: _format_quote_source_url
      quoteSourceName: _format_quote_source_name
      videoEmbed: _format_video_embed
    }
    fields {
      oembed {
        audio {
          version
          type
          provider_name
          provider_url
          height
          width
          title
          description
          thumbnail_url
          html
          author_name
          author_url
        }
        video {
          html
          title
          thumbnail_height
          version
          provider_name
          thumbnail_width
          width
          author_name
          author_url
          height
          thumbnail_url
          provider_url
          type
          url
          cache_age
        }
      }
    }
  }
`;
