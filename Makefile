start-dev:
	bun install
	docker-compose up -d
	bun dev

down:
	docker-compose down

create-migration:
	bunx prisma migrate dev