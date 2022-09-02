setup:
	docker compose build
	docker compose up -d database
	sleep 5

up: setup
	docker compose up api

down:
	docker compose down
