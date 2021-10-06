To run the app in docker using nginx:

```bash
docker build -t react-app:latest .
docker run -it -p 80:80 --rm react-app:latest
```

Using docker-compose:

```
docker-compose build
docker-compose up
```
