## How to run the code

`yarn install && yarn start`

## Explanation of architecture

Design Doc: https://docs.google.com/document/d/1J7Q96OMFmCobohV8OpLc2rJr3YzAn2JgndjH9iAVimA/edit?usp=sharing

- List of movies is stored in global useContext based store. This means we only need to fetch the movies list once on app load then reference the store for subsequent use.

- User details are stored in global useContext based store. This means users only need to sign in once on app load to comment on multiple movies, and won't need to sign in again unless they refresh the app.

- The original movies endpoint is proxied via a custom deployed express server which sets a cors header that allows all IPs to access it, to get around the original resource not having had a broad access cors header set.

- Pre-existing libraies were preferred over custom implmentations for speed. Particularly preferred React-Table and chatscope/chat-ui-kit-react.

- Sensitive information such as API keys were read in using environment variables

- Routes were preffered over passing around events as originally aimed for in the design doc, due to ease of implementation.

- Firebase realtime database was preffered over alternatives due to simple nature of app, and the availability of a Webhook to get lastest data when new updates happen. This webhook was critical for realtime commenting.

- Backend proxy hosted on Heroku, frontend hosted on Vercel

## If you had more time, what would you like to improve?

- Better caching using local storage so users won't need to re-sign in after app refreshes, but would rather need to re-sign in after session expirations

- Had a look at the rendering performance of the app and optimized as needed

- Gotten access to backend to whitelist the front-end's IP with re: to CORs, and implemented pagination

- Implemented better table filtering. Particularly the multiselect filtering.

- Implemented better styling with more micro-interactions.

- And for proper production all the usual bells and whistles - set up error boundaries, logging, observability, added tests for critical components to begin with, e.t.c e.t.c
