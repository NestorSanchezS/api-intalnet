# Intalnet API


## Run

#### 1. Clone `.env.example` to `.env` and set variables

    cp .env.example .env

#### 2.  Run server with docker containers

    make up
	

> it will to setup mysql database and nodejs server with PM2

#### Output

    intalnet-api-api-1  | 2022-09-02T01:45:53: PM2 log: Launching in no daemon mode
	intalnet-api-api-1  | 2022-09-02T01:45:53: PM2 log: App [index:0] starting in -fork mode-
	intalnet-api-api-1  | 2022-09-02T01:45:53: PM2 log: App [index:0] online
	intalnet-api-api-1  | server on port 3300
	intalnet-api-api-1  | database ready

> If you can see this, the server is up