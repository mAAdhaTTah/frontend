---
description: Sync ownCloud bookmarks to Pinboard
status: publish
gistId: ''
sync: false
createdAt: '2018-12-02T22:03:34.000Z'
updatedAt: '2018-12-02T22:03:34.000Z'
blobs:
  - filename: __main__.py
    code: |-
      import os
      import requests
      from bs4 import BeautifulSoup
      from termcolor import cprint
      from dotenv import load_dotenv


      class Hydrator(object):
          def __init__(self):
              self.soups = {}

          def title(self, url):
              soup = self._get_soup(url)
              title = soup.title.string

              if title == "":
                  cprint(f"Url provided as title for {url}", "white", "on_blue")
                  title = url

              return title

          def description(self, url):
              soup = self._get_soup(url)
              meta = soup.find_all("meta")

              for tag in meta:
                  if (
                      "name" in tag.attrs.keys()
                      and tag.attrs["name"].strip().lower() == "description"
                  ):
                      content = tag.attrs.get("content")

                      if content is None:
                          content = tag.attrs.get("value")

                      if content is None:
                          cprint(f"No content found", "red")
                          print(tag.attrs.keys())
                      else:
                          return content

              cprint(f"No description found for {url}", "white", "on_blue")

              return ""

          def _get_soup(self, url):
              soup = self.soups.get(url)

              if soup is None:
                  response = requests.get(url)
                  soup = self.soups[url] = BeautifulSoup(response.content, "lxml")

              return soup


      hydrate = Hydrator()


      def get_bookmark_from_pinboard(url):
          response = requests.get(
              url="https://api.pinboard.in/v1/posts/get",
              params={
                  "url": url,
                  "auth_token": os.getenv("PINBOARD_AUTH_TOKEN"),
                  "format": "json",
              },
          )

          posts = response.json()["posts"]

          return posts[0] if len(posts) == 1 else None


      def hydrate_bookmark(bookmark):
          title = bookmark["title"]
          url = bookmark["url"]
          description = bookmark["description"]

          if title == url or title == "":
              title = hydrate.title(url)

          if description == url or description == "":
              description = hydrate.description(url)

          return {
              "url": url,
              "title": title,
              "description": description,
              "tags": bookmark["tags"],
          }


      def add_bookmark_to_pinboard(bookmark):
          response = requests.get(
              url="https://api.pinboard.in/v1/posts/add",
              params={
                  "auth_token": os.getenv("PINBOARD_AUTH_TOKEN"),
                  "format": "json",
                  "url": bookmark["url"],
                  # actually title
                  "description": bookmark["title"],
                  # actually description
                  "extended": bookmark["description"],
                  "tags": ",".join(bookmark["tags"]),
              },
          )

          body = response.json()

          return body["result_code"] == "done"


      def process_bookmark(bookmark):
          url = bookmark["url"]
          pinboard_bookmark = get_bookmark_from_pinboard(url)

          # Add only if we don't find the bookmark in pinboard.
          if pinboard_bookmark is None:
              hydrated = hydrate_bookmark(bookmark)
              success = add_bookmark_to_pinboard(hydrated)

              if success:
                  cprint(f"Successfully added {url} to pinboard", "green")
              else:
                  cprint(f"Error adding {url} to pinboard", "red")
          else:
              cprint(f"Url {url} found in Pinboard. Skipping.", "yellow")


      def send_request(page=0):
          try:
              response = requests.get(
                  url=f'https://{os.getenv("OWNCLOUD_DOMAIN")}/index.php/apps/bookmarks/bookmark',
                  params={"type": "bookmark", "page": page},
                  headers={
                      "Cookie": os.getenv("OWNCLOUD_COOKIE"),
                      "requesttoken": os.getenv("OWNCLOUD_REQUEST_TOKEN"),
                  },
              )

              body = response.json()
              status = body["status"]

              if status == "success":
                  data = body["data"]

                  for bookmark in data:
                      process_bookmark(bookmark)

                  if len(data) != 0:
                      send_request(page + 1)
          except requests.exceptions.RequestException as err:
              cprint(f"Request failed: {err.request.url}", "red")


      if __name__ == "__main__":
          load_dotenv()
          send_request()
    language: py
  - filename: .env
    code: |-
      PINBOARD_AUTH_TOKEN=username:token
      OWNCLOUD_DOMAIN=your.owncloud.domain.com
      OWNCLOUD_COOKIE=Get this from the network tab of the bookmarks page
      OWNCLOUD_REQUEST_TOKEN=Also from the network tab
    language: plaintext
commits:
  - committedAt: '2018-12-03T03:03:34.000Z'
    description: Sync ownCloud bookmarks to Pinboard
    blobs:
      - filename: __main__.py
        code: |-
          import os
          import requests
          from bs4 import BeautifulSoup
          from termcolor import cprint
          from dotenv import load_dotenv


          class Hydrator(object):
              def __init__(self):
                  self.soups = {}

              def title(self, url):
                  soup = self._get_soup(url)
                  title = soup.title.string

                  if title == "":
                      cprint(f"Url provided as title for {url}", "white", "on_blue")
                      title = url

                  return title

              def description(self, url):
                  soup = self._get_soup(url)
                  meta = soup.find_all("meta")

                  for tag in meta:
                      if (
                          "name" in tag.attrs.keys()
                          and tag.attrs["name"].strip().lower() == "description"
                      ):
                          content = tag.attrs.get("content")

                          if content is None:
                              content = tag.attrs.get("value")

                          if content is None:
                              cprint(f"No content found", "red")
                              print(tag.attrs.keys())
                          else:
                              return content

                  cprint(f"No description found for {url}", "white", "on_blue")

                  return ""

              def _get_soup(self, url):
                  soup = self.soups.get(url)

                  if soup is None:
                      response = requests.get(url)
                      soup = self.soups[url] = BeautifulSoup(response.content, "lxml")

                  return soup


          hydrate = Hydrator()


          def get_bookmark_from_pinboard(url):
              response = requests.get(
                  url="https://api.pinboard.in/v1/posts/get",
                  params={
                      "url": url,
                      "auth_token": os.getenv("PINBOARD_AUTH_TOKEN"),
                      "format": "json",
                  },
              )

              posts = response.json()["posts"]

              return posts[0] if len(posts) == 1 else None


          def hydrate_bookmark(bookmark):
              title = bookmark["title"]
              url = bookmark["url"]
              description = bookmark["description"]

              if title == url or title == "":
                  title = hydrate.title(url)

              if description == url or description == "":
                  description = hydrate.description(url)

              return {
                  "url": url,
                  "title": title,
                  "description": description,
                  "tags": bookmark["tags"],
              }


          def add_bookmark_to_pinboard(bookmark):
              response = requests.get(
                  url="https://api.pinboard.in/v1/posts/add",
                  params={
                      "auth_token": os.getenv("PINBOARD_AUTH_TOKEN"),
                      "format": "json",
                      "url": bookmark["url"],
                      # actually title
                      "description": bookmark["title"],
                      # actually description
                      "extended": bookmark["description"],
                      "tags": ",".join(bookmark["tags"]),
                  },
              )

              body = response.json()

              return body["result_code"] == "done"


          def process_bookmark(bookmark):
              url = bookmark["url"]
              pinboard_bookmark = get_bookmark_from_pinboard(url)

              # Add only if we don't find the bookmark in pinboard.
              if pinboard_bookmark is None:
                  hydrated = hydrate_bookmark(bookmark)
                  success = add_bookmark_to_pinboard(hydrated)

                  if success:
                      cprint(f"Successfully added {url} to pinboard", "green")
                  else:
                      cprint(f"Error adding {url} to pinboard", "red")
              else:
                  cprint(f"Url {url} found in Pinboard. Skipping.", "yellow")


          def send_request(page=0):
              try:
                  response = requests.get(
                      url=f'https://{os.getenv("OWNCLOUD_DOMAIN")}/index.php/apps/bookmarks/bookmark',
                      params={"type": "bookmark", "page": page},
                      headers={
                          "Cookie": os.getenv("OWNCLOUD_COOKIE"),
                          "requesttoken": os.getenv("OWNCLOUD_REQUEST_TOKEN"),
                      },
                  )

                  body = response.json()
                  status = body["status"]

                  if status == "success":
                      data = body["data"]

                      for bookmark in data:
                          process_bookmark(bookmark)

                      if len(data) != 0:
                          send_request(page + 1)
              except requests.exceptions.RequestException as err:
                  cprint(f"Request failed: {err.request.url}", "red")


          if __name__ == "__main__":
              load_dotenv()
              send_request()
        language: py
      - filename: .env
        code: |-
          PINBOARD_AUTH_TOKEN=username:token
          OWNCLOUD_DOMAIN=your.owncloud.domain.com
          OWNCLOUD_COOKIE=Get this from the network tab of the bookmarks page
          OWNCLOUD_REQUEST_TOKEN=Also from the network tab
        language: plaintext
---

