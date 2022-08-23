docker-test: ; sudo DOCKER_BUILDKIT=1 docker build -t blog-img --target test .
docker-build: ; sudo DOCKER_BUILDKIT=1 docker build -t blog-img .
docker-run: ; sudo docker run -d -p 8080:8080  --name pet-blog blog-img
docker-build-run: ; make docker-build && make docker-run
docker-stop: ; sudo docker stop pet-blog
