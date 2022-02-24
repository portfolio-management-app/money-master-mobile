### Naming convention:

- function and variable: Camel case

```ts
const handleInput = () => {};
let initNumber = 5;
```

- Type and Interface, Model, Component and Store: Title case:

```ts
interface AuthenticationProps {}

type Validate = {};

export const TextContainer = () => {};
```

- Folder and filename "-" between:

navigation/screen-names

### Set up development environment

- Install and setup [flipper](https://fbflipper.com)

- Install ngrok

  `sudo apt install ngrok`

- Login and authen to [ngrok](https://ngrok.com)

- Start BE server

- Run the flowing command:

  `ngrok http 5000 --host-header="localhost:5000" `

- Open flipper

- In RN directory run:

  `yarn start`

  `yarn android`

- In config folder copy parse the https url generate by ngrok to **_url_**
