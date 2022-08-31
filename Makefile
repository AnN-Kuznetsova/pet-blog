docker-test: ; sudo DOCKER_BUILDKIT=1 docker build -t blog-img --target test .
docker-build: ; sudo DOCKER_BUILDKIT=1 docker build -t blog-img .
docker-run: ; sudo docker run -d -p 3000:8080 --mount type=bind,source=/home/user/AnN/dev/pet-blog/pet-blog/data,target=/usr/share/nginx/data --name pet-blog blog-img
docker-build-run: ; make docker-build && make docker-run
docker-stop: ; sudo docker stop pet-blog
