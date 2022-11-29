---
description: Arrow function problems
status: publish
gistId: ''
sync: false
createdAt: '2018-01-30T17:17:16.000Z'
updatedAt: '2018-01-30T17:30:12.000Z'
blobs:
  - filename: arrow-error.js
    code: |-
      function foo(ddb) {
        return {
          listTables: (params = {}, cb = idFunc) => {
            const self = this
            let currentList = params.currentList || []
            
            return toPromise(ddb, ddb.listTables, omit(params, 'currentList'), cb)
              .then(r => {
                console.log('LISTTABLES result', r)
                currentList = currentList.concat(r.TableNames || [])
                
                if (!r.LastEvaluatedTableName || r.TableNames.length === 0) {
                  return { ...r, TableNames: currentList }
                }

                return self.listTables({   // <- Fails here
                    ...params,
                    currentList,
                    ExclusiveStartTableName: r.LastEvaluatedTableName,
                  }, cb)
              })
          }
        }
      }
    language: js
  - filename: class-methods.js
    code: |-
      class MyClass {
        myMethod = () => {
          // ...code
        }
      }
    language: js
commits:
  - committedAt: '2018-01-30T22:30:12.000Z'
    description: Arrow function problems
    blobs:
      - filename: arrow-error.js
        code: |-
          function foo(ddb) {
            return {
              listTables: (params = {}, cb = idFunc) => {
                const self = this
                let currentList = params.currentList || []
                
                return toPromise(ddb, ddb.listTables, omit(params, 'currentList'), cb)
                  .then(r => {
                    console.log('LISTTABLES result', r)
                    currentList = currentList.concat(r.TableNames || [])
                    
                    if (!r.LastEvaluatedTableName || r.TableNames.length === 0) {
                      return { ...r, TableNames: currentList }
                    }

                    return self.listTables({   // <- Fails here
                        ...params,
                        currentList,
                        ExclusiveStartTableName: r.LastEvaluatedTableName,
                      }, cb)
                  })
              }
            }
          }
        language: js
      - filename: class-methods.js
        code: |-
          class MyClass {
            myMethod = () => {
              // ...code
            }
          }
        language: js
  - committedAt: '2018-01-30T22:17:16.000Z'
    description: Arrow function problems
    blobs:
      - filename: arrow-error.js
        code: |-
          function foo(ddb) {
            return {
              listTables: (params = {}, cb = idFunc) => {
                const self = this
                let currentList = params.currentList || []
                
                return toPromise(ddb, ddb.listTables, omit(params, 'currentList'), cb)
                  .then(r => {
                    console.log('LISTTABLES result', r)
                    currentList = currentList.concat(r.TableNames || [])
                    
                    if (!r.LastEvaluatedTableName || r.TableNames.length === 0) {
                      return { ...r, TableNames: currentList }
                    }

                    return self.listTables({   // <- Fails here
                        ...params,
                        currentList,
                        ExclusiveStartTableName: r.LastEvaluatedTableName,
                      }, cb)
                  })
              }
            }
          }
        language: js
---

