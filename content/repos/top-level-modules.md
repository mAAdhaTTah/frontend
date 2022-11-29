---
description: Top-Level Modules
status: publish
gistId: ''
sync: false
createdAt: '2021-01-16T20:47:23.000Z'
updatedAt: '2021-01-16T20:47:23.000Z'
blobs:
  - filename: WidgetView.jsx
    code: |
      import React from 'react';
      import { getWidgets, createWidget } from '../widget';

      export const WidgetView = ({ widgets }) => {
        const [widgets, setWidgets] = useState([]);
        
        useEffect(() => {
          getWidgets()
            .then(widgets => setWidgets(widgets));
        }, []);
        
        const onButtonClick = async () => {
          await createWidget();
          const widgets = await getWidgets();
          setWidget(widget);
        };

        return (
          <>
            <ul>
              {widgets.map(widget => (
                <li key={widget.id}>{widget.name}</li>
              ))}
            </ul>  
            <button onClick={onButtonClick}>Add widget</button>
          </>  
        );
      }
    language: jsx
  - filename: index.js
    code: >
      // src/widget/index.js

      export { Widget } from './Widget.js';

      export { getWidgets, createWidget, updateWidget, deleteWidget } from
      './api.js';

      export { encoder, decoder } from './schema.js';
    language: js
commits:
  - committedAt: '2021-01-17T01:47:24.000Z'
    description: Top-Level Modules
    blobs:
      - filename: index.js
        code: >
          // src/widget/index.js

          export { Widget } from './Widget.js';

          export { getWidget, createWidget, updateWidget, deleteWidget } from
          './api.js';

          export { encoder, decoder } from './schema.js';
        language: js
  - committedAt: '2021-01-17T01:12:54.000Z'
    description: Top-Level Modules
    blobs:
      - filename: index.js
        code: ''
        language: plaintext
---

