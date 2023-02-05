# Fb messenger bot

To run yourself, you need to dump your cookies from facebook

{ ..., cookies: [] }

take that cookies array and dump that into a file appstate.json

In that appstate.json change the field in each cookie called "name" to "key"

Then you should be able to auth and send messages!

```
npm install
# Serve the bot from your local machine
npx ts-node src/index.ts bot serve
```

# Commands

The only command so far in a group is /nick <mention> <nickname>

This sets the nickname of that person
