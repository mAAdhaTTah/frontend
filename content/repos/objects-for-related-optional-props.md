---
description: Objects for related optional props
status: publish
gistId: ''
sync: false
createdAt: '2021-05-15T21:33:23.000Z'
updatedAt: '2021-08-15T14:59:46.000Z'
blobs:
  - filename: CardNaive.js
    code: |-
      const Card = ({ heading, description, imageSrc }) => {
        return (
          <div className="card">
            {imageSrc && <img src={imageSrc} />}
            <h1 className="card-heading">{heading}</h1>
            <p className="card-description">{description}</p>
          </div>
        );
      };

      Card.propTypes = {
        heading: PropTypes.string.isRequired,
        description: PropTypes.description.isRequired,
        imageSrc: PropTypes.string,
      };
    language: jsx
  - filename: add-alt.js
    code: |+
      const Card = ({ heading, description, imageSrc, imageAlt }) => {
        return (
          <div className="card">
            {imageSrc && <img src={imageSrc} alt={imageAlt} />}
            <h1 className="card-heading">{heading}</h1>
            <p className="card-description">{description}</p>
          </div>
        );
      };

      Card.propTypes = {
        heading: PropTypes.string.isRequired,
        description: PropTypes.description.isRequired,
        imageSrc: PropTypes.string,
        imageAlt: PropTypes.string,
      };

    language: jsx
  - filename: img-obj-prop.js
    code: |
      const Card = ({ heading, description, imageSrc, imageAlt }) => {
        return (
          <div className="card">
            {imageSrc && <img src={imageSrc} alt={imageAlt} />}
            <h1 className="card-heading">{heading}</h1>
            <p className="card-description">{description}</p>
          </div>
        );
      };

      Card.propTypes = {
        heading: PropTypes.string.isRequired,
        description: PropTypes.description.isRequired,
        imageSrc: PropTypes.string,
        imageAlt: PropTypes.string,
      };
    language: jsx
commits:
  - committedAt: '2021-05-16T01:33:23.000Z'
    description: Objects for related optional props
    blobs:
      - filename: CardNaive.js
        code: ''
        language: plaintext
---

