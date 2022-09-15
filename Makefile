build:
	docker compose build

up: build
	docker compose up -d database
	docker compose up api

down:
	docker compose down

rm-vols: down
	docker volume rm intalnet-api_dbdata
	docker volume rm intalnet-api_product-images
	docker volume ls
