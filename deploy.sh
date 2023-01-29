
#!/bin/bash
version=$1
[ -z $version ] && version=0.1 && echo "\nset defaul version 0.1\n"

docker build --no-cache -t nestorsanchezz/intalnet_api:$version .

docker tag nestorsanchezz/intalnet_api:$version nestorsanchezz/intalnet_api:latest

docker push nestorsanchezz/intalnet_api:$version
docker push nestorsanchezz/intalnet_api:latest

ssh -i ./server-key.pem ubuntu@intalnettelecomunicaciones.com "cd /home/ubuntu/IntalnetConfigServer && make reload-api" 