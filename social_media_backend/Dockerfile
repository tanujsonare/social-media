FROM python:3-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /social_media_backend
COPY requirements.txt requirements.txt
RUN pip3 install --upgrade pip
# Install PostgreSQL client and psycopg2-binary
RUN apk add --no-cache postgresql-libs \
    && apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev \
    && pip install psycopg2-binary==2.9.6 \
    && apk --purge del .build-deps
RUN pip3 install -r requirements.txt
COPY . .