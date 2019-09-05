# The Conference app
![Mock up app](https://github.com/PietVlem/BAP/blob/master/Mock-up.png?raw=true)

## Set-up
1. create .env file in the root of the project
```
NMD_BASELINE={baseline}  
NODE_ENV={Development}
NODE_SERVER_HOSTNAME= {127.0.0.1}
NODE_SERVER_PORT= {8080}
MONGODB_CONNECTION= {mongoDb: connection string}
SKIP_PREFLIGHT_CHECK= {true}
AUTH_JWT_SECRET= {jwt secret}
AUTH_JWT_SESSION= {true}
AUTH_BCRYPT_SALT= {salt-string-length}
```

2. Download npm modules
```
yarn install
cd ./src/client && yarn install
cd ./src/app && expo install
```

## Run
1. Server
```
yarn server:start
```

2. Client
```
cd ./src/client && yarn start
```

3. App start
```
cd ./src/app && expo start
```
