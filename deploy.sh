docker stop react
git pull
docker build -t react-app:latest .
docker run -d --name react -it -p 80:80 --rm react-app:latest
