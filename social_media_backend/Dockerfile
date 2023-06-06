FROM python:3-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /social_media_backend
COPY requirements.txt requirements.txt
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
COPY . .