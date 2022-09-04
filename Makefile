setup:
	docker compose build
	docker compose up -d database
	sleep 10

up: setup
	docker compose up api

down:
	docker compose down

rm-vols: down
	docker volume rm intalnet-api_dbdata
	docker volume rm intalnet-api_product-images
	docker volume ls
