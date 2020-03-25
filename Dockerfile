FROM python:latest
COPY src /
EXPOSE 8080
CMD python -m http.server 8080
