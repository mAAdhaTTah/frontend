---
tags:
  - web
  - snippet
title: Objects for related optional props
description: ""
slug: gistpens/objects-for-related-optional-props
published_at: 2021-05-15T21:33:23.000Z
updated_at: 2021-08-15T14:59:46.000Z
share: true
---

```jsx title="CardNaive.js"
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
```

^CardNaive-js

```jsx title="add-alt.js"
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
```

^add-alt-js

```jsx title="img-obj-prop.js"
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
```

^img-obj-prop-js
