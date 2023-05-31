FROM rust:1.68-slim
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y iputils-ping curl
COPY /public ./public
COPY /src ./src
COPY Cargo.toml .
RUN cargo install --path .

CMD [ "cargo", "run" ]