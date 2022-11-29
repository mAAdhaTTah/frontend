---
description: Get List of Commits
status: publish
gistId: ''
sync: false
createdAt: '2018-06-28T12:12:43.000Z'
updatedAt: '2018-06-28T12:12:43.000Z'
blobs:
  - filename: index.js
    code: |-
      const { findGitRepos, getCommitsFromRepos } = require ('./gitutils');

      findGitRepos(['~/Code/Valtech'], 5, (err, result) => {
          if (err) throw err;

          getCommitsFromRepos(result, 30, (err, result) => {
              if (err) throw err;

              console.log(result);
          });
      });
    language: js
  - filename: gitutils.js
    code: "// Stolen from here:\n// https://github.com/notwaldorf/tiny-care-terminal/blob/78e038069f01c36148d7d486d7775275d3df1df8/gitbot.js\nconst resolve = require('resolve-dir');\nconst subdirs = require('subdirs');\nconst isGit = require('is-git');\nconst gitlog = require('gitlog');\nconst path = require('path');\nconst async = require(\"async\");\nconst git = require('git-utils');\n\ntry {\n  const gitUsername = require('git-user-name')();\n} catch(err) {\n  console.error(`ERROR reading git-config.\n    Use e.g. 'git config --global user.name \"Mona Lisa\"'.\n    See 'man git config' for further information.\n  `);\n  return process.exit(0);\n}\n\n/**\n * Go through all `repos` and look for subdirectories up to a given `depth`\n * and look for repositories.\n * Calls `callback` with array of repositories.\n */\nfunction findGitRepos(repos, depth, callback) {\n  let allRepos = [];\n  async.each(repos, (repo, repoDone) => {\n    repo = resolve(repo);\n    subdirs(repo, depth, (err, dirs) => {\n      if (err) {\n        switch (err.code) {\n          case 'ENOENT':\n            return callback(`Could not open directory directory: ${err.path}n`, null);\n          case 'EACCES':\n            return; //ignore if no access\n          default:\n            return callback(`Error \"${err.code}\" doing \"${err.syscall}\" on directory: ${err.path}n`, null);\n        }\n      }\n      if (dirs) dirs.push(repo);\n      async.each(dirs, (dir, dirDone) => {\n        isGit(dir, (err, isGit) => {\n          if (err) {\n            return callback(err, null);\n          }\n          if (!dir.includes('.git') && isGit) {\n            allRepos.push(dir);\n          }\n          dirDone();\n        });\n      }, repoDone);\n    });\n  }, err => {\n    callback(err, allRepos.sort().reverse());\n  });\n}\n\n/**\n * returns all commits of the last given `days`.\n * Calls `callback` with line-seperated-strings of the formatted commits.\n */\nfunction getCommitsFromRepos(repos, days, callback) {\n  let cmts = [];\n  async.each(repos, (repo, repoDone) => {\n    let localGitUsername = '';\n    try {\n      const gitUtilsRepo = git.open(repo);\n      localGitUsername = gitUtilsRepo.getConfigValue('user.name') || gitUsername;\n    } catch (err) {\n      localGitUsername = gitUsername;\n    }\n    try {\n      gitlog({\n        repo: repo,\n        all: true,\n        number: 100, //max commit count\n        since: `${days} days ago`,\n        fields: ['abbrevHash', 'subject', 'authorDate', 'authorName'],\n        author: localGitUsername\n      }, (err, logs) => {\n        // Error\n        if (err) {\n          callback(`Oh noes\U0001F631nThe repo ${repo} has failed:n${err}`, null);\n        }\n        // Find user commits\n        let commits = [];\n        logs.forEach(c => {\n          // filter simple merge commits\n          if (c.status && c.status.length)\n            commits.push(`${c.abbrevHash} - ${c.subject} (${c.authorDate}) <${c.authorName.replace('@end@n','')}>`);\n        });\n\n        // Add repo name and commits\n        if (commits.length >= 1) {\n          // Repo name\n          cmts.push(repo);\n          cmts.push(...commits);\n        }\n\n        repoDone();\n      });\n    } catch(err) {\n      callback(err, null);\n    }\n  }, err => {\n    callback(err, cmts.length > 0 ? cmts.join('n') : \"Nothing yet. Start small!\");\n  });\n}\n\nmodule.exports.findGitRepos = findGitRepos;\nmodule.exports.getCommitsFromRepos = getCommitsFromRepos;"
    language: js
commits:
  - committedAt: '2018-06-28T16:12:43.000Z'
    description: Get List of Commits
    blobs:
      - filename: index.js
        code: |-
          const { findGitRepos, getCommitsFromRepos } = require ('./gitutils');

          findGitRepos(['~/Code/Valtech'], 5, (err, result) => {
              if (err) throw err;

              getCommitsFromRepos(result, 30, (err, result) => {
                  if (err) throw err;

                  console.log(result);
              });
          });
        language: js
      - filename: gitutils.js
        code: "// Stolen from here:\n// https://github.com/notwaldorf/tiny-care-terminal/blob/78e038069f01c36148d7d486d7775275d3df1df8/gitbot.js\nconst resolve = require('resolve-dir');\nconst subdirs = require('subdirs');\nconst isGit = require('is-git');\nconst gitlog = require('gitlog');\nconst path = require('path');\nconst async = require(\"async\");\nconst git = require('git-utils');\n\ntry {\n  const gitUsername = require('git-user-name')();\n} catch(err) {\n  console.error(`ERROR reading git-config.\n    Use e.g. 'git config --global user.name \"Mona Lisa\"'.\n    See 'man git config' for further information.\n  `);\n  return process.exit(0);\n}\n\n/**\n * Go through all `repos` and look for subdirectories up to a given `depth`\n * and look for repositories.\n * Calls `callback` with array of repositories.\n */\nfunction findGitRepos(repos, depth, callback) {\n  let allRepos = [];\n  async.each(repos, (repo, repoDone) => {\n    repo = resolve(repo);\n    subdirs(repo, depth, (err, dirs) => {\n      if (err) {\n        switch (err.code) {\n          case 'ENOENT':\n            return callback(`Could not open directory directory: ${err.path}n`, null);\n          case 'EACCES':\n            return; //ignore if no access\n          default:\n            return callback(`Error \"${err.code}\" doing \"${err.syscall}\" on directory: ${err.path}n`, null);\n        }\n      }\n      if (dirs) dirs.push(repo);\n      async.each(dirs, (dir, dirDone) => {\n        isGit(dir, (err, isGit) => {\n          if (err) {\n            return callback(err, null);\n          }\n          if (!dir.includes('.git') && isGit) {\n            allRepos.push(dir);\n          }\n          dirDone();\n        });\n      }, repoDone);\n    });\n  }, err => {\n    callback(err, allRepos.sort().reverse());\n  });\n}\n\n/**\n * returns all commits of the last given `days`.\n * Calls `callback` with line-seperated-strings of the formatted commits.\n */\nfunction getCommitsFromRepos(repos, days, callback) {\n  let cmts = [];\n  async.each(repos, (repo, repoDone) => {\n    let localGitUsername = '';\n    try {\n      const gitUtilsRepo = git.open(repo);\n      localGitUsername = gitUtilsRepo.getConfigValue('user.name') || gitUsername;\n    } catch (err) {\n      localGitUsername = gitUsername;\n    }\n    try {\n      gitlog({\n        repo: repo,\n        all: true,\n        number: 100, //max commit count\n        since: `${days} days ago`,\n        fields: ['abbrevHash', 'subject', 'authorDate', 'authorName'],\n        author: localGitUsername\n      }, (err, logs) => {\n        // Error\n        if (err) {\n          callback(`Oh noes\U0001F631nThe repo ${repo} has failed:n${err}`, null);\n        }\n        // Find user commits\n        let commits = [];\n        logs.forEach(c => {\n          // filter simple merge commits\n          if (c.status && c.status.length)\n            commits.push(`${c.abbrevHash} - ${c.subject} (${c.authorDate}) <${c.authorName.replace('@end@n','')}>`);\n        });\n\n        // Add repo name and commits\n        if (commits.length >= 1) {\n          // Repo name\n          cmts.push(repo);\n          cmts.push(...commits);\n        }\n\n        repoDone();\n      });\n    } catch(err) {\n      callback(err, null);\n    }\n  }, err => {\n    callback(err, cmts.length > 0 ? cmts.join('n') : \"Nothing yet. Start small!\");\n  });\n}\n\nmodule.exports.findGitRepos = findGitRepos;\nmodule.exports.getCommitsFromRepos = getCommitsFromRepos;"
        language: js
---

