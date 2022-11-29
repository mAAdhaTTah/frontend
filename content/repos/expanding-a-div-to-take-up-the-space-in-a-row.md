---
description: Expanding a div to take up the space in a row
status: publish
gistId: ''
sync: false
createdAt: '2016-03-31T09:46:51.000Z'
updatedAt: '2016-03-31T09:46:51.000Z'
blobs:
  - filename: original.html
    code: |-
      <div class="row">
          <div class="contained">
              <span>Some Text</span>
          </div>
          <div class="expanded">
              <span>Some more text that should take up all the remaining space.</span>
          </div>
      </div>
    language: html
  - filename: updated.html
    code: |-
      <div class="table">
          <div class="row">
              <div class="contained">
                  <span>Some Text</span>
              </div>
              <div class="expanded">
                  <span>Some more text that should take up all the remaining space.</span>
              </div>
          </div>
      </div>
    language: html
  - filename: styles.css
    code: |-
      .table {
          display: table;
          width: 100%;
      }

      .row {
          display: table-row;
      }

      .contained {
          display: table-cell;
          width: 1px;
          white-space: nowrap;
      }

      .expanded {
          display: table-cell;
      }
    language: css
---

